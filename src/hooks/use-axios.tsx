import axios from "axios";
import { API, TOKEN } from "#/constant";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
    const redirect = useNavigate()

    const request = () => {
        const token = localStorage.getItem(TOKEN) ?? ""

        const instance = axios.create({
            baseURL: API,
            timeout: 10 * 60 * 1000, // 10 minute
            headers: {
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        })

        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const unauthorize = error.response.status === 401
                if (unauthorize) {
                    redirect("/auth/login")
                }

                return Promise.reject(error)
            }
        )
        return instance
    }

    return request
}

export default useAxios