import { HttpService, httpService } from './httpService';
import { Order } from '../types';

export class OrderApi {
    constructor(private readonly httpService: HttpService) {
        this.httpService = httpService;
    }

    createOrder = (data: Order): Promise<Order> =>
        this.httpService.makeRequest({ url: '/orders', method: 'POST', data });
}

export const orderApi = new OrderApi(httpService);
