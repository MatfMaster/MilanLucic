import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class PretnjeService extends BaseService {
    baseUrl = 'api/pretnje';
    
    constructor(public http: Http) { 
        super();
    }
}