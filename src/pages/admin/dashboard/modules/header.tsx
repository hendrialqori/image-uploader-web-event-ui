import { useCredential } from "#/services/auth-service"

export default function Header() {
    const { data: credential } = useCredential()

    return (
        <header>
            <div aria-label="title">
                <p className="text-xs font-medium text-gray-500">Welcome back,</p>
                <h1 className="text-xl font-bold !-tracking-wide">{credential?.data.username ?? "-"} <span className="text-black text-xs font-medium bg-gray-200 px-4 py-1 rounded-lg">superadmin</span></h1>
                <p className="text-sm font-medium text-gray-500">Track users image uploads activity</p>
            </div>
        </header>
    )
}