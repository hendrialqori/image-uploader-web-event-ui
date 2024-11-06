import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { motion } from "framer-motion";
import { TOKEN } from "#/constant";
import { useNavigate } from "react-router-dom";

type ChildrenProps = {
    toggle: () => void
}

type Props = {
    children: (params: ChildrenProps) => React.ReactNode;
}

export default function Popup({ children }: Props) {
    const navigate = useNavigate()

    const [showPopup, setPopup] = React.useState(false)
    const [showPopupLogout, setPopupLogout] = React.useState(false)

    function togglePopup() {
        setPopup((prev) => !prev)
    }

    function handlepopupLogout(type: "show" | "hide") {
        return () => {
            if (type === "hide") {
                setPopup(false)
                setPopupLogout(false)
            } else {
                setPopupLogout(true)
            }
        }
    }

    function logoutAction() {
        setPopup(false)
        setPopupLogout(false)

        localStorage.removeItem(TOKEN)
        navigate("/auth/login")

    }

    return (
        <React.Fragment>
            <div className="relative" aria-label="popup" role="dialog">
                {children({ toggle: togglePopup })}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ y: showPopup ? "0.5rem" : "1rem", opacity: showPopup ? 1 : 0 }}
                    transition={{ bounce: false, duration: .1, delay: 0.08 }}
                    className="bg-slate-50 rounded-lg shadow-md p-1 w-36 absolute -left-28" aria-label="popup-body">
                    <button
                        className="px-5 py-2 rounded-lg w-full flex-center gap-3 hover:bg-slate-100 transition duration-300"
                        type="button"
                        onClick={handlepopupLogout("show")}
                    >
                        <PiSignOutBold />
                        <span className="text-sm font-medium !-tracking-wide">Logout</span>
                    </button>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ y: showPopupLogout ? "0.5rem" : "1rem", opacity: showPopupLogout ? 1 : 0 }}
                className="fixed bottom-10 right-0 mx-3 md:right-10 bg-slate-50 rounded-lg shadow-lg px-10 py-5">
                <div className="text-sm space-y-4">
                    <p className="text-sm">Are you sure wanna leave this page ? </p>
                    <div className="flex-center gap-3">
                        <button className="bg-slate-100 hover:bg-slate-300 px-4 py-1 rounded-md transition duration-300" onClick={handlepopupLogout("hide")}>Cancel</button>
                        <button className="text-white bg-red-500 hover:bg-red-600 px-5 py-1 rounded-md transition duration-300" onClick={logoutAction}>Yes</button>
                    </div>
                </div>
            </motion.div>
        </React.Fragment>
    )
}