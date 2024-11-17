import type { Success, Error } from "#/@types";
import axios, { AxiosError } from "axios";
import { API } from "#/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "#/hooks/use-axios";
import type { User } from "#/@types";

export function useLogin() {
    type Body = {
        username: string;
        password: string
    }
    const POST = async (body: Body) => {
        const req = await axios.post(`${API}/auth/login`, body)
        return req.data
    }

    return useMutation<Success<Record<"username" | "role" | "token", string>>
        , AxiosError<Error>, Body>({
            mutationFn: POST
        })
}

export function useRegister() {
    type Body = {
        username: string;
        password: string
    }
    const POST = async (body: Body) => {
        const req = await axios.post(`${API}/auth/register`, body)
        return req.data
    }

    return useMutation<Success<string>, AxiosError<Error>, Body>({
        mutationFn: POST
    })
}

export function useCredential() {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    const GET = async ({ signal }: { signal: AbortSignal }) => {
        const req = await instance.get(`/auth/credential`, { signal, withCredentials: true })
        return req.data
    }

    return useQuery<Success<User>, AxiosError<Error>>({
        queryKey: ["CREDENTIAL"],
        queryFn: ({ signal }) => GET({ signal }),
        // staleTime: 1 * (60 * 1000), // 1 minute,
        throwOnError: true
    })
}

export function useCheckIsSuspend() {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    const GET = async ({ signal }: { signal: AbortSignal }) => {
        const req = await instance.get(`/auth/check/is-suspend`, { signal, withCredentials: true })
        return req.data
    }

    return useQuery<Success<User>, AxiosError<Error>>({
        queryKey: ["CHECK/IS-SUSPEND"],
        queryFn: ({ signal }) => GET({ signal }),
        enabled: false,
        retry: 0
    })

}