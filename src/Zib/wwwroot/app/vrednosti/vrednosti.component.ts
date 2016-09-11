import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'lodash';
import { ToasterService} from 'angular2-toaster/angular2-toaster';
import { PotvrdiBrisanjeModalComponent } from '../shared/components/modal/potvrdi-brisanje-modal.component';
import { WaitingForModalComponent } from '../shared/components/modal/waiting-for-modal.component';

import { DomService } from "../shared/services/dom.service";

import { VrednostiService } from './vrednosti.service';
import { Vrednost } from './vrednost.model';

import { ScrollableTableComponent } from '../shared/components/scrollable-table/scrollable-table.component';
import { TreeScrollableTableComponent } from '../shared/components/scrollable-table/tree-scrollable-table.component';
import { BootstrapPanelComponent} from '../shared/components/bootstrap.panel.component';


@Component({
    selector: '<vrednosti></vrednosti>',
    templateUrl: 'templates/vrednosti',
    providers: [VrednostiService, DomService],
    directives: [
        WaitingForModalComponent
    ]
})
export class VrednostiComponent implements OnInit { //extends TreeTableFormCrudBaseComponent<VrstaVrednosti>{
    @ViewChild(TreeScrollableTableComponent) treeScrollTable: TreeScrollableTableComponent;
    @ViewChild(ScrollableTableComponent) vrednostiTabela: ScrollableTableComponent;
    @ViewChild('forma') forma: ElementRef;
    @ViewChild('formPanel') formPanel: BootstrapPanelComponent;
    @ViewChild('potvrdiBrisanjeModal') potvrdiBrisanjeModal: PotvrdiBrisanjeModalComponent;
    @ViewChild('waitingForModal') waitingForModal: WaitingForModalComponent;

    treeTitle = "Vrste vrednosti";
    formTitle = "Vrednosti";

    kolonaZaPoruku = "naziv";

    formVrednostiRow: Vrednost = this.newT();
    gridVrednostiRow: Vrednost = this.newT();
    treeGridRow: any;
    inEdit = false;

    vrsteVrednosti = [];
    organizacioneCeline = [];
    poslovneVrednosti = [];
    vlasniciVrednosti = [];
    vrednosti = [];

    dodavanje = false;
    formGroup: FormGroup;
    isResetting = false;
    submitPending = false;

    // Vrste vrednosti tree
    columns = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 50,
            hidden: false
        },
        {
            field: 'opis',
            header: 'Opis',
            width: 50,
            hidden: false
        }
    ];

    // Vrednosti tabela
    vrednostiColumns = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 40,
            hidden: false
        },
        {
            field: 'opis',
            header: 'Opis',
            width: 50,
            hidden: false
        },
        {
            field: 'kriticna',
            header: 'Kritična',
            width: 10,
            alignData: 'center'
        }
    ];

    serverErrorMessage: string = '';
    serverValidationError: boolean = false;

    get formDirty() { return this.formGroup.dirty; }
    get formValid() { return this.formGroup.valid; }


    constructor(
        private service: VrednostiService, 
        private formBuilder: FormBuilder, 
        private toasterService: ToasterService, 
        public dom: DomService,
        public changeDetectionRef: ChangeDetectorRef
        ) 
    {
        this.buildForm();
    }

    public  onResize(event) {
        this.resize();
    }

    private resize(){
        let korisnaVisinaEkrana = this.dom.korisnaVisnaEkrana();

        let formPanelHeight = this.dom.formInPanelHeight(this.forma.nativeElement);
        let visinaPanela = (korisnaVisinaEkrana - formPanelHeight - this.dom.PROSTOR_IZMEDJU_REDOVA) - (this.dom.PROSTOR_ISPOD_PANELA);
        this.vrednostiTabela.setHeight(visinaPanela);

        this.treeScrollTable.tableProperties.height = this.dom.tableInPanelHeight(this.treeScrollTable.tabela.nativeElement, korisnaVisinaEkrana - this.dom.PROSTOR_ISPOD_PANELA);
    }

    public ngAfterViewInit() {
        this.resize();
        this.changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.service.get()
            .subscribe(res => this.obradiResponse(res), error => this.displayServerError(error))
    }

    obradiResponse(res) {
        if (res.success) {
            this.podaciUcitani(res.data);
        } else {
            this.displayServerError(res.error);
        }
    }

    /**
     * Greske na serveru koje nisu posledica validacije (SQL, 400,  500, ...) 
    */
    displayServerError(error) {
        //this.serverErrorMessage = error.message;
        alert(error);
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
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.vlasniciVrednosti = data.vlasniciVrednosti;
        this.organizacioneCeline = data.organizacioneCeline;
        this.poslovneVrednosti = data.poslovneVrednosti;
        this.vrsteVrednosti = data.vrsteVrednosti;

        this.treeScrollTable.onDataChanged(data.vrsteVrednostiHijerarhija);
    }

    postSuccessInsert(res) {
        //    this.nadredjeniSelect = res.data.vrstaVrednostiForSelect;
    }

    postSuccessUpdate(res) {
        //    this.nadredjeniSelect = res.data.vrstaVrednostiForSelect;
    }

    /**
     * Kreira objekat konkretnog tipa za <T> u TableFormCrudBaseComponent
     */
    newT(): Vrednost {
        return new Vrednost();
    }


    public tableDisabled(): boolean {
        return this.inEdit || this.formGroup.dirty;
    }

    /**
      * Promena reda u tree gridu
      */
    private rowChanged(row) {

        if (!row) return;

        this.treeGridRow = row;
        this.service.vrednostiZaVrstuVrednosti(row.id)
            .subscribe(res => this.ucitaneVrsteVrednosti(res), error => this.displayServerError(error));
    }

    /**
      * Promena reda u gridu vrednosti
      */
    private rowVrednostiChanged(row) {
        if (!row) {
            this.formVrednostiRow = this.newT();
            this.gridVrednostiRow = this.newT();
        } else {
            this.formVrednostiRow = _.cloneDeep(row);
            this.gridVrednostiRow = _.cloneDeep(row);
        }
    }


    /**
     * Ucitane vrednosti za vrstu vrednosti
     */
    private ucitaneVrsteVrednosti(res) {
        this.vrednosti = res.data.vrednosti;
        this.vrednostiTabela.onDataChanged(this.vrednosti);
    }

    private dodaj() {
        this.setFocusToForm();
        this.inEdit = true;
        this.dodavanje = true;
        this.formVrednostiRow = this.newT();
        this.formVrednostiRow.vrstaVrednostiId = this.treeGridRow.id;
    }


    /**
     * Prvo modal za potvrdu brisanja
     */
    obrisi() {
        if (this.gridVrednostiRow === null || this.gridVrednostiRow.id === undefined || this.gridVrednostiRow.id < 0) return;

        if (this.potvrdiBrisanjeModal) {
            this.potvrdiBrisanjeModal.open(this.kolonaZaPoruku ? this.gridVrednostiRow[this.kolonaZaPoruku] : '');
        } else {
            this.potvrdjenoBrisanje();
        }
    }

    /**
     * Potvrdjeno brisanje - brisem prvo na serveru
     */
    potvrdjenoBrisanje() {
        this.potvrdiBrisanjeModal.close();
        if (this.waitingForModal) {
            this.waitingForModal.open('');
        }

        this.service.delete(this.gridVrednostiRow.id)
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
        if (this.waitingForModal) {
            this.waitingForModal.close('');
        }
        if (res.success) {
            this.vrednostiTabela.deleteRow(res.data);
            this.toasterService.pop('success', '', 'Podaci obrisani');
        } else {
            this.displayServerError(res.error);
        }
    }

    /**
     * FORMA Vrednosti
     */
    buildForm() {
        this.formGroup = this.formBuilder.group({
            naziv: ['', Validators.required],
            opis: [],
            vrstaVrednostiId: ['', Validators.required],
            vlasnikVrednostiId: [],
            poslovnaVrednostId: [],
            organizacionaCelinaId: []
        });

    }

    /**
     * Disejbluje formu ako nema ucitane vrednosti u gridu ili nije u modu dodavanja
     */
    formDisabled() {
        return this.vrednosti.length < 1 && !this.dodavanje;
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

    /**
     * Workaround dok ne obezbede resetovanje forme
     */
    resetForm() {
        this.buildForm();
        this.isResetting = true;
        setTimeout(() => this.isResetting = false, 0);
        return false;
    }

    /**
     * Odustajanje od dodavanja/izmene
     */
    private cancelEdit() {
        this.serverErrorMessage = "";
        this.formVrednostiRow = _.cloneDeep(this.gridVrednostiRow);
        this.inEdit = false;
        this.dodavanje = false;
        return this.resetForm();
    }


    /**
     * Snimi formu 
     */
    save() {
        if (this.formVrednostiRow === null) return;

        if (this.waitingForModal) {
            this.waitingForModal.open('');
        }

        this.serverErrorMessage = '';
        this.submitPending = true;
        this.serverValidationError = false;
        if (this.formVrednostiRow.id === undefined) {
            this.service.post(this.formVrednostiRow)
                .subscribe(
                res => {
                    this.postSave(res)
                },
                error => {
                    if (this.waitingForModal) {
                        this.waitingForModal.close();
                    }

                    this.submitPending = false;
                    this.displayServerError(error);
                })
        } else {
            this.service.put(this.treeGridRow.id, this.formVrednostiRow)
                .subscribe(
                res => this.postUpdate(res),
                error => {
                    this.submitPending = false;
                    this.displayServerError(error);
                })
        }
    }

    private postSave(res) {
        if (this.waitingForModal) {
            this.waitingForModal.close();
        }

        if (res.success) {
            this.serverValidationError = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.vrednostiTabela.addRow(res.data);
            this.inEdit = false;
            this.dodavanje = false;
            this.resetForm();

        } else {
            this.serverValidationError = true;
            this.displayServerValidationErrors(res.errors);
        }
        this.submitPending = false;
    }


    private postUpdate(res) {
        if (this.waitingForModal) {
            this.waitingForModal.close();
        }

        if (res.success) {
            this.serverValidationError = false;
            this.toasterService.pop('success', '', 'Podaci snimljeni');
            this.vrednostiTabela.editRow(res.data);
            this.formVrednostiRow = _.cloneDeep(res.data);
            this.gridVrednostiRow = _.cloneDeep(res.data);
            this.inEdit = false;
            this.dodavanje = false;
            this.resetForm();
        } else {
            this.serverValidationError = true;
            this.displayServerValidationErrors(res.errors);
        }
        this.submitPending = false;
    }

}

