import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { RegisterSchemeType, registerScheme } from "./scheme"
import { cn, mockErrorResponse } from "#/utils"
import { useLogin, useRegister } from "#/services/auth-service"
import { ButtonSpinnerLoading } from "#/components/ui/lazy"
import { TOKEN } from "#/constant"

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

    const validInput = " outline-black-500 active:outline-black-500 "
    const inValidInput = "outline-red-500 active:outline-red-500 bg-red-50 with-shake-invalid"

    const isPending = registration.isPending || login.isPending;

    return (
        <main>
            <header className="p-5">
                <div>
                    <img src="/pertamina-logo.png" className="size-8" alt="logo" width={30} height={30} />
                </div>
            </header>
            <section className="min-h-[calc(100dvh_-_80px)] w-[calc(100%_-_50px)] max-w-[400px] mx-auto flex-center flex-col space-y-5 md:space-y-7">
                <div className="text-center  !-tracking-wide">
                    <h2 className="text-xl md:text-3xl font-semibold">Register to Event</h2>
                    <p className="text-xs md:text-base text-slate-500">Please enter your details below</p>
                </div>
                <section className="w-full">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="text-xs md:text-sm flex flex-col gap-2">
                            <label htmlFor="username" className="font-medium">Username</label>
                            <input
                                id="username"
                                type="text"
                                className={cn("bg-gray-100 p-3 rounded-[.63rem] border border-[#E5E5E5]", errors.username ? inValidInput : validInput)}
                                {...register("username")}
                                aria-invalid={Boolean(errors.username)}
                            />
                            <p className="text-red-500 text-xs md:text-[0.8rem] font-medium">{errors.username?.message}</p>
                        </div>
                        <div className="text-xs md:text-sm flex flex-col gap-2">
                            <label htmlFor="password" className="font-medium">Password</label>
                            <input
                                id="password"
                                type="password"
                                className={cn("w-full bg-gray-100 p-3 rounded-[.63rem] border border-[#E5E5E5]", errors.password ? inValidInput : validInput)}
                                {...register("password")}
                                aria-invalid={Boolean(errors.password)}
                            />
                            <p className="text-red-500 text-xs md:text-[0.8rem] font-medium">{errors.password?.message}</p>
                        </div>
                        <div className="text-xs md:text-sm flex flex-col gap-2">
                            <label htmlFor="c-password" className="font-medium">Confirm Password</label>
                            <input
                                id="c-password"
                                type="password"
                                className={cn("w-full bg-gray-100 p-3 rounded-[.63rem] border border-[#E5E5E5]", errors.confirmPassword ? inValidInput : validInput)}
                                {...register("confirmPassword")}
                                aria-invalid={Boolean(errors.confirmPassword)}
                            />
                            <p className="text-red-500 text-xs md:text-[0.8rem] font-medium">{errors.confirmPassword?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className="relative overflow-hidden text-xs md:text-base font-medium text-white text-center bg-black hover:bg-black/70 disabled:bg-black/70 w-full p-3 rounded-[.63rem] flex-center"
                            disabled={isPending}
                        >
                            <span className="!-tracking-wide select-none">Register</span>
                            {isPending &&
                                <ButtonSpinnerLoading />
                            }
                        </button>
                    </form>
                </section>
                <footer>
                    <p className="text-xs md:text-sm text-slate-500 select-none">
                        Have an account,
                        <button
                            className="text-black font-semibold hover:underline"
                            disabled={isPending}
                            aria-disabled={isPending}
                        >
                            login here!
                        </button>
                    </p>
                </footer>
            </section>
        </main>
    )
}