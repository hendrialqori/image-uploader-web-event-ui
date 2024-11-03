import { TOKEN } from "#/constant";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoute() {
    const token = localStorage.getItem(TOKEN);

    if (!token) return <Navigate to="/auth/login" />

    return <Outlet />

}