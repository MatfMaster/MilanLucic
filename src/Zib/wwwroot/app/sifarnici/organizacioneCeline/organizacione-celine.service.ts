import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class OrganizacioneCelineService extends BaseService {
    baseUrl = 'api/organizacioneceline';
    
    constructor(public http: Http) { 
        super();
    }
}