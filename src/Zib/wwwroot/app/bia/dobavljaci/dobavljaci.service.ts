import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class DobavljaciService extends BaseService {
    baseUrl = 'api/dobavljaci';
    
    constructor(public http: Http) { 
        super();
    }
    
}