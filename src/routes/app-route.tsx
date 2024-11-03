import React from "react"
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider, Navigate
} from "react-router-dom"
import * as Page from "#/pages"
import ProtectRoute from "./protect-route"

function appRoutes() {
    return createBrowserRouter(
        createRoutesFromElements(
            <React.Fragment>
                <Route path="/">
                    <Route index element={<Navigate to="/upload" />} />

                    <Route path="auth">
                        <Route path="login" element={<Page.LoginPage />} />
                        <Route path="register" element={<Page.RegisterPage />} />
                    </Route>

                    <Route path="upload" element={<ProtectRoute />}>
                        <Route index element={<Page.ImageUploadPage />} />
                    </Route>

                    <Route path="admin" element={<ProtectRoute />}>
                        <Route path="dashboard" element={<Page.AdminDashboardPage />} />
                    </Route>

                    <Route path="leaderboard">
                        <Route index element={<Page.LeaderboardPage />} />
                    </Route>

                </Route>
            </React.Fragment>
        )
    )
}

export default function AppRoute() {
    return <RouterProvider router={appRoutes()} />
}