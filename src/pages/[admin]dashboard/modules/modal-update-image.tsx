import React from "react";
import Portal from "#/components/portal";
import { toast } from "sonner";
import { useUpdateImage } from "#/services/upload-service";
import type { Image } from "#/@types";
import { STATIC } from "#/constant";
import { useQueryClient } from "@tanstack/react-query";
import { mockErrorResponse } from "#/utils";
import { ButtonSpinnerLoading } from "#/components/ui/lazy";

type Props = {
    isOpen: boolean;
    image: Image;
    onClose: () => void;
}

export default function ModalUpdateImage({ isOpen, image, onClose }: Props) {
    const [point, setPoint] = React.useState(image.point)
    const queryClient = useQueryClient()
    const update = useUpdateImage()

    function handleChangePoint(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.valueAsNumber
        setPoint(value)
    }

    function pointValidation() {
        if (!point) {
            toast.error("Point cannot be zero")
            return false
        }
        if (point < 0) {
            toast.error("Point cannot be negative")
            return false
        }
        return true
    }

    function updateAction() {
        const isValid = pointValidation()
        if (!isValid) return

        update.mutate({ id: image.id, point }, {
            onSuccess: () => {
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["USER/IMAGES"] })
                }, 500)
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["USERS"] })
                }, 1000)

                toast.success("Success update", {
                    description: "Image successfully updated"
                })

                onClose()
            },
            onError: (error) => {
                const type = error.response?.data.type as keyof typeof mockErrorResponse
                const errorType = mockErrorResponse[type]
                const errorMessage = error.response?.data.errors["point"].join(", ") ?? "Fail update point image"

                console.log(errorMessage)

                toast.error(errorType, {
                    description: errorMessage
                })

            }
        })
    }

    const isPending = update.isPending

    return (
        <Portal isOpen={isOpen}>
            <div className="relative overflow-hidden bg-white rounded-lg h-max max-w-lg">
                <div className="h-[300px] bg-gray-400">
                    <img src={STATIC + "/" + image.title} alt="image" width={200} height={300} className="size-full object-contain" crossOrigin="anonymous" />
                </div>
                <div className="px-5 py-8 space-y-3">
                    <div className="font-medium">
                        <p className="text-[0.6rem] md:text-[0.75rem] text-gray-700">Name</p>
                        <h3 className="text-xs md:text-sm">{image.title}</h3>
                    </div>
                    <div className="font-medium">
                        <p className="text-[0.6rem] md:text-[0.75rem] text-gray-700">Category</p>
                        <h3 className="text-xs md:text-sm">{image.category}</h3>
                    </div>
                    <div className="font-medium flex flex-col gap-1">
                        <label className="text-[0.6rem] md:text-[0.75rem] text-gray-700">Point</label>
                        <input type="number" value={point} onChange={handleChangePoint} className="text-xs md:text-sm rounded-md bg-gray-50 py-2 px-3 border border-gray-200 w-1/2" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5 pb-7">
                    <button onClick={onClose} className="text-xs md:text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-[0.65rem]" disabled={isPending}>Cancel</button>
                    <button onClick={updateAction} className="relative overflow-hidden text-xs md:text-sm font-medium bg-black hover:outline hover:outline-black text-white rounded-md py-[0.65rem]" disabled={isPending}>
                        {isPending && <ButtonSpinnerLoading />}
                        Save
                    </button>
                </div>
            </div>
        </Portal>
    )
}