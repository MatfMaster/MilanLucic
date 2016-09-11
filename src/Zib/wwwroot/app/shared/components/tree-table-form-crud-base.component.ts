/**
 * Ancestor za Table-Form-Crud komponente
 * U ngOnInit ucutava podatke 
 */
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseService } from '../services/base.service';

import * as _ from 'lodash';
import { ToasterService} from 'angular2-toaster/angular2-toaster';
import { DomService } from "../services/dom.service";

import { TreeScrollableTableComponent } from './scrollable-table/tree-scrollable-table.component';
import { PotvrdiBrisanjeModalComponent } from './modal/potvrdi-brisanje-modal.component';

@Component({
})

export abstract class TreeTableFormCrudBaseComponent<T extends ITreeModel> implements OnInit {
    @ViewChild(TreeScrollableTableComponent) treeScrollTable: TreeScrollableTableComponent;
    @ViewChild('forma') forma: ElementRef;
    @ViewChild('potvrdiBrisanjeModal') potvrdiBrisanjeModal: PotvrdiBrisanjeModalComponent;

    data: T[];

    // formRow: T = this.newT();
    gridRow: T = this.newT();

    // Vrednost ove kolone iz grida prikazujem u poruci zapotvrdu brisanja
    kolonaZaPoruku: string = '';

    // Property u json-u koji se vraca sa servrera posle azuriranja sa podatkom o azuriranom objektu
    modelData = '';

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

    constructor(modelData: string, public service: BaseService, public toasterService: ToasterService, public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
        this.modelData = modelData;
     }

    ngOnInit() {
        this.service.get()
            .subscribe(res => this.obradiResponse(res), error => this.displayServerError(error))
    }
    
    public ngAfterViewInit() {
        this.resize();
        this.changeDetectionRef.detectChanges();
    }

    
    // Za implementaciju u konkretnoj klasi, ako treba
    public postSuccessInsert(res: any){};
    public postSuccessDelete(res: any){};
    public postSuccessUpdate(res: any){};

    public  onResize(event) {
        this.resize();
    }
    private resize(){
        let korisnaVisinaEkrana = this.dom.korisnaVisnaEkrana();
        this.treeScrollTable.tableProperties.height = this.dom.tableInPanelHeight(this.treeScrollTable.tabela.nativeElement, korisnaVisinaEkrana - this.dom.PROSTOR_ISPOD_PANELA);
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
        //console.log('resetForm');
        this.buildForm();
        this.isResetting = true;
        setTimeout(() => this.isResetting = false, 0);
        return false;
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
            this.displayServerError(res.error);
        }
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.treeScrollTable.onDataChanged(data);
    }

    /**
     * Greske validacije na serveru 
     */
    displayServerValidationErrors(errors) {
//        if (!errors || !errors.errors) return;
        if (!errors) return;

//        errors.errors.forEach((error) => {    
        errors.forEach((error) => {    
            this.formGroup.controls[error.property].setErrors({ remote: error.message });
        });
    }
    /**
     * Greske na serveru koje nisu posledica validacije (SQL, 400,  500, ...) 
    */
    displayServerError(error) {
        this.serverErrorMessage = error.message;
    }

    dodaj() {
        this.inEdit = true;
        this.dodavanje = true;
        // this.formRow = this.newT();
        this.formGroup.reset();
        if (this.gridRow){
            //this.formRow.nadredjenaKategorija = this.gridRow.id;
            this.formGroup.patchValue({nadredjenaKategorija: this.gridRow.id});
        }
        this.setFocusToForm();        
    }


    // save() {
    onSubmit() {
        // if (this.formRow === null) return;
        this.serverErrorMessage = '';
        this.submitPending = true;
        this.serverValidationError = false;
        //if (this.formRow.id === undefined) {
        if (this.dodavanje) {
            // this.service.post(this.formRow)
            this.service.post(this.formGroup.value)
                .subscribe(
                    res => this.postInsert(res),
                    error => {
                        this.submitPending = false;
                        this.displayServerError(error);
                    })
        } else {
            // this.service.put(this.gridRow.id, this.formRow)
            this.service.put(this.gridRow.id, this.formGroup.value)
                .subscribe(
                    res => this.postUpdate(res), 
                    error => {
                        this.submitPending = false;
                        this.displayServerError(error);
                    })
        }
    }

    private postInsert(res) {
        this.submitPending = false;
        if (res.success) {
            this.serverValidationError = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.resetForm();
            this.treeScrollTable.addRow(res.data[this.modelData]);
            this.inEdit = false;
            this.dodavanje = false;
            this.postSuccessInsert(res);
        } else {
            this.serverValidationError = true;
            this.displayServerValidationErrors(res.errors);
        }
        // this.submitPending = false;
    }


    private postUpdate(res) {
        this.submitPending = false;
        if (res.success) {
            let node = res.data[this.modelData];
            this.serverValidationError = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.treeScrollTable.editRow(node); 
            // this.formRow = _.cloneDeep(node);
            this.resetForm();
            this.formGroup.patchValue(_.cloneDeep(node));
            this.gridRow = _.cloneDeep(node);
            this.inEdit = false;
            this.dodavanje = false;
            this.postSuccessUpdate(res);
        } else {
            this.serverValidationError = true;
            this.displayServerValidationErrors(res.errors);
        }
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
                    res => this.postDelete(res), 
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
            this.treeScrollTable.deleteRow(res.data);
            this.toasterService.pop('success', '', 'Podaci obrisani');
            this.postSuccessDelete(res.data[this.modelData]);

        } else {
            this.displayServerError(res.error);
        }
    }

    /**
     * Odustajanje od dodavanja/izmene
     */
    // private cancelEdit() {
    private cancel() {
        this.serverErrorMessage = "";
        this.resetForm();
        // this.formRow = _.cloneDeep(this.gridRow);
        this.formGroup.patchValue(this.gridRow);
        this.inEdit = false;
        this.dodavanje = false;
    }
}