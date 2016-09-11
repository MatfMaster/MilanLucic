import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';

import * as _ from 'lodash';
import { ToasterService} from 'angular2-toaster/angular2-toaster';

import { DomService, TableProperties } from "../shared/services/dom.service";
import { PretnjeRanjivostiService } from './pretnje-ranjivosti.service';
import { RanjivostiCheckComponent } from './ranjivosti-check.component';

// import { PotvrdiBrisanjeModalComponent } from '../shared/components/modal/potvrdi-brisanje-modal.component';

import { ScrollableTableComponent } from '../shared/components/scrollable-table/scrollable-table.component';
import { BootstrapPanelComponent} from '../shared/components/bootstrap.panel.component';
import { CheckScrollTableComponent} from '../shared/components/check-scroll-table/check-scroll-table.component';
import { PotvrdiBrisanjeModalComponent } from '../shared/components/modal/potvrdi-brisanje-modal.component';

@Component({
    selector: 'pretnje-ranjivosti',
    templateUrl: 'templates/pretnjeranjivosti',
    providers: [PretnjeRanjivostiService, DomService],
    directives: [
        ScrollableTableComponent, BootstrapPanelComponent, CheckScrollTableComponent, PotvrdiBrisanjeModalComponent
    ]
})

export class PretnjeRanjivostiComponent {

    @ViewChild('pretnje') pretnje: ScrollableTableComponent;
    @ViewChild('ranjivosti') ranjivosti: CheckScrollTableComponent;
    @ViewChild('defaultneMere') mere: CheckScrollTableComponent;

    @ViewChild('potvrdiBrisanjeModalRanjivost') potvrdiBrisanjeModalRanjivost: PotvrdiBrisanjeModalComponent;
    @ViewChild('potvrdiBrisanjeModalPrimenjeneMere') potvrdiBrisanjeModalPrimenjeneMere: PotvrdiBrisanjeModalComponent;

    // @Input() changedPropertyName: any;
    // @ViewChild('pretnje') pretnje: ScrollableTableComponent;
    // @ViewChild('pretnje') pretnjePanel: ElementRef;
    // @ViewChild('pretnje') pretnjeNativeElement: ElementRef;
    // @ViewChild('ranjivosti') ranjivosti: CheckScrollTableComponent;
    // @ViewChild('ranjivostiPanel') ranjivostiPanel: ElementRef;

    title = "Pretnje / Ranjivosti";

    ranjivostiAktivanRed: any = {};
    primenjeneMereAktivanRed: any = {};

    serverErrorMessage: string = '';

    serverValidationErrorProcesServis = false;

    pretnjeData: any[] = [];
    ranjivostiData: any[] = [];
    mereData: any[] = [];

    ucesniciRanjivosti: any[] = [];
    ucesniciDefaultMere: any[] = [];

    gridRowPretnja: any;

    // get getPretnja() { return this.gridRowPretnja; } 

    pretnjeColumns = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'vrstaPretnje.opis',
            header: 'Vrsta',
            width: 40,
            alignData: 'left'
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 60
        }
    ]

    ranjivostiColumns = [
        {
            field: 'checked',
            header: 'Ucestvuje',
            width: 10
        },
        {
            field: 'opis',
            header: 'Opis'
        }
    ]

    mereColumns = [
        {
            field: 'checked',
            header: 'Primenjena',
            width: 10
        },
        {
            field: 'oznaka',
            header: 'Oznaka',
            width: 20
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 70
        }
    ]

    constructor(
        private service: PretnjeRanjivostiService, 
        private toasterService: ToasterService, 
        public changeDetectionRef: ChangeDetectorRef,
        public dom: DomService
        ) 
    {}

    public  onResize(event) {
        this.resize();
    }

    private resize(){
        let korisnaVisinaEkrana = this.dom.korisnaVisnaEkrana();

        // Visina panela za Ranjivosti i Mere
        //((korisnaVisinaEkrana - 20) / 2) - 10; // 20 je row-separator, 10 je plovina od donje ivice (20)
        let visinaPanela = ((korisnaVisinaEkrana - this.dom.PROSTOR_IZMEDJU_REDOVA) / 2) - (this.dom.PROSTOR_ISPOD_PANELA / 2); 
        this.ranjivosti.setHeight(visinaPanela);
        this.mere.setHeight(visinaPanela);

        // this.pretnje.tableProperties.height = this.dom.panelWithTableHeight(this.pretnje.tabela.nativeElement, korisnaVisinaEkrana);
        this.pretnje.tableProperties.height = this.dom.tableInPanelHeight(this.pretnje.tabela.nativeElement, korisnaVisinaEkrana - this.dom.PROSTOR_ISPOD_PANELA);
    }


    ngOnInit() {
        this.service.get()
            .subscribe(res => this.obradiResponse(res), error => this.displayServerError(error))
    }

    public ngAfterViewInit() {
        this.resize();
        this.changeDetectionRef.detectChanges();
    }

    obradiResponse(res) {
        if (res.success) {
            this.podaciUcitani(res.data);
        } else {
            this.displayServerError(res.error);
        }
    }

    /**
     * Promena reda u gridu pretnji]
     */
    rowChangedPretnje(row) {
        this.gridRowPretnja = _.cloneDeep(row);
        // Ucitaj pretnje-ranjivosti za vrstu vrednosti
        this.service.ranjivostiZaPretnju(row.id).
            subscribe(res => this.ucitaneRaznjivostiZaPretnju(res), error => this.displayServerError(error));
    }
    ucitaneRaznjivostiZaPretnju(res) {
        this.ucesniciRanjivosti = res.data;
        this.ranjivosti.parentRowChanged(this.gridRowPretnja, res.data);
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.pretnjeData = data.pretnje;
        this.ranjivostiData = data.ranjivosti;
        this.mereData = data.mere;

        this.pretnje.onDataChanged(this.pretnjeData);
        this.ranjivosti.onDataChanged(this.ranjivostiData);
        this.mere.onDataChanged(this.mereData);
    }

    /**
     * Greske na serveru koje nisu posledica validacije (SQL, 400,  500, ...) 
    */
    displayServerError(error) {
        this.serverErrorMessage = error.message;
    }

    // // Azuriram ucesnike na osnovu promene u RanjivostiCheckComponenet
    // ucesniciChanged(event){
    //     for(let i = 0; i < this.pretnjeData.length; i++){
    //         if (this.pretnjeData[i].id === this.gridRowPretnja.id){
    //             this.pretnjeData[i].pretnjeRanjivosti = event.ucesnici;
    //             this.pretnje.onDataChanged(this.pretnjeData);
    //             break;
    //         } 
    //     }
    // }

    /**
     * Cekiranje/Decekiranje ranjivosti
     */
    toggleRanjivost(event) {
        let ranjivost = event.row;
        this.ranjivostiAktivanRed = ranjivost;

        if (ranjivost.checked) {
            if (this.potvrdiBrisanjeModalRanjivost) {
                this.potvrdiBrisanjeModalRanjivost.open(this.ranjivosti.getSelectedRow().opis);
            } else {
                this.potvrdjenoBrisanjeRanjivosti();
            }
        } else {
            // Dodavanje rajnivosti
            let postData = {
                pretnjaId: this.pretnje.getSelectedRow().id,
                ranjivostId: ranjivost.id
            };
            this.service.dodajRanjivostPretnji(postData).subscribe(
                res => {
                    if (res.success) {
                        this.toasterService.pop('success', '', 'Podaci snimljeni');
                        this.ranjivosti.ucesniciChanged(this.gridRowPretnja, res.data);
                    } else {
                        this.toasterService.pop('error', '', res.errors);
                        this.ranjivosti.undoCheck(ranjivost.id);
                    }
                },
                error => {
                    this.toasterService.pop('error', '', error);
                    this.ranjivosti.undoCheck(ranjivost.id);
                }
            )


        }
    }

    public odustaniOdBrisanjaRanjivosti() {
        this.ranjivosti.check(this.ranjivostiAktivanRed.id);
    }

    private potvrdjenoBrisanjeRanjivosti() {        
        let ranjivost = this.ranjivostiAktivanRed;
        this.potvrdiBrisanjeModalRanjivost.close();
        let postData = {
            pretnjaId: this.pretnje.getSelectedRow().id,
            ranjivostId: this.ranjivosti.getSelectedRow().id
        };

        this.service.obrisiRanjivost(postData).subscribe(
            res => {
                if (res.success) {
                    this.toasterService.pop('success', '', 'Podaci snimljeni');
                    this.ranjivosti.ucesniciChanged(this.gridRowPretnja, res.data);
                } else {
                    this.toasterService.pop('error', '', res.errors);
                    this.ranjivosti.check(ranjivost.id);
                }
            },
            error => {
                this.toasterService.pop('error', '', error);
                this.ranjivosti.check(ranjivost.id);
            }
        )
    }

    public ranjivostRowChanged(row) {        
        let id = this.pretnjeRanjivostiSelectedRowId();
        // Ako nema nista u PretnjamRanjivostima resetujem DefaultMere
        if (!id) {
            this.mere.parentRowChanged(this.ranjivosti.getSelectedRow(), []);
        } else {
            this.service.defaultMereZaPretnjuRanjivost(id).
                subscribe(res => this.ucitaneDefaultMereZaPretnjuRaznjivost(res), error => this.displayServerError(error));
        }
    }

    private ucitaneDefaultMereZaPretnjuRaznjivost(res){
        this.mere.parentRowChanged(this.ranjivosti.getSelectedRow(), res.data);
    }

    private pretnjeRanjivostiSelectedRowId() {
        let ranjivost = this.ranjivosti.getSelectedRow();
        let pretnjaRanjivost = _.find(this.ucesniciRanjivosti, pr => { return pr.ranjivostId === ranjivost.id }); // ranjivostId je prenet preko this.ucesniciId
        return (pretnjaRanjivost && pretnjaRanjivost.pretnjaRanjivostId) ? pretnjaRanjivost.pretnjaRanjivostId : null;
    }


    /**
     * MERE
     */
    toggleMere(event) {
        let row = event.row;
        this.primenjeneMereAktivanRed = row;

        if (row.checked) {
            if (this.potvrdiBrisanjeModalPrimenjeneMere) {
                this.potvrdiBrisanjeModalPrimenjeneMere.open(row.naziv);
            } else {
                this.potvrdjenoTogglePrimenjeneMere();
            }
        } else {
            this.potvrdjenoTogglePrimenjeneMere();
        }
    }

    potvrdjenoTogglePrimenjeneMere() {
        let mera = this.primenjeneMereAktivanRed;
        let pretnjaRanjivostId = this.pretnjeRanjivostiSelectedRowId();

        this.potvrdiBrisanjeModalPrimenjeneMere.close();

        let postData = {
            pretnjaRanjivostId: pretnjaRanjivostId,
            meraId: mera.id
        };

        this.service.togglePrimenjeneMere(postData).subscribe(
            res => {
                if (res.success) {
                    this.toasterService.pop('success', '', 'Podaci snimljeni');
                    this.mere.ucesniciChanged(this.ranjivosti.getSelectedRow(), res.data);
                } else {
                    this.toasterService.pop('error', '', res.errorMessage);
                    this.mere.undoCheck(mera.id);
                }
            },
            error => {
                this.toasterService.pop('error', '', error.errorMessage);
                this.mere.undoCheck(mera.id);
            }
        )

    }

    odustaniOdBrisanjaPrimenjeneMere() {
        this.mere.undoCheck(this.primenjeneMereAktivanRed.id);
    }

}

