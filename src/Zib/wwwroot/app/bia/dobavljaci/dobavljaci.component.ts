import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToasterService} from 'angular2-toaster/angular2-toaster';

import { DomService } from "../../shared/services/dom.service";
import { DobavljaciService } from './dobavljaci.service';
import { Dobavljac } from './dobavljac.model';

import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';

@Component({
    selector: '<dobavljaci></dobavljaci>',
    templateUrl: 'templates/dobavljaci',
    providers: [DobavljaciService, DomService],
    directives: []
})

export class DobavljaciComponent extends TableFormCrudBaseComponent<Dobavljac> implements OnInit {
    title = "Dobavljaci";
    columns = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            hidden: false
        }
    ]

    constructor(private _service: DobavljaciService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): Dobavljac{
        return new Dobavljac();
    }

    /**
     * Forma
     */
    buildForm() {
        this.formGroup = this.formBuilder.group({
            naziv: ['', Validators.required],
            adresa: [],
            mesto: [],
            telefon: [],
            kontaktOsoba: [],
            email: [],

        });
    }
}
