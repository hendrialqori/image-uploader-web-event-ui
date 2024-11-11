import Portal from "#/components/portal";
import { ButtonSpinnerLoading } from "#/components/ui/lazy";
import { USER_ID, USER_NAME, USER_SUSPEND } from "#/constant";
import useQueryParams from "#/hooks/user-query-params";
import { useSuspendUser } from "#/services/user-service";
import { mockErrorResponse } from "#/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FaBan } from "react-icons/fa";

type Props = {
    isOpen: boolean;
    onClose: () => void
}

export default function ModalSuspendUser({ isOpen, onClose }: Props) {
    const suspend = useSuspendUser()
    const queryClient = useQueryClient()

    const { query, setQuery } = useQueryParams()
    const userId = query.get(USER_ID) ?? ""
    const userName = query.get(USER_NAME) ?? ""

    function suspendAction() {
        suspend.mutate({ userId }, {
            onSuccess: () => {
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["USERS"] })
                }, 1000)

                toast.success("Success suspend", {
                    description: "User successfully suspended"
                })
                
                setQuery(USER_SUSPEND, JSON.stringify(true))
                onClose()
            },
            onError: (error) => {
                const type = error.response?.data.type as keyof typeof mockErrorResponse
                const errorType = mockErrorResponse[type]
                const errorMessage = error.response?.data.message ?? "Fail suspend user"

                toast.error(errorType, {
                    description: errorMessage
                })

            }
        })
    }

    const isPending = suspend.isPending

    return (
        <Portal isOpen={isOpen}>
            <div className="relative bg-white rounded-lg w-[320px] h-max px-5 py-8 space-y-7">
                <div className="flex-center flex-col gap-3">
                    <FaBan className="text-2xl text-red-500"/>
                    <div className="text-sm font-medium text-center">
                        <p>Suspend {userName} ?</p>
                        <p className="text-gray-500 text-[0.8rem]">action cannot be undone</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5">
                    <button onClick={onClose} className="text-xs md:text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-2 px-6" disabled={isPending}>Cancel</button>
                    <button onClick={suspendAction} className="text-xs md:text-sm font-medium bg-red-500 hover:outline hover:outline-red-600 text-white rounded-md py-2 px-6" disabled={isPending}>
                        {isPending && <ButtonSpinnerLoading />}
                        Suspend
                    </button>
                </div>
            </div>
        </Portal>
    )
}