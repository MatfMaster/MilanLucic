/**
 * Ancestor za Table-Form-Crud komponente
 * U ngOnInit ucutava podatke 
 */
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseService } from '../services/base.service';
import { DomService } from "../services/dom.service";

import * as _ from 'lodash';
import { ToasterService} from 'angular2-toaster/angular2-toaster';

import { ScrollableTableComponent } from './scrollable-table/scrollable-table.component';
import { PotvrdiBrisanjeModalComponent } from './modal/potvrdi-brisanje-modal.component';

@Component({
})

export abstract class TableFormCrudBaseComponent<T extends IModel> implements OnInit {
    @ViewChild(ScrollableTableComponent) scrollTable: ScrollableTableComponent;
    @ViewChild('forma') forma: ElementRef;
    @ViewChild('potvrdiBrisanjeModal') potvrdiBrisanjeModal: PotvrdiBrisanjeModalComponent;

    data: T[] = [];

    // formRow: T = this.newT();
    gridRow: T = this.newT();

    // Vrednost ove kolone iz grida prikazujem u poruci zapotvrdu brisanja
    kolonaZaPoruku: string = '';

    formGroup: FormGroup;
    inEdit = false;
    dodavanje = false;
    isResetting = false;
    submitPending = false;
    serverErrorMessage: string = '';
    serverValidationError: boolean = false;

    get formDirty() { return this.formGroup.dirty; }
    get formValid() { return this.formGroup.valid; }

    abstract newT(): T;
    abstract buildForm();

    constructor(public service: BaseService, public toasterService: ToasterService, public dom: DomService,
        public changeDetectionRef: ChangeDetectorRef)
    { }

    public onResize(event) {
        this.resize();
    }
    private resize() {
        let korisnaVisinaEkrana = this.dom.korisnaVisnaEkrana();
        this.scrollTable.tableProperties.height = this.dom.tableInPanelHeight(this.scrollTable.tabela.nativeElement, korisnaVisinaEkrana - this.dom.PROSTOR_ISPOD_PANELA);
    }

    public ngAfterViewInit() {
        this.resize();
        this.changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.service.get()
            .subscribe(res => this.obradiResponse(res), error => this.displayServerError(error))
    }


    /**
     * Disejbluje formu ako nema ucitane vrednosti u gridu ili nije u modu dodavanja
     */
    formDisabled() {
        return this.data.length < 1 && !this.dodavanje;
    }

    /**
      * Promena reda u gridu
      */
    rowChanged(row: T) {
        if (!row) {
            // this.formRow = this.newT();
            this.gridRow = this.newT();
        } else {
            // this.formRow = _.cloneDeep(row);
            this.gridRow = _.cloneDeep(row);
        }
        this.formGroup.patchValue(this.gridRow);
    }

    /**
     * Disebluje tabelu kod editovanja 
     */
    tableDisabled(): boolean {
        return this.inEdit || this.formGroup.dirty;
    }

    /**
     * Workaround dok ne obezbede resetovanje forme
     */
    resetForm() {
        this.formGroup.reset();
        this.formGroup.patchValue(this.gridRow);
        // this.formGroup.setValue(this.gridRow); // forma mora da ima kontrole za sve propertije objekta na koji se iniciajalizuje

        // this.buildForm();
        // this.isResetting = true;
        // setTimeout(() => this.isResetting = false, 0);
        // return false;
    }

    /**
     * Postavlja fokus na prvo editabilno polje u formi
     */
    setFocusToForm() {
        let focusElement = this.forma.nativeElement.getElementsByTagName("input")[0]
        if (focusElement) {
            setTimeout(() => focusElement.focus());
        }
    }

    obradiResponse(res) {
        if (res.success) {
            this.podaciUcitani(res.data);
        } else {
            let message = "Greška na serveru";
            if (res.error) {
                message = res.error;
            } else if (res.errorMessage) {
                message = res.errorMessage;
            }
            this.displayServerError(message);
        }
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.data = data;
        this.scrollTable.onDataChanged(this.data);
    }

    /**
     * Greske validacije na serveru 
     */
    displayServerValidationErrors(response) {
        if (!response) return;

        if (response.errorMessage) {
            this.serverErrorMessage = response.errorMessage;
            return;
        }

        if (response.errors) {
            response.errors.forEach((error) => {
                this.formGroup.controls[error.property].setErrors({ remote: error.message });
            });
            return;
        }
    }
    /**
     * Greske na serveru koje nisu posledica validacije (SQL, 400,  500, ...) 
    */
    displayServerError(error) {
        this.serverErrorMessage = error;//error.message;
    }

    dodaj() {
        this.setFocusToForm();
        this.inEdit = true;
        this.dodavanje = true;
        this.formGroup.reset();
        // this.formRow = this.newT();
    }


    //    save() {
    onSubmit() {
        //debugger;
        // if (this.formRow === null) return;
        this.serverErrorMessage = '';
        this.submitPending = true;
        this.serverValidationError = false;
        // if (this.formRow.id === undefined) {
        if (this.dodavanje) {
            // this.service.post(this.formRow)
            this.service.post(this.formGroup.value)
                .subscribe(
                res => this.postSave(res),
                error => {
                    this.submitPending = false;
                    this.displayServerError(error);
                })
        } else {
            // this.service.put(this.formRow)
            this.service.put(this.gridRow.id, this.formGroup.value)
                .subscribe(
                res => this.postUpdate(res),
                error => {
                    this.submitPending = false;
                    this.displayServerError(error);
                })
        }
    }

    private postSave(res) {
        if (res.success) {
            this.serverValidationError = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.scrollTable.addRow(res.data);
            this.inEdit = false;
            this.dodavanje = false;
            this.resetForm();

        } else {
            this.serverValidationError = true;
            this.displayServerValidationErrors(res);
            // this.displayServerValidationErrors(res.errors);
        }
        this.submitPending = false;
    }


    private postUpdate(res) {
        if (res.success) {
            this.serverValidationError = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.scrollTable.editRow(res.data);
            // this.formRow = _.cloneDeep(res.data);
            this.resetForm();
            this.formGroup.patchValue(res.data);
            this.gridRow = _.cloneDeep(res.data);
            this.inEdit = false;
            this.dodavanje = false;
        } else {
            this.serverValidationError = true;
            this.displayServerValidationErrors(res.errors);
        }
        this.submitPending = false;
    }

    /**
     * Prvo modal za potvrdu brisanja
     */
    obrisi() {
        if (this.gridRow === null || this.gridRow.id === undefined || this.gridRow.id < 0) return;

        if (this.potvrdiBrisanjeModal) {
            this.potvrdiBrisanjeModal.open(this.kolonaZaPoruku ? this.gridRow[this.kolonaZaPoruku] : '');
        } else {
            this.potvrdjenoBrisanje();
        }

        // this.service.delete(this.gridRow.id)
        //     .subscribe(res => this.podaciObrisani(res), this.displayErrors)
    }
    /**
     * Potvrdjeno brisanje - brisem prvo na serveru
     */
    potvrdjenoBrisanje() {
        this.potvrdiBrisanjeModal.close();
        this.service.delete(this.gridRow.id)
            .subscribe(
            res => {
                this.postDelete(res)
            },
            error => {
                this.submitPending = false;
                this.displayServerError(error);
            })
    }
    /**
     * Posle brisanja na serveru (koje moze da ne uspe)
     */
    private postDelete(res) {

        if (res.success) {
            this.scrollTable.deleteRow(res.data);
            this.toasterService.pop('success', '', 'Podaci obrisani');
        } else {
            // TODO: Ovo treba srediti da bude konzistentno
            let errorMsg = 'Greška na serveru';
            if (res.error) errorMsg = res.error;
            if (res.errorMessage) errorMsg = res.errorMessage;
            this.displayServerError(errorMsg);
        }
    }

    /**
     * Odustajanje od dodavanja/izmene
     */
    private cancel() {
        this.serverErrorMessage = "";
        // this.formRow = _.cloneDeep(this.gridRow);
        this.formGroup.patchValue(this.gridRow);
        this.inEdit = false;
        this.dodavanje = false;
        return this.resetForm();
    }

}