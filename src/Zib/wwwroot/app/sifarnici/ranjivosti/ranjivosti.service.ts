import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class RanjivostiService extends BaseService {
    baseUrl = 'api/ranjivosti';
    
    constructor(public http: Http) { 
        super();
    }

    // get() {
    //     return this.http.get(this.url)
    //         .map((res: Response) => res.json())
    //         .catch(this.handleHttpError);;
    // }
    
}