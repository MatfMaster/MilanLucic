import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToasterService} from 'angular2-toaster/angular2-toaster';

import { DomService } from "../../shared/services/dom.service";

import { VlasniciVrednostiService } from './vlasnici-vrednosti.service';
import { VlasnikVrednosti } from './vlasnik-vrednosti.model';

import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';

@Component({
    selector: '<vlasnici-vrednosti></vlasnici-vrednosti>',
    templateUrl: 'templates/vlasnicivrednosti',    
    providers: [VlasniciVrednostiService, DomService],
    directives: [
        ]
})
export class VlasniciVrednostiComponent extends TableFormCrudBaseComponent<VlasnikVrednosti>{
    title = "Vlasnici vrednosti";

    vlasniciVrednosti = [];
    organizacioneCeline = [];
    

    columns = [ 
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'ime',
            header: 'Ime',
            width: 30,
            hidden: false
        },
        {
            field: 'prezime',
            header: 'Prezime',
            width: 30,
            hidden: false
        },
        {
            field: 'organizacionaCelina.naziv',
            header: 'Organizaciona jedinica',
            width: 40,
            hidden: false
        }

    ]

    constructor(private _service: VlasniciVrednostiService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }


    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.vlasniciVrednosti = data.vlasniciVrednosti;
        this.organizacioneCeline = data.organizacioneCeline;
        // Bez ovog dole pre inicijalizuje red u tabeli nego sto popuni item-se za select
        this.changeDetectionRef.detectChanges();

        this.scrollTable.onDataChanged(this.vlasniciVrednosti);
        //this.formRow.test = [1,3]; Multiselect
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): VlasnikVrednosti {
        return new VlasnikVrednosti();
    }
   
    buildForm() {

        this.formGroup = this.formBuilder.group({
            ime: ['', Validators.required],
            prezime: ['', Validators.required],
            organizacionaCelinaId: ['', Validators.required]
            
        });
    }

}
