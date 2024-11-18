import { IoMdClose } from "react-icons/io"
import Portal from "#/components/portal";
import confetti from "canvas-confetti"
import React from "react";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

export default function ModalSuccessUpload({ isOpen, onClose }: Props) {

    function showConfetti(delay: number = 0) {
        setTimeout(async () => {
            await confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })
        }, delay)
    }

    React.useEffect(() => {
        if (isOpen) {
            showConfetti()
            showConfetti(1000)
        }
    }, [isOpen])

    return (
        <Portal isOpen={isOpen}>
            <div className="relative bg-white font-lilita-one rounded-3xl w-full max-w-[320px] h-max px-5 pt-10 pb-5">
                <button onClick={onClose} className="absolute right-3 top-3 hover:outline hover:outline-black rounded-lg p-1">
                    <IoMdClose className="text-lg text-pertamina-sky-blue" />
                </button>
                <div className="flex-center flex-col gap-6">
                    <h2 className="text-2xl text-pertamina-navy leading-[0]">Your rock!</h2>
                    <p className="text-lg text-pertamina-blue">You got your point increased!</p>
                    <button onClick={onClose} className="w-full py-3 text-2xl rounded-xl bg-gradient-to-r from-forest-green to-pertamina-blue text-white">OK</button>
                </div>
            </div>
        </Portal>
    )
}