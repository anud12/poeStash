import * as request from "request";
import {RequestCallback} from "request";
import {CoreOptions} from "request";
import {UriOptions} from "request";


export class RestRequest {
    static build(url = "http://localhost:8080") {
        return new RestRequest(url)
    }

    ROOT_URL: string;

    constructor(url: string) {
        this.ROOT_URL = url;
    }

    get = async <T>(url: string, headers?): Promise<Response<T>> =>
        await parseRequest({
            uri: this.ROOT_URL + url,
            headers,
            method: "GET"
        });
    post = async <T>(url: string, headers?): Promise<Response<T>> =>
        await parseRequest({
            uri: this.ROOT_URL + url,
            headers,
            method: "POST"
        });
    put = async <T>(url: string, headers?): Promise<Response<T>> =>
        await parseRequest({
            uri: this.ROOT_URL + url,
            headers,
            method: "PUT"
        });
    delete = async <T>(url: string, headers?): Promise<Response<T>> =>
        await parseRequest({
            uri: this.ROOT_URL + url,
            headers,
            method: "DELETE"
        });
}

class Response<T> {
    body: T;
    statusCode: number;
}

async function parseRequest<T>(options: CoreOptions & UriOptions): Promise<Response<T>> {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve({
                body: JSON.parse(response.body),
                statusCode: response.statusCode
            });
        });
    });
}

export default RestRequest.build();


