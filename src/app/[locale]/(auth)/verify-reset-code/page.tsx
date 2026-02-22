"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyResetCodeSchema, VerifyResetCodeType } from "@/lib/validationSchema/auth.schema";
import { verifyResetCode } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function VerifyResetCodePage() {
  const t = useTranslations("Auth.VerifyResetCode");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = typeof window !== "undefined" ? localStorage.getItem("resetEmail") : "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResetCodeType>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: { email: email || "" },
  });

  const onSubmit = async (data: VerifyResetCodeType) => {
    setLoading(true);
    setError(null);
    try {
      const res = await verifyResetCode(data);
      console.log(res)
      if (res.status === 'Success') {
        router.push("/reset-password");
      } else {
        setError(res.message || "Incorrect Code");
      }
    } catch (err) {
      setError(" Fail to confirm ");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">{t("verifyCode")}</h1>
          <p className="text-gray-600">
            {t("sentTo")} <strong>{email}</strong>
          </p>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-1">
              {t("code")}
            </Label>
            <Input
              id="resetCode"
              type="text"
              maxLength={6}
              placeholder="123456"
              {...register("resetCode")}
              className={errors.resetCode ? "border-red-500" : ""}
            />
            {errors.resetCode && <p className="text-red-500 text-sm mt-1">{errors.resetCode.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-xl"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("verifying")}
              </>
            ) : (
              t("verify")
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm space-y-2">
          <p>
            {t("didntReceive")}?{" "}
            <Button
              onClick={() => { alert("Resend Code"); }}
              className="text-purple-600 hover:underline"
            >
              {t("resendCode")}
            </Button>
          </p>
          <Link href="/login" className="text-purple-600 hover:underline block">
            ← {t("backToSignIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}