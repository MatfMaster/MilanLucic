import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators} from "@angular/forms";

import * as _ from 'lodash';

//import { NKDatetime } from 'ng2-datetime/ng2-datetime';
//import {DateTimePickerDirective} from "ng2-datetime-picker";
import {DateTimePickerDirective} from "../shared/components/datetime-picker/datetime-picker.directive";

import {ToasterService} from "angular2-toaster/angular2-toaster";

import { DomService } from "../shared/services/dom.service";

import {MereService} from "./mere.service";
import {Mera} from "./mera.model";

import {SELECT_DIRECTIVES} from "../shared/components/select/select";
import {PotvrdiBrisanjeModalComponent} from "../shared/components/modal/potvrdi-brisanje-modal.component";
import {TableFormCrudBaseComponent} from "../shared/components/table-form-crud-base.component";
import {ScrollableTableComponent} from "../shared/components/scrollable-table/scrollable-table.component";
import {BootstrapPanelComponent} from "../shared/components/bootstrap.panel.component";
import {ButtonAddComponent} from "../shared/components/buttons/button-add.component";
import {ButtonDeleteComponent} from "../shared/components/buttons/button-delete.component";
import {ButtonSaveComponent} from "../shared/components/buttons/button-save.component";
import {ButtonCancelComponent} from "../shared/components/buttons/button-cancel.component";
import {FormFieldComponent} from "../shared/components/field.component";
import {BootstrapFormDirective, BootstrapInputDirective} from "../shared/components/form-bootstrap.directives";
import {FormButtonsGroupComponentComponent} from "../shared/components/buttons/form-buttons-group.component";
import { CheckboxComponent } from '../shared/components/checkbox.component';


@Component({
    selector: 'mere',
    templateUrl: 'templates/mere',
    providers: [MereService, DomService],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        // DATEPICKER_DIRECTIVES,
        //NKDatetime,
        DateTimePickerDirective,
        SELECT_DIRECTIVES,
        ScrollableTableComponent, BootstrapPanelComponent, PotvrdiBrisanjeModalComponent,
        ButtonAddComponent, ButtonDeleteComponent, ButtonSaveComponent, ButtonCancelComponent,
        FormFieldComponent, BootstrapFormDirective, BootstrapInputDirective, FormButtonsGroupComponentComponent,
        CheckboxComponent
    ]
})

export class MereComponent extends TableFormCrudBaseComponent<Mera> implements OnInit {
    title = "Mere";

    mere = [];
    statusMere = [];
    zaposleni = [];

    columns = [
        {
            field: 'oznaka',
            header: 'Oznaka',
            width: 20,
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 70
        },
        {
            field: 'aktivna',
            header: 'Aktivna',
            alignData: 'center',
            width: 10
        }

    ];

    constructor(private _service: MereService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): Mera{
        let mera = new Mera();
        mera.aktivna = true;
        return mera;
    }

    /**
     * Zbog Workaround-a dok ne obezbede resetovanje forme
     */
    buildForm() {
        this.formGroup = this.formBuilder.group({
            oznaka: [],
            naziv: ['', Validators.required],
            aktivna: [],
            grupna: [],
            zaduzenZaImplementaciju: [],
            rokZaImplementaciju: [],
            statusMereId: []
//            statusMereId: ['', Validators.required]
        });
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.mere = data.mere;
        this.mere.forEach(mera => {
            mera.rokZaImplementaciju = new Date("01-01-2015 00:00:00"); //new Date(mera.rokZaImplementaciju.toString());
        });


        this.statusMere = data.statusMere;
        this.zaposleni = data.zaposleni;
        this.scrollTable.onDataChanged(this.mere);
    }

    // /**
    //   * Promena reda u gridu
    //   */
    // rowChanged(row: Mera) {
    //     if (!row) {
    //         this.formRow = this.newT();
    //         this.gridRow = this.newT();
    //     } else {
    //         this.formRow = _.cloneDeep(row);
    //         this.gridRow = _.cloneDeep(row);
    //     }
    // }
}

