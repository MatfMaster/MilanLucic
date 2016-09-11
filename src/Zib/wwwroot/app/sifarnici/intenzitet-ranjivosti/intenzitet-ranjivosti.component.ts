import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToasterService} from 'angular2-toaster/angular2-toaster';

import { DomService } from "../../shared/services/dom.service";
import { IntenzitetRanjivostiService } from './intenzitet-ranjivosti.service';
import { IntenzitetRanjivosti } from './intenzitet-ranjivosti.model';

import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';

@Component({
    selector: 'intenzitet-ranjivosti',
    templateUrl: 'templates/intenzitetranjivosti',    
    providers: [IntenzitetRanjivostiService, DomService],
    directives: []
})
export class IntenzitetRanjivostiComponent extends TableFormCrudBaseComponent<IntenzitetRanjivosti>{
    title = "Intenzitet ranjivosti";

    intenzitetPretnji = [];

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

    constructor(private _service: IntenzitetRanjivostiService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
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
    newT(): IntenzitetRanjivosti{
        return new IntenzitetRanjivosti();
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

