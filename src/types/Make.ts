export interface Make {
    data: CarMake[] | null
    loading: boolean
    error: boolean
}

export interface CarMake {
    id: number;
    name: string;
}