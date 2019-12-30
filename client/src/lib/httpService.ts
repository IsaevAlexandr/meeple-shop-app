import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export const baseURL = process.env.PUBLIC_URL || 'http://localhost:1337';

export class HttpService {
    constructor(private readonly service: AxiosInstance = Axios) {}

    makeRequest(params: AxiosRequestConfig) {
        const config: AxiosRequestConfig = {
            baseURL,
            method: 'GET',
            ...params,
        };

        // request with auth token example
        // const userInfo = cookieService.getCookie();
        // if (userInfo && userInfo.token) {
        //     config.headers = {
        //         Authorization: `Bearer ${userInfo.token}`,
        //         ...params.headers,
        //     };
        // }

        return this.service(config)
            .then(({ data }) => data)
            .catch(({ response }) => Promise.reject(response));
    }
}

export const httpService = new HttpService();
