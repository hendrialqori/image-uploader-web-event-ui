import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { motion } from "framer-motion";
import ModalLogout from "#/components/modal-logout";

type ChildrenProps = {
    toggle: () => void
}

type Props = {
    children: (params: ChildrenProps) => React.ReactNode;
}

export default function Popup({ children }: Props) {
    const [showPopup, setPopup] = React.useState(false)
    const [isLogout, setLogout] = React.useState(false)

    function togglePopup() {
        setPopup((prev) => !prev)
    }

    function modalLogout(type: "show" | "hide") {
        return () => {
            if (type === "hide") {
                setPopup(false)
                setLogout(false)
            } else {
                setLogout(true)
            }
        }
    }

    return (
        <React.Fragment>
            <div className="relative" aria-label="popup" role="dialog">
                {children({ toggle: togglePopup })}
                <motion.div
                    initial={{ opacity: 0, display: "none" }}
                    animate={{ y: showPopup ? "0.5rem" : "1rem", opacity: showPopup ? 1 : 0, display: showPopup ? "block" : "none" }}
                    transition={{ bounce: false, duration: .1, delay: 0.08 }}
                    className="bg-slate-50 rounded-lg shadow-md p-1 w-36 absolute -left-28" aria-label="popup-body">
                    <button
                        className="px-5 py-2 rounded-lg w-full flex-center gap-3 hover:bg-slate-100 transition duration-300"
                        type="button"
                        onClick={modalLogout("show")}
                    >
                        <PiSignOutBold />
                        <span className="text-sm font-medium !-tracking-wide">Logout</span>
                    </button>
                </motion.div>
            </div>
            <ModalLogout isOpen={isLogout} onClose={modalLogout("hide")} />
        </React.Fragment>
    )
}