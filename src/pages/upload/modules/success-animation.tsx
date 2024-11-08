import { IoMdClose } from "react-icons/io"
import Portal from "#/components/portal";
import { Variants, motion } from "framer-motion";
import confetti from "canvas-confetti"
import React from "react";

const pathVariants: Variants = {
    initial: {
        pathLength: 0,
        display: "none"
    },
    animate: {
        pathLength: 1,
        display: "block",
        transition: {
            duration: 1,
            bounce: false,
            delay: 0.1
        }
    }
}

const checkVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1
        }
    }
}

type Props = {
    isOpen: boolean,
    onClose: () => void
}

export default function SuccessAnimation({ isOpen, onClose }: Props) {
    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    function play() {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

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
            play()
        }
    }, [isOpen])

    return (
        <Portal isOpen={isOpen}>
            <div className="bg-white rounded-lg w-[320px] h-max px-5 py-4">
                <div className="flex justify-end items-center">
                    <button onClick={onClose} className="hover:outline hover:outline-black rounded-lg p-1">
                        <IoMdClose className="text-lg md:text-xl" />
                    </button>
                </div>
                <div className="flex-center flex-col gap-3">
                    <svg className="size-10 md:size-12" stroke="green" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
                        <motion.path variants={pathVariants} initial="initial" animate="animate" d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <motion.polyline variants={checkVariants} initial="initial" animate="animate" points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div className="flex-center flex-col pb-2">
                        <h2 className="text-sm md:text-base font-semibold">Your rock!</h2>
                        <p className="text-xs md:text-sm font-medium text-gray-500">You got 1 point increased</p>
                    </div>
                </div>
                <audio ref={audioRef} src="/trumpet.mp3" className="hidden" />
            </div>
        </Portal>
    )
}