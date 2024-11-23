import type { Success, Error } from "#/@types";
import { API } from "#/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useGetEventStatus() {
    const GET = async ({ signal }: { signal: AbortSignal }) => {
        const req = await axios.get(`${API}/setting/event`, { signal, withCredentials: true })
        return req.data
    }

    return useQuery<Success<{ status: "ON" | "OFF" }>>({
        queryKey: ["SETING/EVENT"],
        queryFn: GET
    })
}

export function useUpdateEventStatus() {
    type Body = {
        status: "ON" | "OFF";
    }
    const UPDATE = async (body: Body) => {
        const req = await axios.put(`${API}/setting/event`, body)
        return req.data
    }

    return useMutation<Success<string>, AxiosError<Error>, Body>({
        mutationFn: UPDATE
    })
}