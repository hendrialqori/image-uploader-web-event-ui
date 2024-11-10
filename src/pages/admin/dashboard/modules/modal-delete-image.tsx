import Portal from "#/components/portal";
import { GoAlertFill } from "react-icons/go";

type Props = {
    isOpen: boolean;
    onClose: () => void
}

export default function ModalDeleteImage({ isOpen, onClose }: Props) {

    function deleteAction() { }

    return (
        <Portal isOpen={isOpen}>
            <div className="relative bg-white rounded-lg w-[320px] h-max px-5 py-8 space-y-7">
                <div className="flex-center flex-col gap-3">
                    <GoAlertFill className="text-red-500 text-4xl" />
                    <div className="text-sm font-medium text-center">
                        <p>Are you sure delete this image ?</p>
                        <p className="text-gray-500 text-[0.8rem]">action cannot be undone</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5">
                    <button onClick={onClose} className="text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-2 px-6">Cancel</button>
                    <button onClick={deleteAction} className="text-sm font-medium bg-red-500 hover:outline hover:outline-red-600 text-white rounded-md py-2 px-6">Delete</button>
                </div>
            </div>
        </Portal>
    )
}