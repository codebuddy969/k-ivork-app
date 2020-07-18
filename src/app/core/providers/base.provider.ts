import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BaseProvider {

    constructor(protected readonly http: HttpClient) {}

    protected PrepareFormData<T>(body: T): FormData {
        const form = new FormData();
        form.append('body', new Blob([JSON.stringify(body)], {type: 'application/json'}));
        return form;
    }

    public Request<R>(method: 'GET', url: string, body?: any): Promise<R> {
        if (body) {
            return this.http.request<R>(method, url, { body }).toPromise();
        }

        return this.http.request<R>(method, url).toPromise();
    }

}
