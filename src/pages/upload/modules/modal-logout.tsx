import Portal from "#/components/portal"
import { TOKEN } from "#/constant";
import { GoAlertFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
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
            <div className="relative bg-white rounded-lg w-[320px] h-max px-5 py-3 space-y-5">
                <button onClick={onClose} className="absolute right-3 top-3 hover:outline hover:outline-black rounded-lg p-1">
                    <IoMdClose className="text-lg md:text-xl" />
                </button>
                <div className="flex-center flex-col gap-3">
                    <GoAlertFill className="text-red-500 text-4xl" />
                    <p className="text-sm font-medium">Are you sure leave this page ?</p>
                </div>
                <div className="flex-center gap-4 pb-3">
                    <button onClick={onClose} className="text-sm bg-gray-200 hover:outline hover:outline-black text-black rounded-md py-1.5 px-6">Cancel</button>
                    <button onClick={logoutAction} className="text-sm font-medium bg-red-500 hover:outline hover:outline-red-600 text-white rounded-md py-1.5 px-6">Logout</button>
                </div>
            </div>
        </Portal>
    )
}