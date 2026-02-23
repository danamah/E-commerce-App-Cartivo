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
import { toast } from "sonner";

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

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
  //     <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
  //       <div className="text-center mb-8">
  //         <h1 className="text-3xl font-bold text-purple-700 mb-2">{t("verifyCode")}</h1>
  //         <p className="text-gray-600">
  //           {t("sentTo")} <strong>{email}</strong>
  //         </p>
  //       </div>
  //       {error && <p className="text-red-600 text-center mb-4">{error}</p>}
  //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //         <div>
  //           <Label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-1">
  //             {t("code")}
  //           </Label>
  //           <Input
  //             id="resetCode"
  //             type="text"
  //             maxLength={6}
  //             placeholder="123456"
  //             {...register("resetCode")}
  //             className={errors.resetCode ? "border-red-500" : ""}
  //           />
  //           {errors.resetCode && <p className="text-red-500 text-sm mt-1">{errors.resetCode.message}</p>}
  //         </div>
  //         <Button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-xl"
  //         >
  //           {loading ? (
  //             <>
  //               <Loader2 className="mr-2 h-5 w-5 animate-spin" />
  //               {t("verifying")}
  //             </>
  //           ) : (
  //             t("verify")
  //           )}
  //         </Button>
  //       </form>
  //       <div className="mt-6 text-center text-sm space-y-2">
  //         <p>
  //           {t("didntReceive")}?{" "}
  //           <Button
  //             onClick={() => { alert("Resend Code"); }}
  //             className="text-purple-600 hover:underline"
  //           >
  //             {t("resendCode")}
  //           </Button>
  //         </p>
  //         <Link href="/login" className="text-purple-600 hover:underline block">
  //           ← {t("backToSignIn")}
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-purple-500/10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400 mb-3">
            {t("verifyCode")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t("sentTo")}{" "}
            <strong className="text-gray-900 dark:text-gray-200 font-medium">{email || "your email"}</strong>
          </p>
        </div>
        {error && (
          <p className="text-red-600 dark:text-red-400 text-center mb-6 font-medium bg-red-50 dark:bg-red-950/30 py-3 rounded-lg">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label
              htmlFor="resetCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("code")}
            </Label>
            <Input
              id="resetCode"
              type="text"
              maxLength={6}
              placeholder="123456"
              {...register("resetCode")}
              className={`
                text-center text-2xl md:text-3xl tracking-[1em] font-mono
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                border-2 border-gray-300 dark:border-gray-600 
                focus:border-purple-500 dark:focus:border-purple-500 
                focus:ring-2 focus:ring-purple-500/30 dark:focus:ring-purple-500/40
                h-14 md:h-16 rounded-xl
                ${errors.resetCode ? "border-red-500 dark:border-red-500" : ""}
                transition-all duration-200
              `}
            />
            {errors.resetCode && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-center font-medium">
                {errors.resetCode.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white h-8 md:h-10 text-lg md:text-xl rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>{t("verifying")}</span>
              </div>
            ) : (
              t("verify")
            )}
          </Button>
        </form>
        <div className="mt-8 text-center text-sm space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {t("didntReceive")}?{" "}
            <button
              type="button"
              onClick={() => toast.info("reSend code")}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline transition-colors"
            >
              {t("resendCode")}
            </button>
          </p>
          <Link
            href="/login"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline transition-colors block"
          >
            ← {t("backToSignIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}