import React from "react";
import Portal from "#/components/portal";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    // image: Image;
    onClose: () => void;
}

export default function ModalUpdateImage({ isOpen, onClose }: Props) {
    const [point, setPoint] = React.useState(0)

    function handleChangePoint(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.valueAsNumber
        setPoint(value)
    }

    function pointValidation() {
        if (!point) toast.error("Point cannot be zero")
        if (point < 0) toast.error("Point cannot be negative")
        return true
    }

    function updateAction() {
        const isValid = pointValidation()
    }

    return (
        <Portal isOpen={isOpen}>
            <div className="relative overflow-hidden bg-white rounded-lg w-[768px]">
                <div className="h-[400px] bg-gray-400">
                    <img src="/buku.png" alt="image" width={200} height={300} className="size-full object-contain" />
                </div>
                <div className="px-5 py-8 space-y-3">
                    <div className="font-medium">
                        <p className="text-[0.75rem] text-gray-700">Name</p>
                        <h3 className="text-sm">eyeglasses.png</h3>
                    </div>
                    <div className="font-medium">
                        <p className="text-[0.75rem] text-gray-700">Category</p>
                        <h3 className="text-sm">Electric Vehicle</h3>
                    </div>
                    <div className="font-medium flex flex-col gap-1">
                        <label className="text-[0.75rem] text-gray-700">Point</label>
                        <input type="number" value={point} onChange={handleChangePoint} className="rounded-md bg-gray-50 py-2 px-3 border border-gray-200 w-1/2" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5 pb-7">
                    <button onClick={onClose} className="text-sm font-medium bg-gray-100 hover:outline hover:outline-black text-black rounded-md py-[0.65rem]">Cancel</button>
                    <button onClick={updateAction} className="text-sm font-medium bg-black hover:outline hover:outline-black text-white rounded-md py-[0.65rem]">Update</button>
                </div>
            </div>
        </Portal>
    )
}