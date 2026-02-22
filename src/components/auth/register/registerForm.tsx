"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { registerSchema, registerSchemaType } from '@/lib/validationSchema/auth.schema'
import { signUpUser } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterForm() {
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
                <header className='text-center'>
                    <h1 className="text-xl lg:text-3xl font-bold text-purple-700">Create Your Account</h1>
                    <p className="text-lg lg:text-xl text-ring">Start your fresh journey with us today</p>
                </header>
                <form onSubmit={form.handleSubmit(handleRegister)} className='my-3 space-y-4 w-full md:max-w-2xl mx-auto shadow border rounded-2xl p-3 py-5' action="">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>Name</FieldLabel>
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
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>Email</FieldLabel>
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
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>Password</FieldLabel>
                                <Input
                                    type='password'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Write Your Password"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="rePassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>Re-password</FieldLabel>
                                <Input
                                    type='password'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="re-Write Your Password"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className='ms-1.5' htmlFor={field.name}>Phone Number</FieldLabel>
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
                    <Button className='w-full cursor-pointer bg-linear-to-r from-[#7C3AED] to-[#A855F7]'>{
                        form.formState.isSubmitting ? <Spinner /> : "Register"
                    }</Button>
                </form>
            </main>
        </>
    )
}
