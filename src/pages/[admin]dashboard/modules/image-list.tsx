import React from "react";
import { CgSpinner } from "react-icons/cg";
import { FaBan } from "react-icons/fa";
import { LuRotateCw } from "react-icons/lu";
import Flow from "#/components/control-flow";
import ImageCard from "./image-card";
import ModalSuspendUser from "./modal-suspend-user";
import ModalRecoveryUser from "./modal-recovery-user";

import useQueryParams from "#/hooks/user-query-params";
import { USER_ID, USER_NAME, USER_SUSPEND } from "#/constant";
import { useGetUserUploads } from "#/services/user-service";

const MODAL_STATE = {
    suspend: false,
    recovery: false
}

export default function ImageList() {
    const [modal, setModal] = React.useState(MODAL_STATE)

    const { query } = useQueryParams()
    const userId = query.get(USER_ID) ?? ""
    const userName = query.get(USER_NAME) ?? "?"
    const userSuspend = query.get(USER_SUSPEND) ?? ""
    const parseUserSuspend = userSuspend && JSON.parse(userSuspend)

    const { data: images, status, fetchStatus } = useGetUserUploads(userId)

    const isPending = status === "pending" && fetchStatus === "fetching";
    const isSuccess = status === "success" && fetchStatus === "idle";
    const isError = status === "error" && fetchStatus === "idle";

    function handleModal(key: keyof typeof MODAL_STATE) {
        return () => setModal({ ...MODAL_STATE, [key]: true })
    }

    function clearModalState() {
        setModal(MODAL_STATE)
    }

    return (
        <React.Fragment>
            <div className="space-y-5 col-span-1 xl:col-span-2">
                <div className="space-y-1 md:space-y-0">
                    <div className="flex-center flex-col items-start md:flex-row justify-start gap-1 md:gap-2">
                        <h2 className="text-sm md:text-lg font-semibold !-tracking-wide">Images from {userName}</h2>
                        {userSuspend && !parseUserSuspend && (
                            <button
                                className="flex-center justify-start gap-1 bg-red-500 text-white rounded-full px-2 md:px-3 py-1 hover:outline hover:outline-red-600"
                                onClick={handleModal("suspend")}
                            >
                                <FaBan />
                                <span className="text-[0.65rem] md:text-xs font-semibold">Suspend {userName}</span>
                            </button>
                        )}

                        {userSuspend && parseUserSuspend && (
                            <button
                                className="flex-center justify-start gap-1 bg-green-500 text-white rounded-full px-2 md:px-3 py-1 hover:outline hover:outline-green-600"
                                onClick={handleModal("recovery")}
                            >
                                <LuRotateCw />
                                <span className="text-[0.65rem] md:text-xs font-semibold">Recovery {userName}</span>
                            </button>
                        )}
                    </div>
                    <p className="text-[0.7rem] md:text-sm font-medium text-gray-500">Select user from table to show details</p>
                </div>
                <Flow>
                    <Flow.If condition={isPending}>
                        <div className="flex-center justify-start gap-2">
                            <CgSpinner className="animate-spin" />
                            <p className="text-sm font-medium">Collection images</p>
                        </div>
                    </Flow.If>
                    <Flow.ElseIf condition={isSuccess}>
                        <div className="grid grid-cols-1">
                            {images?.data.map((image) => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </div>
                    </Flow.ElseIf>
                    <Flow.ElseIf condition={isError}>
                        <div>
                            <p className="text-sm font-medium text-red-500 text-left">Someting went wrong :(</p>
                        </div>
                    </Flow.ElseIf>
                </Flow>
            </div>
            <ModalRecoveryUser isOpen={modal.recovery} onClose={clearModalState} />
            <ModalSuspendUser isOpen={modal.suspend} onClose={clearModalState} />
        </React.Fragment>
    )
}