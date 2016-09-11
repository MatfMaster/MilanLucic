import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'lodash';
import { ToasterService} from 'angular2-toaster/angular2-toaster';


// import { CORE_DIRECTIVES } from '@angular/common';
// import { ChangeDetectionStrategy } from '@angular/core';
// import { TAB_DIRECTIVES } from '../../shared/components/tabs/tabs';

import { BiaService } from './bia.service';
import { ProcesServisBia } from './proces-servis-bia.model';

import { PotvrdiBrisanjeModalComponent } from '../../shared/components/modal/potvrdi-brisanje-modal.component';

// import { TableFormCrudBaseComponent } from '../../shared/components/table-form-crud-base.component';
import { ScrollableTableComponent } from '../../shared/components/scrollable-table/scrollable-table.component';
// import { BootstrapPanelComponent} from '../../shared/components/bootstrap.panel.component';
// import { ButtonAddComponent } from '../../shared/components/buttons/button-add.component';
// import { ButtonDeleteComponent } from '../../shared/components/buttons/button-delete.component';
// import { ButtonSaveComponent } from '../../shared/components/buttons/button-save.component';
// import { ButtonCancelComponent } from '../../shared/components/buttons/button-cancel.component';
// import { FormFieldComponent } from '../../shared/components/field.component';
// import { BootstrapFormDirective, BootstrapInputDirective } from '../../shared/components/form-bootstrap.directives';
// import { FormButtonsGroupComponentComponent } from '../../shared/components/buttons/form-buttons-group.component';
// import { CheckboxComponent } from '../../shared/components/checkbox.component';

import { TabsetComponent } from '../../shared/components/tabs/tabset.component';

// import { DeleteService } from '../../shared/services/crud/delete.service';

import { DobavljacBia } from './dobavljac-bia.model';
import { DobavljaciBiaComponent } from './dobavljaci-bia.component';
import { LjudiBiaComponent } from './ljudi-bia.component';
import { ResursiBiaComponent } from './resursi-bia.component';

@Component({
    selector: '<bia></bia>',
    templateUrl: 'templates/bia',
    providers: [
        BiaService 
        // DeleteService
        ],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        // TAB_DIRECTIVES,
        // //CORE_DIRECTIVES,
        // REACTIVE_FORM_DIRECTIVES, ScrollableTableComponent, BootstrapPanelComponent, PotvrdiBrisanjeModalComponent,
        // ButtonAddComponent, ButtonDeleteComponent, ButtonSaveComponent, ButtonCancelComponent, 
        // FormFieldComponent, BootstrapFormDirective, BootstrapInputDirective, FormButtonsGroupComponentComponent,
        // CheckboxComponent,
        DobavljaciBiaComponent, LjudiBiaComponent, ResursiBiaComponent
        ]
})

//export class BiaComponent extends TableFormCrudBaseComponent<Ranjivost> implements OnInit {
export class BiaComponent implements OnInit, AfterViewInit {
    @ViewChild(ScrollableTableComponent) scrollTable: ScrollableTableComponent;
    @ViewChild('formaProcesServis') formaProcesServis: ElementRef;
    @ViewChild('potvrdiBrisanjeModal') potvrdiBrisanjeModal: PotvrdiBrisanjeModalComponent;
    @ViewChild(DobavljaciBiaComponent) dobavljaciBiaComponent: DobavljaciBiaComponent;
    @ViewChild(LjudiBiaComponent) ljudiBiaComponent: LjudiBiaComponent;
    @ViewChild(ResursiBiaComponent) resursiBiaComponent: ResursiBiaComponent;
    @ViewChild(TabsetComponent) tabsetComponent: TabsetComponent;

    title = "Procesi / Servisi";

    kolonaZaPorukuProcesServis = "naziv";
 
    serverErrorMessage: string = '';
    formGroupProcesServis: FormGroup;
    dataProcesServis: ProcesServisBia[] = [];

    dodavanjeProcesServis = false;
    //inEdit = false;
    isResettingProcesServis = false;
    submitPendingProcesServis = false;

    serverValidationErrorProcesServis = false;

    formRowProcesServis: ProcesServisBia = new ProcesServisBia();
    gridRowProcesServis: ProcesServisBia = new ProcesServisBia();


    columns = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 70,
            hidden: false
        },
        {
            field: 'kritican',
            header: 'Kritičan',
            width: 10,
            alignData: 'center',
            hidden: false
        },
        {
            field: 'rto',
            header: 'RTO',
            width: 10,
            alignData: 'center',
            hidden: false
        },
        {
            field: 'rpo',
            header: 'RPO',
            width: 10,
            alignData: 'center',
            hidden: false
        }

    ]

    ngAfterViewInit():any {
        //console.log('ngAfterViewInit bia');
    }

    /**
     * Dobavljaci
     */
    columnsDobavljaciBia = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv'
        },
    ];

    dobavljaci: DobavljacBia[] = [];
    ljudi: any[] = [];
    resursi: any[] = [];

    get formDirtyProcesServis() { return this.formGroupProcesServis.dirty; }
    get formValidProcesServis() { return this.formGroupProcesServis.valid; }
    get procesServis() { return this.gridRowProcesServis; }

    // constructor(private service: BiaService, private deleteService: DeleteService, private formBuilder: FormBuilder, private toasterService: ToasterService) {
    constructor(private service: BiaService, private formBuilder: FormBuilder, private toasterService: ToasterService) {
        this.buildFormProcesServis();
    }

    ngOnInit() {
        this.service.get()
            .subscribe(res => this.obradiResponse(res), error => this.displayServerError(error))
    }

    public tableProcesServisDisabled() {
        return this.dodavanjeProcesServis || this.formDirtyProcesServis;
    }

    formProcesServisDisabled(){
         return this.dataProcesServis.length < 1 && !this.dodavanjeProcesServis;
    }

    obradiResponse(res) {
        if (res.success) {
            this.podaciUcitani(res.data);
        } else {
            this.displayServerError(res.error);
        }
    }

    /**
     * Promena reda u gridu
     */
    rowChanged(row: ProcesServisBia) {
        if (!row) {
            this.formRowProcesServis = new ProcesServisBia();
            this.gridRowProcesServis = new ProcesServisBia();
        } else {
            this.formRowProcesServis = _.cloneDeep(row);
            this.gridRowProcesServis = _.cloneDeep(row);
        }
    }


    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.dataProcesServis = data.procesiServisiBia;
        this.dobavljaci = data.dobavljaci;
        this.ljudi = data.ljudi;
        this.resursi = data.resursi;

        this.scrollTable.onDataChanged(this.dataProcesServis);
        this.dobavljaciBiaComponent.onDataChanged(this.dobavljaci);
        this.ljudiBiaComponent.onDataChanged(this.ljudi);
        this.resursiBiaComponent.onDataChanged(this.resursi);
    }

    /**
     * Greske validacije na serveru 
     */
    displayServerValidationErrors(errors) {
        if (!errors) return;

        errors.forEach((error) => {    
            this.formGroupProcesServis.controls[error.property].setErrors({ remote: error.message });
        });
    }
    /**
     * Greske na serveru koje nisu posledica validacije (SQL, 400,  500, ...) 
    */
    displayServerError(error) {
        this.serverErrorMessage = error.message;
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    // newT(): Ranjivost{
    //     return new Ranjivost();
    // }

    /**
     * Zbog Workaround-a dok ne obezbede resetovanje forme
     */
    buildFormProcesServis() {
        this.formGroupProcesServis = this.formBuilder.group({
            naziv: ['', Validators.required],
            kritican: [false],
            mogucnostRucnogObavljanja: [false],
            finansijskiGubitak: [false],
            finansijskiGubitakIznos: [0],
            reputacioniGubitak: [false],
            reputacioniGubitakIznos: [0],
            zakonskaObaveza: [false],
            zakonskaObavezaIznos: [0],
            ugovornaObaveza: [false],
            ugovornaObavezaIznos: [0],
            neiskoriscenaPrilika: [false],
            neiskoriscenaPrilikaIznos: [0],
            rto: ['', Validators.required],
            rpo: ['', Validators.required],
            ciljaniNivoOporavka: ['', Validators.required] 
        });
    }

    public dodajProcesServis() {
        this.tabsetComponent.tabs[0].active = true;
        this.setFocusToFormProcesServis();
        //this.inEdit = true;
        this.dodavanjeProcesServis = true;
        this.formRowProcesServis = new ProcesServisBia();
    }

    /**
     * Postavlja fokus na prvo editabilno polje u formi
     */
    private setFocusToFormProcesServis() {
        let focusElement = this.formaProcesServis.nativeElement.getElementsByTagName("input")[0]
        if (focusElement) {
            setTimeout(() => focusElement.focus());
        }
    }

    /**
     * Workaround dok ne obezbede resetovanje forme
     */
    // private resetFormProcesServis() {
    //     this.isResettingProcesServis = true;
    //     setTimeout(() => this.isResettingProcesServis = false, 0);
    //     this.buildFormProcesServis();
    //     return false;
    // }
    private resetFormProcesServis() {
        this.buildFormProcesServis();
        this.isResettingProcesServis = true;
        setTimeout(() => this.isResettingProcesServis = false, 0);
        return false;
    }

    public saveProcesServis() {
        if (this.formRowProcesServis === null) return;
        this.serverErrorMessage = '';
        this.submitPendingProcesServis = true;
        this.serverValidationErrorProcesServis = false;
        if (this.formRowProcesServis.id === undefined) {
            this.service.post(this.formRowProcesServis)
                .subscribe(
                    res => this.postSaveProcesServis(res),
                    error => {
                        this.submitPendingProcesServis = false;
                        this.displayServerError(error);
                    })
        } else {
            this.service.put(this.gridRowProcesServis.id, this.formRowProcesServis)
                .subscribe(
                    res => this.postUpdate(res), 
                    error => {
                        this.submitPendingProcesServis = false;
                        this.displayServerError(error);
                    })
        }
    }

    private postSaveProcesServis(res) {
        if (res.success) {
            this.serverValidationErrorProcesServis = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.scrollTable.addRow(res.data);
            //this.inEdit = false;
            this.dodavanjeProcesServis = false;
            this.resetFormProcesServis();

        } else {
            this.serverValidationErrorProcesServis = true;
            this.displayServerValidationErrors(res.errors);
        }
        this.submitPendingProcesServis = false;
    }


    private postUpdate(res) {
        if (res.success) {
            this.serverValidationErrorProcesServis = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.scrollTable.editRow(res.data);
            this.formRowProcesServis = _.cloneDeep(res.data);
            this.gridRowProcesServis = _.cloneDeep(res.data);
            //this.inEdit = false;
            this.dodavanjeProcesServis = false;
            this.resetFormProcesServis();
        } else {
            this.serverValidationErrorProcesServis = true;
            this.displayServerValidationErrors(res.errors);
        }
        this.submitPendingProcesServis = false;
    }

    /**
     * Odustajanje od dodavanja/izmene
     */
    private cancelEditProcesServis() {
        this.serverErrorMessage = "";
        this.formRowProcesServis = _.cloneDeep(this.gridRowProcesServis);
        // this.inEdit = false;
        this.dodavanjeProcesServis = false;
        return this.resetFormProcesServis();
    }

    /**
     * Prvo modal za potvrdu brisanja - poziva se klikom na dugme za brisanje na formi
     */
    obrisiProcesServis() {
        if (this.gridRowProcesServis === null || this.gridRowProcesServis.id === undefined || this.gridRowProcesServis.id < 0) return;

        if (this.potvrdiBrisanjeModal) {
            this.potvrdiBrisanjeModal.open(this.kolonaZaPorukuProcesServis ? this.gridRowProcesServis[this.kolonaZaPorukuProcesServis] : '');
        } else {
            this.potvrdjenoBrisanjeProcesServis();
        }
    }
    /**
     * Potvrdjeno brisanje - brisem prvo na serveru - poziva se potvrdom na modalu
     */
    potvrdjenoBrisanjeProcesServis() {
        this.potvrdiBrisanjeModal.close();
        this.service.delete(this.gridRowProcesServis.id)
            .subscribe(
                    res => this.postDeleteProcesServis(res), 
                    error => {
                        this.submitPendingProcesServis = false;
                        this.displayServerError(error);
                    })
    }
    /**
     * Posle brisanja na serveru (koje moze da ne uspe)
     */
    private postDeleteProcesServis(res) {
        if (res.success) {
            this.scrollTable.deleteRow(res.data);
            this.toasterService.pop('success', '', 'Podaci obrisani');
        } else {
            this.displayServerError(res.error);
        }
    }


}

