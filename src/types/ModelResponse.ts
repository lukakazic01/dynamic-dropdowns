export interface ModelResponse {
    data: CarModel[] | null,
    loading: boolean
    error: boolean
}

export interface CarModel {
    model: string;
}