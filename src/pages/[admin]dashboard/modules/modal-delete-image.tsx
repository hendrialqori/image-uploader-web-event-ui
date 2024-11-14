import { Image } from "#/@types";
import Portal from "#/components/portal";
import * as Lazy from "#/components/ui/lazy";
import { STATIC } from "#/constant";
import { useDeleteImage } from "#/services/upload-service";
import { mockErrorResponse } from "#/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    image: Image
    onClose: () => void
}

export default function ModalDeleteImage({ isOpen, image, onClose }: Props) {
    const deleteImage = useDeleteImage()
    const queryClient = useQueryClient()

    function deleteAction() {
        deleteImage.mutate({ id: image.id }, {
            onSuccess: () => {
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["USER/IMAGES"] })
                }, 500)
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["USERS"] })
                }, 1000)

                toast.success("Success delete", {
                    description: "Image successfully deleted"
                })

                onClose()
            },
            onError: (error) => {
                const type = error.response?.data.type as keyof typeof mockErrorResponse
                const errorType = mockErrorResponse[type]
                const errorMessage = error.response?.data.message ?? "Fail delete image"

                toast.error(errorType, {
                    description: errorMessage
                })

            }
        })
    }

    const isPending = deleteImage.isPending

    return (
        <Portal isOpen={isOpen}>
            <div className="relative bg-white rounded-lg w-[320px] h-max px-5 py-8 space-y-7">
                <div className="flex-center flex-col gap-3">
                    <img src={STATIC + "/" + image.title} alt="image" className="size-10 md:size-14 rounded-xl object-cover border border-gray-300" crossOrigin="anonymous" />
                    <div className="text-sm font-medium text-center">
                        <p>Are you sure delete this image ?</p>
                        <p className="text-gray-500 text-[0.8rem]">action cannot be undone</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5">
                    <button onClick={onClose} className="text-xs md:text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-2 px-6" disabled={isPending}>Cancel</button>
                    <button onClick={deleteAction} className="text-xs md:text-sm font-medium bg-red-500 hover:outline hover:outline-red-600 text-white rounded-md py-2 px-6" disabled={isPending}>
                        {isPending && <Lazy.Spinner />}
                        Delete
                    </button>
                </div>
            </div>
        </Portal>
    )
}