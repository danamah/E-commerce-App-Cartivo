"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { logInSchema, logInSchemaType } from '@/lib/validationSchema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Login() {
  const form = useForm({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const router = useRouter()

  async function handleLogin(values: logInSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      //   callbackUrl:"/"
    })
    if (response?.ok) {
      toast.success("logged in successfully")
      router.push("/")
    } else {
      toast.error(response?.error)
    }
  }
  return (
    <>
      <main>
        <div className="container mx-auto px-20 py-5">
          <header className='text-center'>
            <h1 className='text-4xl font-bold'><span className='text-purple-600'>Cart</span>ivo</h1>
            <p className='text-xl font-medium mt-2'>Welcome Back!</p>
            <p className='text-md text-ring '>Sign in to continue your shopping experience</p>
          </header>
          <form onSubmit={form.handleSubmit(handleLogin)} className='my-3 space-y-4 w-full md:max-w-2xl mx-auto shadow border rounded-2xl p-3 py-5' action="">
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
                  <div className='flex justify-between'>
                    <FieldLabel className='ms-1.5' htmlFor={field.name}>Password</FieldLabel>
                    <Link className='text-primary font-bold text-md underline hover:text-foreground' href={"/forgot-password"}>Forget Password?</Link>
                  </div>
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
            <Button className='w-full cursor-pointer'>{
              form.formState.isSubmitting ? <Spinner /> : "Login"
            }</Button>
          </form>
          <footer>
            <h2 className='text-lg text-ring'>Don&apos;t have an Email <span className='text-purple-600 underline'><Link href={"/register"}>register</Link></span></h2>
          </footer>
        </div>
      </main>
    </>
  )
}
