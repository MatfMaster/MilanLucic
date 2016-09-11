import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response, Headers} from '@angular/http';

import {BaseService} from '../shared/services/base.service';

@Injectable()
export class PretnjeRanjivostiService extends BaseService {
    baseUrl = 'api/pretnjeranjivosti'
    
    constructor(public http: Http) { 
        super();
    }

    public toggleRanjivost(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/toggleranjivost', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });        
    }

    public ranjivostiZaPretnju(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/ranjivostiZaPretnju/' + id, [], { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });        
    }

    public dodajRanjivostPretnji(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/dodajRanjivostPretnji', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });        
    }

    public obrisiRanjivost(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/obrisiRanjivost', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });        
    }

    defaultMereZaPretnjuRanjivost(id: number){
        return this.http.get(this.baseUrl + '/defaultMereZaPretnjuRanjivost/' + id)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
            
    }

    public togglePrimenjeneMere(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/toggleprimenjenamera', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }
}