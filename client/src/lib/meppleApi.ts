import { HttpService, httpService } from './httpService';
import { Mepple } from '../types';

export class MeepleApi {
    constructor(private readonly httpService: HttpService) {
        this.httpService = httpService;
    }

    fetchMeppleList = (): Promise<Mepple[]> =>
        this.httpService.makeRequest({ url: '/meeples', method: 'GET' });
}

export const meepleApi = new MeepleApi(httpService);
