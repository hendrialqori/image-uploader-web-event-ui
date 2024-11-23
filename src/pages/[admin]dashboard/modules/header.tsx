import { useCredential } from "#/services/auth-service"
import ModalSetting from "./modal-setting";

export default function Header() {
    const { data: credential } = useCredential()

    return (
        <header className="flex items-start justify-between">
            <div aria-label="title">
                <p className="text-[0.65rem] md:text-xs font-medium text-gray-500">Welcome back,</p>
                <h1 className="text-sm md:text-xl font-bold tracking-wide text-pertamina-navy">{credential?.data.username ?? "-"} <span className="text-black text-[0.65rem] md:text-xs font-medium bg-gray-200 px-2 md:px-4 py-1 rounded-lg">superadmin</span></h1>
                <p className="text-[0.7rem] md:text-sm font-medium text-gray-500">Track users image uploads activity</p>
            </div>
            <ModalSetting />
        </header>
    )
}