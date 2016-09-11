import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import * as _ from 'lodash';
import { ToasterService} from 'angular2-toaster/angular2-toaster';

import { DomService } from "../../shared/services/dom.service";

import { RanjivostiService } from './ranjivosti.service';
import { Ranjivost } from './ranjivost';

import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';
// import { ScrollableTableComponent } from '../../shared/components/scrollable-table/scrollable-table.component';
// import { BootstrapPanelComponent} from '../../shared/components/bootstrap.panel.component';
// import { ButtonAddComponent } from '../../shared/components/buttons/button-add.component';
// import { ButtonDeleteComponent } from '../../shared/components/buttons/button-delete.component';
// import { ButtonSaveComponent } from '../../shared/components/buttons/button-save.component';
// import { ButtonCancelComponent } from '../../shared/components/buttons/button-cancel.component';
// import { FormFieldComponent } from '../../shared/components/field.component';
// import { BootstrapFormDirective, BootstrapInputDirective } from '../../shared/components/form-bootstrap.directives';
// import { FormButtonsGroupComponentComponent } from '../../shared/components/buttons/form-buttons-group.component';
// import { PotvrdiBrisanjeModalComponent } from '../../shared/components/modal/potvrdi-brisanje-modal.component';

@Component({
    selector: '<ranjivosti></ranjivosti>',
    templateUrl: 'templates/ranjivosti',
    providers: [RanjivostiService, DomService],
    directives: [
        // PotvrdiBrisanjeModalComponent
        // REACTIVE_FORM_DIRECTIVES, ScrollableTableComponent, BootstrapPanelComponent, PotvrdiBrisanjeModalComponent,
        // ButtonAddComponent, ButtonDeleteComponent, ButtonSaveComponent, ButtonCancelComponent, 
        // FormFieldComponent, BootstrapFormDirective, BootstrapInputDirective, FormButtonsGroupComponentComponent
    ]
})

export class RanjivostiComponent extends TableFormCrudBaseComponent<Ranjivost> implements OnInit {
    title = "Ranjivosti";
    columns = [
        {
            field: 'id',
            header: 'Id',
            //width: 30,
            hidden: false
        //     alignHeader: 'left',
        //     alignData: 'center'
        },
        {
            field: 'opis',
            header: 'Opis',
            width: 80,
            hidden: false
        }
    ];

    constructor(private _service: RanjivostiService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'opis';
        this.buildForm();
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): Ranjivost{
        return new Ranjivost();
    }

    /**
     * Zbog Workaround-a dok ne obezbede resetovanje forme
     */
    buildForm() {
        // Low level API
        // this.formGroup = new FormGroup({
        //     opis: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)])// [this.formRow.opis, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(80)])]
        // });
        this.formGroup = this.formBuilder.group({
            opis: ['', Validators.required]
        });
    }
}

