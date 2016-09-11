
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../shared/services/base.service';

@Injectable()
export class MereService extends BaseService {
    baseUrl = 'api/mere';
    
    constructor(public http: Http) { 
        super();
    }
}