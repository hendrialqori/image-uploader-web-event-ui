import type { Success, Error, Query, User, Image } from "#/@types";
import useAxios from "#/hooks/use-axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useGetUsers(query: Query) {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    const queries = new URLSearchParams()
    queries.set("page", query.page.toString())
    queries.set("sort_key", query.sort_key)
    queries.set("sort_type", query.sort_type)
    queries.set("user_search", query.user_search)

    const GET = async ({ signal }: { signal: AbortSignal }) => {
        const req = await instance.get(`/user/list?${queries.toString()}`, { signal, withCredentials: true })
        return req.data
    }

    return useQuery<Success<User[]>, AxiosError<Error>>({
        queryKey: ["USERS", query],
        queryFn: ({ signal }) => GET({ signal }),
        staleTime: 1 * (60 * 1000), // 1 minute,
        throwOnError: true
    })
}

export function useGetUserUploads(userId: string) {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    const GET = async ({ signal }: { signal: AbortSignal }) => {
        const req = await instance.get(`/image/list/${userId}`, { signal })
        return req.data
    }

    return useQuery<Success<Image[]>, AxiosError<Error>>({
        queryKey: ["USER/IMAGES", userId],
        queryFn: ({ signal }) => GET({ signal }),
        // staleTime: 1 * (60 * 1000), // 1 minute,
        enabled: Boolean(userId),
        throwOnError: true
    })
}

export function useSuspendUser() {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    type Payload = { userId: string }

    const PUT = async ({ userId }: Payload) => {
        const req = await instance.put(`/user/suspend/${userId}`)
        return req.data
    }

    return useMutation<Success<null>, AxiosError<Error>, Payload>({
        mutationKey: ["USER/SUSPEND"],
        mutationFn: PUT
    })
}


export function useRecoveryUser() {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    type Payload = { userId: string }

    const PUT = async ({ userId }: Payload) => {
        const req = await instance.put(`/user/recovery/${userId}`)
        return req.data
    }

    return useMutation<Success<null>, AxiosError<Error>, Payload>({
        mutationKey: ["USER/RECOVER"],
        mutationFn: PUT
    })
} 