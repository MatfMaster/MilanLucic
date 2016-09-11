import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import {BaseService} from '../shared/services/base.service';

@Injectable()
export class VrednostiService extends BaseService {
    baseUrl = 'api/vrednosti';
    
    constructor(public http: Http) { 
        super();
    }

    vrednostiZaVrstuVrednosti(vrstaVrednostiId) {
        return this.http.get(this.baseUrl + '/VrednostiZaVrstuVrednosti/' + vrstaVrednostiId)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }   
}