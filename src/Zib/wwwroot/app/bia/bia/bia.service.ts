import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Response, Headers} from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class BiaService extends BaseService {
    baseUrl = 'api/bia'
    
    constructor(public http: Http) { 
        super();
    }

    public toggleDobavljac(data) {
        return this.toggle(data, 'dobavljac');
    }

    public toggleZaposleni(data) {
        return this.toggle(data, 'zaposleni');
    }

    public toggleResursi(data) {
        return this.toggle(data, 'resursi');
    }
    private toggle(data, actionUrl) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/toggle' + actionUrl, JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

}