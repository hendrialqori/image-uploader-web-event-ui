import Portal from "#/components/portal";
import { ButtonSpinnerLoading } from "#/components/ui/lazy";
import { USER_ID, USER_NAME, USER_SUSPEND } from "#/constant";
import useQueryParams from "#/hooks/user-query-params";
import { useRecoveryUser } from "#/services/user-service";
import { mockErrorResponse } from "#/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LuRotateCw } from "react-icons/lu";

type Props = {
    isOpen: boolean;
    onClose: () => void
}

export default function ModalRecoveryUser({ isOpen, onClose }: Props) {
    const recovery = useRecoveryUser()
    const queryClient = useQueryClient()

    const { query, setQuery } = useQueryParams()
    const userId = query.get(USER_ID) ?? ""
    const userName = query.get(USER_NAME) ?? ""

    function recoveryAction() {
        recovery.mutate({ userId }, {
            onSuccess: () => {
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["USERS"] })
                }, 1000)

                toast.success("Success recovery", {
                    description: "User successfully recovery"
                })

                setQuery(USER_SUSPEND, JSON.stringify(false))
                onClose()
            },
            onError: (error) => {
                const type = error.response?.data.type as keyof typeof mockErrorResponse
                const errorType = mockErrorResponse[type]
                const errorMessage = error.response?.data.message ?? "Fail recovery user"

                toast.error(errorType, {
                    description: errorMessage
                })
            }
        })
    }

    const isPending = recovery.isPending

    return (
        <Portal isOpen={isOpen}>
            <div className="relative bg-white rounded-lg w-[320px] h-max px-5 py-8 space-y-7">
                <div className="flex-center flex-col gap-3">
                    <LuRotateCw className="text-2xl text-green-500"/>
                    <div className="text-sm font-medium text-center">
                        <p>Recovery {userName} ?</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5">
                    <button onClick={onClose} className="text-xs md:text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-2 px-6" disabled={isPending}>Cancel</button>
                    <button onClick={recoveryAction} className="text-xs md:text-sm font-medium bg-green-500 hover:outline hover:outline-green-600 text-white rounded-md py-2 px-6" disabled={isPending}>
                        {isPending && <ButtonSpinnerLoading />}
                        Recovery
                    </button>
                </div>
            </div>
        </Portal>
    )
}