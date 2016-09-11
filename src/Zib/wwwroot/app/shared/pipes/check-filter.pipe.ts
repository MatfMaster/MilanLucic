import { Pipe, PipeTransform  } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'CheckFilter'
})
export class CheckFilterPipe {

    transform(items, prikazIzabranih, filterText) {
        //debugger;
        let ret = items.filter(item => {
            return prikazIzabranih ? item.checked && this.isRowInFilter(item, filterText) : this.isRowInFilter(item, filterText);
        });
        debugger;
        return ret;
    }

    /**
     * Da li je 'row' u filtriranim redovima
     */
    protected isRowInFilter(row, filterText): boolean {
        if (filterText === "") return true;

        // _.valuesIn pravi niz sa vrednostima propertija u objektu
        let values = '%' + _.valuesIn(row).join('%') + '%';
        values = values.toLowerCase().replace('%true%','').replace('%false%','');
        return values && values.indexOf(filterText.toLowerCase()) >= 0;
    }


}