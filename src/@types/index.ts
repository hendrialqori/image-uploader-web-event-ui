export type Success<T> = {
    status: number;
    data: T;
    metadata: Metadata
    message: string
}

export type Error = {
    type: string;
    status: number
    message: string
}

export type Metadata = {
    page: number;
    limit: number;
    from: number;
    to: number;
    total_row: number;
}

export type Query = {
    page: number;
    sort_type: string;
    sort_key: string;
    user_search: string;
}

export type User = {
    id: string,
    username: string
    role: string
    point: number
    total_upload: number
    created_at: Date | string
    updated_at: Date | string
}

export type Image = {
    id: string;
    title: string;
    category: string;
    point: string;
    user: {
        id: string,
        username: string
    },
}

export type FileHistory = {
    file: string, // base64
    type: string
    metadata: {
        name: string,
        size: number
    }
}