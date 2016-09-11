import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SortDataService {

    public sort(data: any[], kolona: string, reverse: boolean = false): any[]{
        if (kolona === "") return data;

        let sortirano = _.sortBy(data, (d) => { return d[kolona];}); 
        if (reverse){
            sortirano = _.reverse(sortirano);
        }
        return sortirano;
    }
}