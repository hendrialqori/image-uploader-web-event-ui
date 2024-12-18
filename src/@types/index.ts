export type Success<T> = {
    status: number;
    data: T;
    metadata: Metadata
    message: string
}

export type Error = {
    errors: Record<string, []>
    type: string;
    status: string;
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
    id: string;
    username: string;
    role: string;
    point: number;
    total_upload: number;
    is_suspend: boolean;
    created_at: Date | string
    updated_at: Date | string
}

export type Image = {
    id: string;
    title: string;
    category: string;
    point: number;
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

export type Placement = {
    rank: number | null
    username: string | null;
    is_suspend: boolean | null;
    point: number | null;
    total_upload: number | null
} 
