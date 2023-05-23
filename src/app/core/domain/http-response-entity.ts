export interface HttpResponseEntity<T = void> {
    message: string;
    data?: T;
}

export interface HttpResponseMessage {
    message: string;
}