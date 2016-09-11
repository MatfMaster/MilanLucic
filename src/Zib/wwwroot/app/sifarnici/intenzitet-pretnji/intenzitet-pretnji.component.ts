import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToasterService} from 'angular2-toaster/angular2-toaster';
import { DomService } from "../../shared/services/dom.service";

import { IntenzitetPretnjiService } from './intenzitet-pretnji.service';
import { IntenzitetPretnje } from './intenzitet-pretnje.model';

import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';

@Component({
    selector: '<intenzitet-pretnji></intenzitet-pretnji>',
    templateUrl: 'templates/intenzitetpretnji',    
    providers: [IntenzitetPretnjiService, DomService],
    directives: []
})
export class IntenzitetPretnjiComponent extends TableFormCrudBaseComponent<IntenzitetPretnje>{
    title = "Intenzitet pretnji";

    intenzitetPretnji = [];
    // Za disabled
//    data = [];

    columns = [ 
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 80,
            hidden: false
        },
        {
            field: 'vrednost',
            header: 'Vrednost',
            width: 20,
            alignData: 'center'
        }
    ]

    constructor(private _service: IntenzitetPretnjiService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.data = data;
        this.scrollTable.onDataChanged(this.data);
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): IntenzitetPretnje{
        return new IntenzitetPretnje();
    }
   
    buildForm() {

        this.formGroup = this.formBuilder.group({
            naziv: ['', Validators.required],
            vrednost: ['', Validators.required]
        });
    }

    formDisabled(){
        return this.data.length < 1 && !this.dodavanje;
    }

}

