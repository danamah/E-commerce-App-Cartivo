"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordType } from "@/lib/validationSchema/auth.schema";
import { forgotPassword } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
    const t = useTranslations("Auth.ForgotPassword");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { register,handleSubmit,formState: { errors },} = useForm<ForgotPasswordType>({resolver: zodResolver(forgotPasswordSchema),});
    const onSubmit = async (data: ForgotPasswordType) => {
        setLoading(true);
        setError(null);
        try {
            const res = await forgotPassword(data.email);
            console.log(res);
            if (res.statusMsg === "success") {
                localStorage.setItem("resetEmail", data.email);
                await new Promise(resolve => setTimeout(resolve, 300));
                router.push("/verify-reset-code");
            } else {
                setError(res.message || "Somthing went wrong Try aging");
            }
        } catch (err) {
            setError("fail to conect server");
            console.log(err)
        } finally {
            setLoading(false);
        }
    };
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
                <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{t("checkYourEmail")}</h2>
                    <p className="text-gray-600 mb-8">
                        {t("sentCodeTo")} <span className="font-medium">{localStorage.getItem("resetEmail")}</span>
                    </p>
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                        <Link href="/auth/verify-reset-code">{t("enterCode")}</Link>
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
            <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-2">{t("forgotPassword")}</h1>
                    <p className="text-gray-600">{t("enterEmail")}</p>
                </div>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("email")}
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {t("sending")}
                            </>
                        ) : (
                            t("sendResetCode")
                        )}
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-purple-600 hover:underline">
                        ← {t("backToSignIn")}
                    </Link>
                </div>
            </div>
        </div>
    );
}