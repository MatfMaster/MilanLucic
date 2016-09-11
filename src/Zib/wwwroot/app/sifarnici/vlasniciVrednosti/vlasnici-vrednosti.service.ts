import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class VlasniciVrednostiService extends BaseService {
    baseUrl = 'api/vlasnicivrednosti';
    
    constructor(public http: Http) { 
        super();
    }
}