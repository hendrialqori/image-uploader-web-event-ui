import Portal from "#/components/portal"
import { TOKEN } from "#/constant";
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

export default function ModalLogout({ isOpen, onClose }: Props) {
    const navigate = useNavigate()

    function logoutAction() {
        localStorage.removeItem(TOKEN)
        navigate("/auth/login")
        onClose()
    }

    return (
        <Portal isOpen={isOpen}>
            <div className="relative bg-white rounded-3xl w-[320px] h-max py-7 space-y-8 font-lilita-one">
                <div className="flex-center flex-col gap-3">
                    <GoAlertFill className="text-red-500 text-4xl" />
                    <p className="text-sm md:text-base font-medium">Are you sure leave this page ?</p>
                </div>
                <div className="flex-center gap-4">
                    <button onClick={onClose} className="text-sm md:text-base font-medium bg-gray-200 hover:outline hover:outline-black text-black rounded-md py-1.5 px-6">Cancel</button>
                    <button onClick={logoutAction} className="text-sm md:text-base font-medium bg-red-500 hover:outline hover:outline-red-600 text-white rounded-md py-1.5 px-6">Logout</button>
                </div>
            </div>
        </Portal>
    )
}