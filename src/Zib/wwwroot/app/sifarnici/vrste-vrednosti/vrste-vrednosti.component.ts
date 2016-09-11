import { Component, ChangeDetectorRef } from "@angular/core";
//import {REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators} from "@angular/forms";
import {FormBuilder, Validators} from "@angular/forms";

import { DomService } from "../../shared/services/dom.service";
import {ToasterService} from "angular2-toaster/angular2-toaster";

import {VrsteVrednostiService} from "./vrste-vrednosti.service";
import {VrstaVrednosti} from "./vrsta-vrednosti.model";

//import { SHARED_COMPONENTS } from '../../shared/shared-components';

import {TreeTableFormCrudBaseComponent} from "../../shared/components/tree-table-form-crud-base.component";
// rc5
// import {PotvrdiBrisanjeModalComponent} from "../../shared/components/modal/potvrdi-brisanje-modal.component";
// import {SELECT_DIRECTIVES} from "../../shared/components/select/select";
// import {ServerErrorComponent} from "../../shared/components/server-error.component";
// import {TreeScrollableTableComponent} from "../../shared/components/scrollable-table/tree-scrollable-table.component";
// import {BootstrapPanelComponent} from "../../shared/components/bootstrap.panel.component";
// import {ButtonAddComponent} from "../../shared/components/buttons/button-add.component";
// import {ButtonDeleteComponent} from "../../shared/components/buttons/button-delete.component";
// import {ButtonSaveComponent} from "../../shared/components/buttons/button-save.component";
// import {ButtonCancelComponent} from "../../shared/components/buttons/button-cancel.component";
// import {FormFieldComponent} from "../../shared/components/field.component";
// import {BootstrapFormDirective, BootstrapInputDirective} from "../../shared/components/form-bootstrap.directives";
// import {FormButtonsGroupComponentComponent} from "../../shared/components/buttons/form-buttons-group.component";
// import {CheckboxComponent} from "../../shared/components/checkbox.component";
// import {SelectFieldComponent} from "../../shared/components/field-select.component";


@Component({
    selector: 'vrste-vrednosti',
    templateUrl: 'templates/vrstevrednosti',
    providers: [VrsteVrednostiService, DomService],
    directives: [
        // SHARED_COMPONENTS,
//        REACTIVE_FORM_DIRECTIVES, 
        //TreeScrollableTableComponent,
        // SELECT_DIRECTIVES, 
        // BootstrapPanelComponent, ButtonAddComponent, ServerErrorComponent, 
        // ButtonDeleteComponent, ButtonSaveComponent, ButtonCancelComponent, PotvrdiBrisanjeModalComponent, SelectFieldComponent,        
        // FormFieldComponent, BootstrapFormDirective, BootstrapInputDirective, FormButtonsGroupComponentComponent, CheckboxComponent
   ]
})
export class VrsteVrednostiComponent extends TreeTableFormCrudBaseComponent<VrstaVrednosti>{

    title = "Vrste vrednosti";

    nadredjeniSelect = [];
    organizacioneCeline = [];
    poslovneVrednosti = [];

    columns = [
        {
            field: 'id',
            header: 'Id',
            width: 10,
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 30,
            hidden: false
        },
        {
            field: 'opis',
            header: 'Opis',
            width: 30,
            hidden: false
        },
        {
            field: 'nadredjenaKategorija',
            header: 'Nadredjena',
            //width: 15,
            hidden: true
        },
        {
            field: 'poslovnaVrednost.vrednost',
            header: 'Vrednost',
            width: 13,
            alignData: 'center',
            hidden: false
        },
        {
            field: 'organizacionaCelina.naziv',
            header: 'Oj',
            //width: 20,
            hidden: false
        }
    ];

    constructor(private _service: VrsteVrednostiService, private _fb: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super('vrstaVrednosti', _service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.nadredjeniSelect = data.nadredjeniSelect;
        this.organizacioneCeline = data.organizacioneCeline;
        this.poslovneVrednosti = data.poslovneVrednosti;
        // Bez ovog dole pre inicijalizuje red u tabeli nego sto popuni item-se za select
        this.changeDetectionRef.detectChanges();

        this.treeScrollTable.onDataChanged(data.vrsteVrednostiHijerarhija);
    }

    postSuccessInsert(res){
        this.nadredjeniSelect = res.data.vrstaVrednostiForSelect;
    }

    postSuccessUpdate(res){
        this.nadredjeniSelect = res.data.vrstaVrednostiForSelect;
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): VrstaVrednosti{
        return new VrstaVrednosti();
    }
   
    buildForm() {
        this.formGroup = this._fb.group({
            naziv: ['', Validators.required],
            opis: [],
            nadredjenaKategorija: [],
            poslovnaVrednostId: [],
            organizacionaCelinaId: []
        });

        // this.formControlGroup = this._fb.group({
        //     naziv: [this.formRow.naziv, Validators.compose([Validators.required])],
        //     opis: [this.formRow.opis],
        //     nadredjenaKategorija: [this.formRow.nadredjenaKategorija],
        //     poslovnaVrednostId: [this.formRow.poslovnaVrednostId],
        //     organizacionaCelinaId: [this.formRow.organizacionaCelinaId]
        // });
    }
}

