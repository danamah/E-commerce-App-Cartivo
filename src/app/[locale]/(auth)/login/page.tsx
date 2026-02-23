import LayOut from '@/components/auth/login/layOut'
import LoginForm from '@/components/auth/login/loginForm'
export default function page() {
  return (
    <main>
            <div className="grid grid-cols-12 my-4 mx-2 px-3">
                <div className="lay-out-side col-span-12 lg:col-span-6">
                    <LayOut/>
                </div>
                <div className="form-side col-span-12 lg:col-span-6">
                    <LoginForm/>
                </div>
            </div>
        </main>
  )
}
