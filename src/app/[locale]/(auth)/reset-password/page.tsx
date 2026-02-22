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

    // ✅ نخزن الإيميل في state
    const [email, setEmail] = useState<string | null>(null);

    // ✅ قراءة localStorage بطريقة آمنة
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

            // ⚠️ عدلي حسب response الحقيقي
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

    // ================= SUCCESS SCREEN =================
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
                <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {t("successTitle")}
                    </h2>
                    <p className="text-gray-600 mb-8">{t("successMessage")}</p>

                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                        <Link href="/login">{t("backToSignIn")}</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // ================= FORM =================
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
            <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-2">
                        {t("createNewPassword")}
                    </h1>
                    <p className="text-gray-600">{t("mustBeDifferent")}</p>
                </div>

                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* NEW PASSWORD */}
                    <div>
                        <Label className="mb-1">{t("newPassword")}</Label>

                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("newPassword")}
                                className={errors.newPassword ? "border-red-500" : ""}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                        <Label className="mb-1">{t("confirmPassword")}</Label>

                        <div className="relative">
                            <Input
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword")}
                                className={errors.confirmPassword ? "border-red-500" : ""}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm((p) => !p)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {t("resetting")}
                            </>
                        ) : (
                            t("resetPassword")
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