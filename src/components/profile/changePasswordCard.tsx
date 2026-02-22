"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, ChangePasswordType } from "@/lib/validationSchema/auth.schema";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockKeyhole, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateLoggedUserPassword } from "@/actions/profile.action";
export default function ChangePasswordCard() {
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordType) => {
    setLoading(true);
    try {
      const res = await updateLoggedUserPassword({
        currentPassword: data.currentPassword,
        password: data.password,
        rePassword: data.rePassword,
      });
      console.log(res)
      if (res.message === "success") {
        toast.success("Password Change successfully");
        reset(); 
      } else {
        toast.error(res.message || "inCorrect Current Password");
      }
    } catch (err) {
      toast.error(" fail to conctect with server ");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 rounded-2xl space-y-6 border-yellow-400">
      <div className="flex items-center gap-3">
        <LockKeyhole className="size-14 text-orange-300 bg-amber-200/60 p-3 rounded-lg border border-white/20" />
        <div className="text">
          <h3 className="text-xl font-bold text-yellow-600">Change Password</h3>
          <p className="text-muted-foreground">Keep your account secure</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <label className="text-sm">Current Password</label>
          <Input
            type={showCurrent ? "text" : "password"}
            className="pr-10"
            {...register("currentPassword")}
          />
          <Button
          variant={"ghost"}
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-0.5 top-6 text-muted-foreground hover:bg-transparent"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
          )}
        </div>
        <div className="relative">
          <label className="text-sm">New Password</label>
          <Input
            type={showNew ? "text" : "password"}
            className="pr-10"
            {...register("password")}
          />
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-0.5 top-6 text-muted-foreground hover:bg-transparent"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="relative">
          <label className="text-sm">Confirm New Password</label>
          <Input
            type={showConfirm ? "text" : "password"}
            className="pr-10"
            {...register("rePassword")}
          />
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-0.5 top-6 text-muted-foreground hover:bg-transparent"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
          {errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Card>
  );
}