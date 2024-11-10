import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import ModalLogout from "#/components/modal-logout";

export default function Aside() {

    const [isLogout, setLogout] = React.useState(false)

    function modalLogout(type: "show" | "hide") {
        return () => setLogout(type === "show" ? true : false)
    }

    return (
        <React.Fragment>
            <aside className="w-14 min-h-dvh bg-gray-100 flex-center flex-col justify-between py-3 sticky top-0">
                <div className="space-y-5">
                    <div>
                        <img src="/pertamina-logo.png" className="size-8" alt="logo" width={30} height={30} />
                    </div>
                    <div className="bg-white rounded-lg w-max p-2 border-2 border-gray-200 hover:outline hover:outline-black">
                        <RxDashboard className="text-2xl" />
                    </div>
                </div>
                <button className="bg-white rounded-lg w-max p-2 border-2 border-gray-200 hover:outline hover:outline-black" onClick={modalLogout("show")}>
                    <PiSignOut className="text-xl" />
                </button>
            </aside>
            <ModalLogout isOpen={isLogout} onClose={modalLogout("hide")} />
        </React.Fragment>
    )
}