"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Plus, Trash, Loader2, SquarePen } from "lucide-react";
import { getLoggedUserAdresses, removeAddress, addAdress } from "@/actions/profile.action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddressI } from "@/types/address";
import { useTranslations } from "next-intl";

const addAddressSchema = z.object({
  name: z.string().min(1, "the Address name required"),
  details: z.string().min(5, "Details Required"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number Required"),
  city: z.string().min(1, " Name of the City Required"),
});

type AddAddressForm = z.infer<typeof addAddressSchema>;


export default function AddressesSection() {
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressI | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const t = useTranslations("profile");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddAddressForm>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  useEffect(() => {
    async function fetchAddresses() {
      setLoading(true);
      const data = await getLoggedUserAdresses();
      setAddresses(data);
      setLoading(false);
    }
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (editAddress) {
      reset({
        name: editAddress.name || "",
        details: editAddress.details || "",
        phone: editAddress.phone || "",
        city: editAddress.city || "",
      });
    } else {
      reset({
        name: "",
        details: "",
        phone: "",
        city: "",
      });
    }
  }, [editAddress, reset]);
  const handleDelete = async (addressId: string) => {
    if (!confirm("Are You Sure You wanna delete it")) return;
    setDeletingId(addressId);
    try {
      const res = await removeAddress(addressId);
      if (res.status === "success") {
        toast.success("Address Deleted Successfully☑️");
        setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
      } else {
        toast.error(res.status || "Somthing went wrong ");
      }
    } catch (err) {
      toast.error(" Deleteing failed ");
      console.log(err)
    } finally {
      setDeletingId(null);
    }
  };
  const onSubmit = async (formData: AddAddressForm) => {
    setAddLoading(true);
    try {
      if (editAddress?._id) {
        await removeAddress(editAddress._id);
        const res = await addAdress(formData);
        if (res.status === "success") {
          toast.success("Address Updated Successfully ☑️");
        }
      } else {
        const res = await addAdress(formData);
        if (res.status === "success") {
          toast.success(" Address Added successfully  ☑️");
        }
      }
      const updated = await getLoggedUserAdresses();
      setAddresses(updated);
      reset();
      setEditAddress(null);
      setDialogOpen(false);
    } catch (err) {
      toast.error("Fail to Process");
      console.log(err)
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t("MyAddresses")}</h2>
          <p className="text-muted-foreground">
           {t("subTitle")}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t("addAdress")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>
                {editAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("AddressName")}</Label>
                <Input
                  id="name"
                  placeholder="e.g. Home, Office"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">{t("FullAddress")}</Label>
                <Input
                  id="details"
                  placeholder="Street, building, apartment..."
                  {...register("details")}
                />
                {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("PhoneNumber")}</Label>
                  <Input
                    id="phone"
                    placeholder="01xxxxxxxxxx"
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Cairo" {...register("city")} />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={() => setEditAddress(null)}>
                    {t("Cancel")}
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={addLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {addLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editAddress ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    editAddress ? "Update Address" : "Add Address"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <Card className="p-10 text-center rounded-2xl flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </Card>
      ) : addresses.length === 0 ? (
        <Card className="p-10 text-center rounded-2xl">
          <MapPin className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">{t("NoAddressesYet")}</h3>
          <p className="text-muted-foreground mb-6">
            {t("AddAddressToCheck")}
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("FirstAddress")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>
                  {editAddress ? "Edit Address" : "Add New Address"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("AddressName")}</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Home, Office"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">{t("FullAddress")}</Label>
                  <Input
                    id="details"
                    placeholder="Street, building, apartment..."
                    {...register("details")}
                  />
                  {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("PhoneNumber")}</Label>
                    <Input
                      id="phone"
                      placeholder="01xxxxxxxxxx"
                      {...register("phone")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Cairo" {...register("city")} />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                  </div>
                </div>
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={() => setEditAddress(null)}>
                      {t("Cancel")}
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={addLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {addLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editAddress ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      editAddress ? "Update Address" : "Add Address"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card
              key={address._id}
              className="p-6 rounded-2xl space-y-3 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.details}</p>
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                  <p className="text-sm text-muted-foreground">{address.city}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditAddress(address);
                      setDialogOpen(true);
                    }}
                  >
                    <SquarePen className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => address._id && handleDelete(address._id)}
                    disabled={deletingId === address._id}
                  >
                    {deletingId === address._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}



