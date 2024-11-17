import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiRankingLight } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import ModalLogout from "#/components/modal-logout";
import { Link } from "react-router-dom";

export default function Aside() {

    const [isLogout, setLogout] = React.useState(false)

    function modalLogout(type: "show" | "hide") {
        return () => setLogout(type === "show" ? true : false)
    }

    return (
        <React.Fragment>
            <aside className="w-9 md:w-14 h-dvh bg-gray-100 flex-center flex-col justify-between py-3 sticky top-0">
                <div className="flex-center flex-col gap-3">
                    <div>
                        <img src="/lego-icon.png" alt="lego-icon" className="w-8 mb-3" />
                    </div>
                    <Link to="/admin/dashboard" >
                        <div className="bg-white rounded-md md:rounded-lg w-max p-1 md:p-2 border-2 border-gray-200 hover:outline hover:outline-black">
                            <RxDashboard className="text-base md:text-2xl" />
                        </div>
                    </Link>
                    <Link to="/admin/leaderboard" >
                        <div className="bg-white rounded-md md:rounded-lg w-max p-1 md:p-2 border-2 border-gray-200 hover:outline hover:outline-black">
                            <PiRankingLight className="text-base md:text-2xl" />
                        </div>
                    </Link>
                </div>
                <button className="bg-white rounded-md md:rounded-lg w-max p-1 md:p-2 border-2 border-gray-200 hover:outline hover:outline-black" onClick={modalLogout("show")}>
                    <PiSignOut className="text-sm md:text-xl" />
                </button>
            </aside>
            <ModalLogout isOpen={isLogout} onClose={modalLogout("hide")} />
        </React.Fragment>
    )
}