import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import * as Lazy from "#/components/ui/lazy"
import Input from "#/components/ui/input";
import Button from "#/components/ui/button";

import { LoginSchemeType, loginScheme } from "./scheme"
import { mockErrorResponse } from "#/utils"
import { useLogin } from "#/services/auth-service"
import { TOKEN } from "#/constant"
import Logo from "#/components/ui/logo";

export default function LoginPage() {

    const navigate = useNavigate()
    const login = useLogin()

    const [passwordVisible, setPasswordVisible] = React.useState(false)

    const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginSchemeType>({
        resolver: zodResolver(loginScheme)
    })

    const submit = handleSubmit(({ username, password }) => {

        if (login.isPending) return

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
    })

    function toggleVisiblePassword() {
        setPasswordVisible((prev) => !prev)
    }

    const disabledSubmit = !Boolean(watch('username') && watch('password'))

    return (
        <main className="font-lilita-one min-h-dvh w-full flex-center px-3 py-16"
            style={{ backgroundImage: "url('/pertamina-2.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}
        >
            <div className="fixed inset-0 bg-black/50" aria-label="overlay" />
            <div className="relative bg-white w-full max-w-[380px] mx-auto rounded-[0.65rem]" aria-label="form">
                <header className="border-b-2 border-[#D9D9D9] h-[130px] md:h-[150px]">
                    <Logo />
                </header>
                <form onSubmit={submit} className="p-6 md:p-10 space-y-10">
                    <div className="text-xl text-pertamina-blue space-y-5">
                        <Input
                            type="text"
                            placeholder="Username"
                            {...register("username")}
                            aria-invalid={Boolean(errors.username)}
                        />
                        <div className="relative">
                            <Input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="******"
                                {...register("password")}
                                aria-invalid={Boolean(errors.password)}
                            />
                            <div
                                role="button"
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 select-none"
                                onClick={toggleVisiblePassword}
                            >
                                {!passwordVisible ? <IoMdEye className="text-2xl" /> : <IoIosEyeOff className="text-2xl" />}
                            </div>
                        </div>
                    </div>
                    <Button disabled={disabledSubmit} aria-disabled={disabledSubmit}>
                        SIGN IN
                        {login.isPending && <Lazy.Spinner />}
                    </Button>
                    <div className="border-t border-gray-300 pt-5">
                        <p className="text-lg text-center text-pertamina-blue">Don’t have an account? <Link to="/auth/register" className="text-[#2C607C] underline">Sign up here!</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}
