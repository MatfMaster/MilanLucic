import { Component, ChangeDetectorRef } from '@angular/core';
// import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormBuilder, Validators} from "@angular/forms";

import { ToasterService} from 'angular2-toaster/angular2-toaster';
import { PotvrdiBrisanjeModalComponent } from '../../shared/components/modal/potvrdi-brisanje-modal.component';

//import {SELECT_DIRECTIVES} from '../../shared/components/select/select';

import { DomService } from "../../shared/services/dom.service";
import { PretnjeService } from './pretnje.service';
import { Pretnja } from './pretnja';

import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';
// import { ServerErrorComponent } from '../../shared/components/server-error.component';
// import { ScrollableTableComponent } from '../../shared/components/scrollable-table/scrollable-table.component';
// import { BootstrapPanelComponent} from '../../shared/components/bootstrap.panel.component';
// import { ButtonAddComponent } from '../../shared/components/buttons/button-add.component';
// import { ButtonDeleteComponent } from '../../shared/components/buttons/button-delete.component';
// import { ButtonSaveComponent } from '../../shared/components/buttons/button-save.component';
// import { ButtonCancelComponent } from '../../shared/components/buttons/button-cancel.component';
// import { FormFieldComponent } from '../../shared/components/field.component';
// import { BootstrapFormDirective, BootstrapInputDirective } from '../../shared/components/form-bootstrap.directives';
// import { FormButtonsGroupComponentComponent } from '../../shared/components/buttons/form-buttons-group.component';
// import { CheckboxComponent } from '../../shared/components/checkbox.component';
// import { SelectFieldComponent } from '../../shared/components/field-select.component';

@Component({
    selector: 'pretnje',
    templateUrl: 'templates/pretnje',    
    providers: [PretnjeService, DomService],
    directives: [
        // REACTIVE_FORM_DIRECTIVES,
        // SELECT_DIRECTIVES, 
        // ScrollableTableComponent, BootstrapPanelComponent, ButtonAddComponent, ServerErrorComponent, 
        // ButtonDeleteComponent, ButtonSaveComponent, ButtonCancelComponent, PotvrdiBrisanjeModalComponent, SelectFieldComponent,        
        // FormFieldComponent, BootstrapFormDirective, BootstrapInputDirective, FormButtonsGroupComponentComponent, CheckboxComponent
    ]
})
export class PretnjeComponent extends TableFormCrudBaseComponent<Pretnja>{
    title = "Pretnje";

    vrstePretnji = [];
    

    columns = [ 
        {
            field: 'id',
            header: 'Id',
            //width: 77,
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 30,
            hidden: false
        },
        {
            //field: 'vrstaPretnjeId',
            field: 'vrstaPretnje.opis',
            header: 'Vrsta pretnje',
            width: 25,
            hidden: false
        },
        {
            field: 'poverljivost',
            header: 'Poverljivost',
            //width: 110,
            hidden: false,
            alignData: 'center'
        },
        {
            field: 'integritet',
            header: 'Integritet',
            //width: 110,
            hidden: false,
            alignData: 'center'
        },
        {
            field: 'raspolozivost',
            header: 'Raspolozivost',
            //width: 110,
            hidden: false,
            alignData: 'center'
        }

    ]

    constructor(private _service: PretnjeService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }


    /* ng-select */
    // public selected(value:any):void {
    //     //console.log('selected: ', value);
    //     this.formRow.vrstaPretnje = value;
    //     console.log('selected: ', this.formRow.vrstaPretnje);
    // } 

    // typed(event){
    //     console.log('pretnje.component.typed(): ', event);
    // }

    // public refreshValue(value: any): any{
    //     //console.log('refreshValue: ', value);
    // }

    // ng2-select: inicijalna vrednost koju ce da prikaze - prebaceno u html
    // selectInitData(){
    //     return  this.formRow.vrstaPretnjeId;
    //     // console.log('selectInitData: ' , this.formRow.vrstaPretnje);
    //     // if (!this.formRow.vrstaPretnje) 
    //     //     return [];

    //     // return [{            
    //     //     id: this.formRow.vrstaPretnje.id, 
    //     //     text: this.formRow.vrstaPretnje.opis
    //     // }];
    // }
    /* End ng-select */


    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {        
        this.vrstePretnji = data.vrstePretnji;
        // Bez ovog dole pre inicijalizuje red u tabeli nego sto popuni item-se za select
        this.changeDetectionRef.detectChanges();
        this.scrollTable.onDataChanged(data.pretnje);
        //this.formRow.test = [1,3]; Multiselect
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): Pretnja{
        return new Pretnja();
    }
   
    buildForm() {

        this.formGroup = this.formBuilder.group({
            naziv: ['', Validators.required],
            vrstaPretnjeId: ['', Validators.required],
            poverljivost: [],
            integritet: [],
            raspolozivost: []
            //,test: [] Multiselect

        // Low level API
        // this.formGroup = new FormGroup({
        //     naziv: new FormControl('', Validators.required),
        //     vrstaPretnjeId: new FormControl('', Validators.required),
        //     poverljivost: new FormControl(''),
        //     integritet: new FormControl(''),
        //     raspolozivost: new FormControl('')

            // Stare forme
            // naziv: [this.formRow.naziv, Validators.compose([Validators.required])],
            // vrstaPretnjeId: [this.formRow.vrstaPretnjeId, Validators.compose([Validators.required])],
            // poverljivost: [this.formRow.poverljivost],
            // integritet: [this.formRow.integritet],
            // raspolozivost: [this.formRow.raspolozivost]
        });
    }

}

