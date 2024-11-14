import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { RegisterSchemeType, registerScheme } from "./scheme"
import { mockErrorResponse } from "#/utils"
import { useLogin, useRegister } from "#/services/auth-service"
import * as Lazy from "#/components/ui/lazy"
import { TOKEN } from "#/constant"

import Input from "#/components/ui/input"
import Button from "#/components/ui/button"
import Logo from "#/components/ui/logo"


export default function Register() {
    const navigate = useNavigate()
    const registration = useRegister()
    const login = useLogin()

    const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterSchemeType>({
        resolver: zodResolver(registerScheme)
    })

    function loginAction({ username, password }: Omit<RegisterSchemeType, "confirmPassword">) {
        login.mutate({ username, password }, {
            onSuccess: (result) => {
                const token = result.data.token;
                localStorage.setItem(TOKEN, token)

                navigate("/upload")
            },
            onError: (error) => {
                const errorType = mockErrorResponse[error.response?.data.type as keyof typeof mockErrorResponse]
                const errorMessage = error.response?.data.message ?? "Something went wrong!"
                toast.error(errorType, {
                    description: errorMessage
                })
            }
        })
    }

    const submit = handleSubmit(({ username, password, confirmPassword }) => {

        if (isPending) return

        if (password && password !== confirmPassword) {
            setError("confirmPassword", {
                message: "Password not match!"
            })
            return
        }

        registration.mutate({ username, password }, {
            onSuccess: () => {
                loginAction({ username, password })
            },
            onError: (error) => {
                const errorType = mockErrorResponse[error.response?.data.type as keyof typeof mockErrorResponse]
                const errorMessage = error.response?.data.message ?? "Something went wrong!"
                toast.error(errorType, {
                    description: errorMessage
                })
            }
        })
    })

    const isPending = registration.isPending || login.isPending;

    return (
        <main className="font-lilita-one min-h-dvh w-full flex-center px-3 overflow-auto py-16"
            style={{ backgroundImage: "url('/pertamina-2.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}
        >
            <div className="fixed inset-0 bg-black/50" aria-label="overlay" />
            <div className="relative bg-white w-full max-w-[380px] mx-auto rounded-[0.65rem] h-max" aria-label="form">
                <header className="border-b-2 border-[#D9D9D9] h-[130px] md:h-[150px]">
                    <Logo />
                </header>
                <form onSubmit={submit} className="p-6 md:p-10 space-y-10">
                    <div className="text-center text-pertamina-blue">
                        <h1 className="text-4xl">
                            Get started
                        </h1>
                        <p className="text-lg">Let’s create your account</p>
                    </div>
                    <div className="text-xl text-pertamina-blue space-y-5">
                        <Input
                            type="text"
                            placeholder="Username"
                            {...register("username")}
                            aria-invalid={Boolean(errors.username)}
                        />
                        <Input
                            type="password"
                            placeholder="******"
                            {...register("password")}
                            aria-invalid={Boolean(errors.password)}
                        />
                        <Input
                            type="password"
                            placeholder="******"
                            {...register("confirmPassword")}
                            aria-invalid={Boolean(errors.confirmPassword)}
                        />
                    </div>
                    <Button>
                        SIGN UP
                        {isPending && <Lazy.Spinner />}
                    </Button>
                    <div className="border-t border-gray-300 pt-5">
                        <p className="text-lg text-center text-pertamina-blue">Have an account? <Link to="/auth/login" className="text-[#2C607C] underline">Sign in here!</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}