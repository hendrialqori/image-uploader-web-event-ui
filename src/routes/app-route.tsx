import React from "react"
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider, Navigate
} from "react-router-dom"
import * as Page from "#/pages"
import * as Boundary from "#/components/ui/boundary"
import ProtectRoute from "./protect-route"

function appRoutes() {
    return createBrowserRouter(
        createRoutesFromElements(
            <React.Fragment>
                <Route path="/" errorElement={<Boundary.RouterError />}>

                    <Route index element={<Navigate to="/upload" />} />

                    <Route path="auth">
                        <Route
                            path="login"
                            element={<Page.LoginPage />}
                        />
                        <Route path="register" element={<Page.RegisterPage />} />
                    </Route>

                    <Route path="upload" element={<ProtectRoute />}>
                        <Route index element={<Page.ImageUploadPage />} />
                    </Route>

                    <Route path="admin">
                        <Route path="login" element={<Page.AdminLoginPage />} />
                        <Route element={<ProtectRoute />}>
                            <Route path="dashboard" element={<Page.AdminDashboardPage />} />
                            <Route path="leaderboard" element={<Page.AdminLeaderboardPage />} />
                        </Route>
                    </Route>

                    <Route path="event-off" element={<Page.EventOffPage />} />
                </Route>
            </React.Fragment>
        )
    )
}

export default function AppRoute() {
    return <RouterProvider router={appRoutes()} />
}