import type { Success, Error } from "#/@types";
import useAxios from "#/hooks/use-axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosProgressEvent } from "axios";


export function useUploadImage(cb: (event: AxiosProgressEvent) => void) {
    const axiosInstance = useAxios()
    const instance = axiosInstance()

    type Params = {
        formData: FormData;
        signal: AbortSignal
    }

    const POST = async ({ formData, signal }: Params) => {
        const req = await instance.post("/image/add", formData, {
            onUploadProgress: cb,
            signal
        })
        return req.data
    }

    return useMutation<Success<string>, AxiosError<Error>, Params>({
        mutationKey: ["UPLOAD/IMAGE"],
        mutationFn: POST
    })

}