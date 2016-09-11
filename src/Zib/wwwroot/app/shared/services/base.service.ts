/**
 * Ancestor za HTTP servise 
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class BaseService {
    baseUrl = '';
    http: Http;

    constructor() { }
 
    get(url: string = '') {
        return this.http.get(this.baseUrl + url)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
                // return Observable.throw(res.json());
            });
    }

    post(data: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl, JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

    put(id: number, data: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.baseUrl + '/' + id, JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

    delete(id) {
        // RC5  se buni ako je request.body === null a ima headers sa Contetent-Type
        // Za delete header nije ni poreban
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');

        // return this.http.delete(this.baseUrl + '/' + id, { headers: headers, body: '' })
        return this.http.delete(this.baseUrl + '/' + id)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);                
            });
    }

    protected handleHttpError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        alert(errMsg);
        return Observable.throw(errMsg);
    }

}