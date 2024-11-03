export type Success<T> = {
    data: T;
    message: string
}

export type Error = {
    type: string;
    message: string
    status: number
}