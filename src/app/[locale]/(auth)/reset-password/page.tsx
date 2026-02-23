"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    resetPasswordSchema,
    ResetPasswordType,
} from "@/lib/validationSchema/auth.schema";
import { resetPassword } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
    const t = useTranslations("Auth.ResetPassword");
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const savedEmail = localStorage.getItem("resetEmail");
        if (!savedEmail) {
            router.push("/forget-password");
        } else {
            setEmail(savedEmail);
        }
    }, [router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordType) => {
        if (!email) return;

        setLoading(true);
        setError(null);

        try {
            const res = await resetPassword({
                email,
                newPassword: data.newPassword,
            });
            console.log(res);
            if (res.token) {
                setSuccess(true);
                localStorage.removeItem("resetEmail");

                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                setError(
                    res.message || "Something went wrong while resetting password"
                );
            }
        } catch (err) {
            console.log(err);
            setError("Failed to connect with server");
        } finally {
            setLoading(false);
        }
    };
    // if (success) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
    //             <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl text-center">
    //                 <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
    //                     <svg
    //                         className="w-8 h-8 text-green-600"
    //                         fill="none"
    //                         stroke="currentColor"
    //                         viewBox="0 0 24 24"
    //                     >
    //                         <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth={3}
    //                             d="M5 13l4 4L19 7"
    //                         />
    //                     </svg>
    //                 </div>
    //                 <h2 className="text-2xl font-bold text-gray-800 mb-3">
    //                     {t("successTitle")}
    //                 </h2>
    //                 <p className="text-gray-600 mb-8">{t("successMessage")}</p>

    //                 <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
    //                     <Link href="/login">{t("backToSignIn")}</Link>
    //                 </Button>
    //             </div>
    //         </div>
    //     );
    // }
    // return (
    //     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
    //         <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
    //             <div className="text-center mb-8">
    //                 <h1 className="text-3xl font-bold text-purple-700 mb-2">
    //                     {t("createNewPassword")}
    //                 </h1>
    //                 <p className="text-gray-600">{t("mustBeDifferent")}</p>
    //             </div>
    //             {error && (
    //                 <p className="text-red-600 text-center mb-4">{error}</p>
    //             )}
    //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //                 <div>
    //                     <Label className="mb-1">{t("newPassword")}</Label>

    //                     <div className="relative">
    //                         <Input
    //                             type={showPassword ? "text" : "password"}
    //                             {...register("newPassword")}
    //                             className={errors.newPassword ? "border-red-500" : ""}
    //                         />
    //                         <button
    //                             type="button"
    //                             onClick={() => setShowPassword((p) => !p)}
    //                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
    //                         >
    //                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    //                         </button>
    //                     </div>

    //                     {errors.newPassword && (
    //                         <p className="text-red-500 text-sm mt-1">
    //                             {errors.newPassword.message}
    //                         </p>
    //                     )}
    //                 </div>
    //                 <div>
    //                     <Label className="mb-1">{t("confirmPassword")}</Label>

    //                     <div className="relative">
    //                         <Input
    //                             type={showConfirm ? "text" : "password"}
    //                             {...register("confirmPassword")}
    //                             className={errors.confirmPassword ? "border-red-500" : ""}
    //                         />
    //                         <button
    //                             type="button"
    //                             onClick={() => setShowConfirm((p) => !p)}
    //                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
    //                         >
    //                             {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
    //                         </button>
    //                     </div>
    //                     {errors.confirmPassword && (
    //                         <p className="text-red-500 text-sm mt-1">
    //                             {errors.confirmPassword.message}
    //                         </p>
    //                     )}
    //                 </div>
    //                 <Button
    //                     type="submit"
    //                     disabled={loading}
    //                     className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 text-md rounded-lg"
    //                 >
    //                     {loading ? (
    //                         <>
    //                             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
    //                             {t("resetting")}
    //                         </>
    //                     ) : (
    //                         t("resetPassword")
    //                     )}
    //                 </Button>
    //             </form>
    //             <div className="mt-6 text-center text-sm">
    //                 <Link href="/login" className="hover:underline text-ring hover:text-primary">
    //                     ← {t("backToSignIn")}
    //                 </Link>
    //             </div>
    //         </div>
    //     </div>
    // );
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 px-4">
                <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-purple-500/10 border border-gray-200 dark:border-gray-700 text-center transition-all duration-300">
                    <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                        <svg
                            className="w-10 h-10 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        {t("successTitle")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                        {t("successMessage")}
                    </p>
                    <Button
                        asChild
                        className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white h-8 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <Link href="/login">{t("backToSignIn")}</Link>
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen py-3.5 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 px-4">
            <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-purple-500/10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400 mb-3">
                        {t("createNewPassword")}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {t("mustBeDifferent")}
                    </p>
                </div>

                {error && (
                    <p className="text-red-600 dark:text-red-400 text-center mb-6 font-medium bg-red-50 dark:bg-red-950/30 py-3 rounded-lg">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("newPassword")}
                        </Label>

                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("newPassword")}
                                className={`
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 
                  border-gray-300 dark:border-gray-600 
                  focus:border-purple-500 dark:focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/30 dark:focus:ring-purple-500/40
                  pr-12 h-8 rounded-lg transition-all duration-200
                  ${errors.newPassword ? "border-red-500 dark:border-red-500" : ""}
                `}
                            />
                            <Button
                            variant={"ghost"}
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </Button>
                        </div>

                        {errors.newPassword && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("confirmPassword")}
                        </Label>

                        <div className="relative">
                            <Input
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword")}
                                className={`
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 
                  border-gray-300 dark:border-gray-600 
                  focus:border-purple-500 dark:focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/30 dark:focus:ring-purple-500/40
                  pr-12 h-8 rounded-lg transition-all duration-200
                  ${errors.confirmPassword ? "border-red-500 dark:border-red-500" : ""}
                `}
                            />
                            <Button
                            variant={"ghost"}
                                type="button"
                                onClick={() => setShowConfirm((prev) => !prev)}
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            >
                                {showConfirm ? <EyeOff size={22} /> : <Eye size={22} />}
                            </Button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white h-8 md:h-10 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-3">
                                <Loader2 className="h-6 w-6 animate-spin" />
                                <span>{t("resetting")}</span>
                            </div>
                        ) : (
                            t("resetPassword")
                        )}
                    </Button>
                </form>
                <div className="mt-8 text-center text-sm">
                    <Link
                        href="/login"
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline font-medium transition-colors"
                    >
                        ← {t("backToSignIn")}
                    </Link>
                </div>
            </div>
        </div>
    );
}