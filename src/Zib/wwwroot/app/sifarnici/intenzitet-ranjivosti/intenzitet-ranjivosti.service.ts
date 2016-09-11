import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class IntenzitetRanjivostiService extends BaseService {
    baseUrl = 'api/intenzitetranjivosti';
    
    constructor(public http: Http) { 
        super();
    }
}