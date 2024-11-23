import React from "react";
import Portal from "#/components/portal";
import { useGetEventStatus, useUpdateEventStatus } from "#/services/setting-service";
import { mockErrorResponse } from "#/utils";
import { useQueryClient } from "@tanstack/react-query";
import { IoMdSettings } from "react-icons/io";
import { toast } from "sonner";
import * as Lazy from "#/components/ui/lazy"

export default function ModalSetting() {
    const queryClient = useQueryClient()
    const [isOpen, setOpen] = React.useState(false)

    const [eventStatus, setEventStatus] = React.useState<"ON" | "OFF">("OFF")

    const { data: event } = useGetEventStatus()
    const { mutate, isPending } = useUpdateEventStatus()

    React.useEffect(() => {
        if (event?.data) {
            setEventStatus(event?.data.status)
        }
    }, [event?.data.status])

    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => setEventStatus(e.target.value as "ON" | "OFF")

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        mutate({ status: eventStatus }, {
            onSuccess: ({ message }) => {
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["SETTING/EVENT"] })
                }, 1000)

                toast.success("Update event status", {
                    description: message ?? "Success update event status"
                })

                setOpen(false)

            },
            onError: (error) => {
                const type = error.response?.data.type as keyof typeof mockErrorResponse
                const errorType = mockErrorResponse[type]
                const errorMessage = error.response?.data.message ?? "Fail update event status"

                toast.error(errorType, {
                    description: errorMessage
                })
            }
        })
    }


    function handleModal(type: "show" | "hide") {
        return () => setOpen(type === "show" ? true : false)
    }

    return (
        <React.Fragment>
            <button className="bg-gray-300 rounded-md p-1 hover:outline hover:outline-black" onClick={handleModal("show")}>
                <IoMdSettings className="text-2xl" />
            </button>
            <Portal isOpen={isOpen}>
                <div className="relative bg-white rounded-lg w-[320px] h-max px-5 py-8 space-y-5 font-lilita-one">
                    <h1>Settings</h1>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col gap-2">
                            <label>
                                Event status
                            </label>
                            <select
                                value={eventStatus}
                                onChange={handleChangeEvent}
                                className="bg-gray-200 rounded-md px-1 py-2"
                            >
                                <option value="ON">ON</option>
                                <option value="OFF">OFF</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="reset"
                                className="text-xs md:text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-2 px-6"
                                disabled={isPending}
                                onClick={handleModal("hide")}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-xs md:text-sm font-medium bg-black hover:outline hover:outline-blbg-black text-white rounded-md py-2 px-6"

                            >
                                {isPending && <Lazy.Spinner />}
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </Portal>
        </React.Fragment>
    )
}