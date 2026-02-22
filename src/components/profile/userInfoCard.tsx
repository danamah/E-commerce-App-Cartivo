"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserDataSchema, UpdateUserDataType } from "@/lib/validationSchema/auth.schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRoundPen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateLoggedUserData } from "@/actions/profile.action";

export default function UserInfoCard() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const {register,handleSubmit,formState: { errors },reset,} = useForm<UpdateUserDataType>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues: {
      name: "",
      email:"",
      phone: "",
    },
  });

  // Reset form when session loads
  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      });
    }
  }, [session, reset]);

  const onSubmit = async (data: UpdateUserDataType) => {
    setLoading(true);
    try {
      const res = await updateLoggedUserData(data);
      console.log(res)
      if (res.message === "success" && res.user) {
        toast.success("User Data Updated Successfuly ☑️");
        // Update session to reflect new data
        update({
          user: {
            ...session?.user,
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
        });
      } else {
        toast.error(res.message || "Somthing Went Wrong While Updating");
      }
    } catch (err) {
      toast.error(" Fail to conect with server ");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 rounded-2xl space-y-6">
      <div className="flex items-center gap-3">
        <UserRoundPen className="size-14 text-primary bg-fuchsia-200/60 p-3 rounded-lg border border-white/20" />
        <div className="text">
          <h3 className="text-xl font-bold">Profile Information</h3>
          <p className="text-muted-foreground">Update your personal details</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm">Full Name</label>
          <Input placeholder="Enter your name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <Input placeholder="Enter your email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm">Phone</label>
          <Input placeholder="01xxxxxxxxx" {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-primary hover:bg-primary/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Card>
  );
}