import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class IntenzitetPretnjiService extends BaseService {
    baseUrl = 'api/intenzitetpretnji';
    
    constructor(public http: Http) { 
        super();
    }
}