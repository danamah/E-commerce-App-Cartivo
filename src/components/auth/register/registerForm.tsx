"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { registerSchema, registerSchemaType } from '@/lib/validationSchema/auth.schema'
import { signUpUser } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterForm() {
    const t = useTranslations("Auth.Register");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const form = useForm({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }
    })
    const router = useRouter()
    async function handleRegister(values: registerSchemaType) {
        console.log(values)
        const response = await signUpUser(values)
        console.log(response)
        if (response.message == "success") {
            toast.success("Registered Successfully")
            router.push("/login")
            form.reset()
        } else {
            toast.error(response.message)
        }
    }
    return (
        <>
            <main>
                <header className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold">
                        <span className="text-purple-600 dark:text-purple-400">Cart</span>ivo
                    </h1>
                    <p className="text-xl font-medium mt-3 text-gray-700 dark:text-gray-300">
                        {t("title")}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                        {t("subtitle")}
                    </p>
                </header>
                <form onSubmit={form.handleSubmit(handleRegister)} className='my-3 space-y-4 w-full md:max-w-2xl mx-auto shadow border rounded-2xl p-3 py-5' action="">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>{t("name")}</FieldLabel>
                                <Input
                                    type='text'
                                    className='max-w-6xl mx-auto'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Write Your Name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>{t("email")}</FieldLabel>
                                <Input
                                    type='email'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Write Your Email"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                {/* {formState.errors.name && <FieldError errors={[formState.errors.email]} />} */}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>{t("password")}</FieldLabel>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                        id="password"
                                        placeholder="Write Your Password"
                                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 transition-colors pr-10"
                                    />
                                    <Button
                                        variant={"ghost"}
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:bg-transparent dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </Button>
                                </div>
                                {/* <Input
                                    type='password'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Write Your Password"
                                    autoComplete="off"
                                /> */}
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="rePassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>{t("rePassword")}</FieldLabel>
                                <div className="relative">
                                    <Input
                                        type={showRePassword ? "text" : "password"}
                                        {...field}
                                        id="password"
                                        placeholder="Write Your Password"
                                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 transition-colors pr-10"
                                    />
                                    <Button
                                        variant={"ghost"}
                                        type="button"
                                        onClick={() => setShowRePassword(!showRePassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-transparent transition-colors"
                                    >
                                        {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </Button>
                                </div>
                                {/* <Input
                                    type='password'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="re-Write Your Password"
                                    autoComplete="off"
                                /> */}
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>{t("phone")}</FieldLabel>
                                <Input
                                    type='tel'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Write Your Phone Number"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-700 dark:to-purple-800 dark:hover:from-purple-800 dark:hover:to-purple-900 text-white py-3 text-lg rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {form.formState.isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner className="h-5 w-5" />
                                <span>Loging...</span>
                            </div>
                        ) : (
                            "Register"
                        )}
                    </Button>
                    <footer className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        {t("haveAccount")}{" "}
                        <Link
                            href="/register"
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline font-medium transition-colors"
                        >
                            {t("loginNow")}
                        </Link>
                    </footer>
                </form>
            </main>
        </>
    )
}
