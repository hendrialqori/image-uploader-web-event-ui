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
            <aside className="w-9 md:w-14 h-dvh bg-gray-100 flex-center flex-col justify-between py-3 sticky top-0">
                <div className="space-y-5">
                    <div>
                        <img src="/pertamina-logo.png" className="size-6 md:size-8" alt="logo" width={30} height={30} />
                    </div>
                    <div className="bg-white rounded-md md:rounded-lg w-max p-1 md:p-2 border-2 border-gray-200 hover:outline hover:outline-black">
                        <RxDashboard className="text-base md:text-2xl" />
                    </div>
                </div>
                <button className="bg-white rounded-md md:rounded-lg w-max p-1 md:p-2 border-2 border-gray-200 hover:outline hover:outline-black" onClick={modalLogout("show")}>
                    <PiSignOut className="text-sm md:text-xl" />
                </button>
            </aside>
            <ModalLogout isOpen={isLogout} onClose={modalLogout("hide")} />
        </React.Fragment>
    )
}