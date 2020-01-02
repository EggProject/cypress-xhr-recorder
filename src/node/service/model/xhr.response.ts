export interface XhrResponse {
    url: string;
    statusCode: number;
    statusMessage: string;
    headers: { [key: string]: string };
    body: any;
}
