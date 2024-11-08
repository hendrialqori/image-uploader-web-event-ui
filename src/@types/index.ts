export type Success<T> = {
    status: number;
    data: T;
    message: string
}

export type Error = {
    type: string;
    status: number
    message: string
}

export type User = {
    id: string,
    username: string
    role: string
    point: number
    created_at: Date | string
    updated_at: Date | string
}

export type FileHistory = {
    file: string, // base64
    type: string
    metadata: {
        name: string,
        size: number
    }
}