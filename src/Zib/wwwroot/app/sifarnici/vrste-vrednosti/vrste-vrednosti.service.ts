import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class VrsteVrednostiService extends BaseService {
    baseUrl = 'api/vrstevrednosti';
    
    constructor(public http: Http) { 
        super();
    }
}