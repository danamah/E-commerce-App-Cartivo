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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordType>({
        resolver: zodResolver(forgotPasswordSchema),
    });
    const onSubmit = async (data: ForgotPasswordType) => {
        setLoading(true);
        setError(null);
        try {
            const res = await forgotPassword(data.email);
            console.log(res);
            if (res.statusMsg === "success") {
                localStorage.setItem("resetEmail", data.email);
                await new Promise((resolve) => setTimeout(resolve, 300));
                router.push("/verify-reset-code");
            } else {
                setError(res.message || "حدث خطأ، حاول مرة أخرى");
            }
        } catch (err) {
            setError("فشل الاتصال بالخادم");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
                <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl text-center border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                        <svg
                            className="w-8 h-8 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                        {t("checkYourEmail")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {t("sentCodeTo")}{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                            {localStorage.getItem("resetEmail")}
                        </span>
                    </p>
                    <Button
                        asChild
                        className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white transition-colors duration-200"
                    >
                        <Link href="/auth/verify-reset-code">{t("enterCode")}</Link>
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
            <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {t("forgotPassword")}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">{t("enterEmail")}</p>
                </div>
                {error && <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            {t("email")}
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                            className={`
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                border-gray-300 dark:border-gray-600 
                focus:border-purple-500 dark:focus:border-purple-500 
                focus:ring-purple-500 dark:focus:ring-purple-500 
                ${errors.email ? "border-red-500 dark:border-red-500" : ""}
                transition-colors duration-200
              `}
                        />
                        {errors.email && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white py-2.5 text-md rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>{t("sending")}</span>
                            </div>
                        ) : (
                            t("sendResetCode")
                        )}
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <Link
                        href="/login"
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors duration-200"
                    >
                        ← {t("backToSignIn")}
                    </Link>
                </div>
            </div>
        </div>
    );
}