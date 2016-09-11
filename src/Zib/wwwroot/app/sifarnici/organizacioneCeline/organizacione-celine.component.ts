import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToasterService} from 'angular2-toaster/angular2-toaster';
// import { PotvrdiBrisanjeModalComponent } from '../../shared/components/modal/potvrdi-brisanje-modal.component';

import { DomService } from "../../shared/services/dom.service";
// import {SELECT_DIRECTIVES} from '../../shared/components/select/select';

import { OrganizacioneCelineService } from './organizacione-celine.service';
import { OrganizacionaCelina } from './organizaciona-celina.model';

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
    selector: 'organizacine-celine',
    templateUrl: 'templates/organizacioneceline',    
    providers: [OrganizacioneCelineService, DomService],
    directives: [
        // REACTIVE_FORM_DIRECTIVES,
        // SELECT_DIRECTIVES, 
        // ScrollableTableComponent, BootstrapPanelComponent, ButtonAddComponent, ServerErrorComponent, 
        // ButtonDeleteComponent, ButtonSaveComponent, ButtonCancelComponent, PotvrdiBrisanjeModalComponent, SelectFieldComponent,        
        // FormFieldComponent, BootstrapFormDirective, BootstrapInputDirective, FormButtonsGroupComponentComponent, CheckboxComponent
        ]
})
export class OrganizacioneCelineComponent extends TableFormCrudBaseComponent<OrganizacionaCelina>{
    title = "Organizacione jedinice";

    organizacioneCeline = [];
    

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
            width: 100,
            hidden: false
        }
    ]

    constructor(private _service: OrganizacioneCelineService, private formBuilder: FormBuilder, private _toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        super(_service, _toasterService, dom, changeDetectionRef);
        this.kolonaZaPoruku = 'naziv';
        this.buildForm();
    }


    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.organizacioneCeline = data;
        this.scrollTable.onDataChanged(this.organizacioneCeline);
        //this.formRow.test = [1,3]; Multiselect
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): OrganizacionaCelina {
        return new OrganizacionaCelina();
    }
   
    buildForm() {

        this.formGroup = this.formBuilder.group({
            naziv: ['', Validators.required]        });
    }

}
