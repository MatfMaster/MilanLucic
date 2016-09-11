import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import * as _ from 'lodash';

import { GlobalService } from '../global.service';
import {DomService, TableProperties} from "../shared/services/dom.service";

import { ProcenaRizikaVrsteVrednostiService } from './procena-rizika-vrste-vrednosti.service';
import { ProcenaRizikaModalComponent } from './procena-rizika-modal.component';

import { CheckScrollTablePretnjeRanjivostiComponent } from './check-scroll-table-pretnje-ranjivosti.component'; 

import { TreeScrollableTableComponent } from "../shared/components/scrollable-table/tree-scrollable-table.component";
import { BootstrapPanelComponent } from "../shared/components/bootstrap.panel.component";

import { CheckScrollTableComponent } from "../shared/components/check-scroll-table/check-scroll-table.component";

import { ToasterService } from "angular2-toaster/angular2-toaster";
import { PotvrdiBrisanjeModalComponent } from '../shared/components/modal/potvrdi-brisanje-modal.component';

@Component({
    //    selector: '<procena-rizika-vrste-vrednosti></procena-rizika-vrste-vrednosti>',
    selector: 'procena-rizika-vrste-vrednosti',
    templateUrl: 'templates/ProcenaRizikaVrsteVrednosti',
    providers: [ProcenaRizikaVrsteVrednostiService, DomService],
    directives: [
        TreeScrollableTableComponent,
        BootstrapPanelComponent,
        CheckScrollTableComponent,
        PotvrdiBrisanjeModalComponent,
        ProcenaRizikaModalComponent,
        CheckScrollTablePretnjeRanjivostiComponent
    ]
})
export class ProcenaRizikaVrsteVrednostiComponent implements OnInit {
    @ViewChild('treeScrollableTable') treeScrollTableHtmlEl: ElementRef;
    @ViewChild(TreeScrollableTableComponent) treeScrollTable: TreeScrollableTableComponent;
    @ViewChild('pretnjeRanjivosti') pretnjeRanjivosti: CheckScrollTableComponent;
    @ViewChild('mere') primenjeneMere: CheckScrollTableComponent;

    @ViewChild('potvrdiBrisanjeModalPretnjaRanjivost') potvrdiBrisanjeModalPretnjaRanjivost: PotvrdiBrisanjeModalComponent;
    @ViewChild('potvrdiBrisanjeModalPrimenjeneMere') potvrdiBrisanjeModalPrimenjeneMere: PotvrdiBrisanjeModalComponent;
    @ViewChild('procenaRizikaModal') procenaRizikaModal: ProcenaRizikaModalComponent;

    title = "Vrste vrednosti";

    gridRowVrsteVrednosti: any;

    pretnjeRanjivostiHeight = 60;

    serverErrorMessage: string = '';

    // Aktivan red pretnjiRanjivosti/primenjeneMere sa kojim radim
    // Ne mogu da ga setam kroz modal pa ga ovako cuvam za potvrdu ili odustanjanje od brisanja
    pretnjeRanjivostiAktivanRed: any = {};
    primenjeneMereAktivanRed: any = {};

    pretnjeRanjivostiData: any[];
    vrsteVrednostiHijerarhijaData: any[];
    mereData: any[];
    ucesniciVrsteVrednostiPretnjeRanjivosti: any[] = [];
    ucesniciVrsteVrednostiPretnjeRanjivostiPrimenjeneMere: any[] = [];
    intenzitetPretnji: any[];
    intenzitetRanjivosti: any[];

    izmenaProceneRizika = false;

    get getVrstaVrednosti() { return this.gridRowVrsteVrednosti; }

    columns = [
        {
            field: 'id',
            header: 'Id',
            hidden: true
        },
        {
            field: 'naziv',
            header: 'Naziv',
            width: 45,
            hidden: false
        },
        {
            field: 'opis',
            header: 'Opis',
            width: 45,
            hidden: false
        },
        {
            field: 'poslovnaVrednost.vrednost',
            header: 'Vrednost',
            //width: 13,
            alignData: 'center',
            hidden: false
        }
    ];

    // pretnjeRanjivostiColumns = [
    //     {
    //         field: 'checked',
    //         header: 'Ucestvuje',
    //         width: 10
    //     },
    //     {
    //         field: 'pretnjaRanjivost',
    //         header: 'Pretnja / Ranjivost'
    //     },
    //     {
    //         field: 'pretnjaPre.vrednost',
    //         header: 'Pretnja pre',
    //         width: 10,
    //         alignData: 'center'
    //     },
    //     {
    //         field: 'ranjivostPre.vrednost',
    //         header: 'Ranjivost pre',
    //         width: 10,
    //         alignData: 'center'
    //     },
    //     {
    //         field: 'rizikPre',
    //         header: 'Rizik pre',
    //         width: 10,
    //         alignData: 'center'
    //     },
    //     {
    //         field: 'pretnjaPosle.vrednost',
    //         header: 'Pretnja posle',
    //         width: 10,
    //         alignData: 'center'
    //     },
    //     {
    //         field: 'ranjivostPosle.vrednost',
    //         header: 'Ranjivost posle',
    //         width: 10,
    //         alignData: 'center'
    //     },
    //     {
    //         field: 'rizikPosle',
    //         header: 'Rizik posle',
    //         width: 10,
    //         alignData: 'center'
    //     }


    // ]

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
        public service: ProcenaRizikaVrsteVrednostiService, 
        public toasterService: ToasterService, 
        public globalService: GlobalService, 
        public dom: DomService,
        public changeDetectionRef: ChangeDetectorRef
        ) { }

    public  onResize(event) {
        this.resize();
    }

    private resize(){
        let korisnaVisinaEkrana = this.dom.korisnaVisnaEkrana();

        // // Visina panela za PretnjeRanjivosti i Mere
        // let visinaPanela = ((korisnaVisinaEkrana - 20) / 2) - 10; // 20 je row-separator, 10 je plovina od donje ivice (20)
        // this.pretnjeRanjivosti.setHeight(visinaPanela);
        // this.primenjeneMere.setHeight(visinaPanela);

        // // Visina vrstaVrednosti
        // let panel = this.dom.findAncestorWithClassName(this.treeScrollTable.tabela.nativeElement, 'panel');
        // let panelHeading = panel.getElementsByClassName('panel-heading')[0];
        // let panelHeadingHeight = this.dom.getAbsoluteHeight(panelHeading);
        // let tableHeader = panel.getElementsByClassName('css-thead')[0];
        // let tableHeaderHeight = this.dom.getAbsoluteHeight(tableHeader);

        // this.treeScrollTable.tableProperties.height = korisnaVisinaEkrana - panelHeadingHeight - tableHeaderHeight - 20;
        let visinaPanela = ((korisnaVisinaEkrana - this.dom.PROSTOR_IZMEDJU_REDOVA) / 2) - (this.dom.PROSTOR_ISPOD_PANELA / 2); 
        this.pretnjeRanjivosti.setHeight(visinaPanela);
        this.primenjeneMere.setHeight(visinaPanela);

        //this.treeScrollTable.tableProperties.height = this.dom.panelWithTableHeight(this.treeScrollTable.tabela.nativeElement, korisnaVisinaEkrana);
        this.treeScrollTable.tableProperties.height = this.dom.tableInPanelHeight(this.treeScrollTable.tabela.nativeElement, korisnaVisinaEkrana - this.dom.PROSTOR_ISPOD_PANELA);
    }

    ngOnInit() {
        this.service.get()
            .subscribe(res => this.obradiResponse(res), error => this.displayServerError(error));
    }

    public ngAfterViewInit() {
        //this.pretnjeRanjivostiHeight = 260;
        this.resize();
        this.changeDetectionRef.detectChanges();
    }


    obradiResponse(res) {
        if (res.success) {
            this.podaciUcitani(res.data);
        } else {
            this.displayServerError(res.errorMessage);
        }
    }

    /**
     * Inicijano ucitani podaci
     */
    podaciUcitani(data) {
        this.pretnjeRanjivostiData = data.pretnjeRanjivosti;
        this.vrsteVrednostiHijerarhijaData = data.vrsteVrednostiHijerarhija;
        this.mereData = data.mere;
        this.intenzitetPretnji = data.intenzitetPretnji;
        this.intenzitetRanjivosti = data.intenzitetRanjivosti;


        this.pretnjeRanjivostiData = this.pripremiPretnjeRanjivostiZaCheckScrollTable();

        this.treeScrollTable.onDataChanged(this.vrsteVrednostiHijerarhijaData);
        this.pretnjeRanjivosti.onDataChanged(this.pretnjeRanjivostiData);
        this.primenjeneMere.onDataChanged(this.mereData);
    }

    // Pakujem polja pretnje i ranjivosti u jedno polje - specificno za ovu komponentu
    private pripremiPretnjeRanjivostiZaCheckScrollTable() {
        let pretnjeRanjivostiDataZaCheckScrollTable = [];
        for (let i = 0; i < this.pretnjeRanjivostiData.length; i++) {
            pretnjeRanjivostiDataZaCheckScrollTable.push(
                {
                    id: this.pretnjeRanjivostiData[i].id,
                    checked: false,
                    pretnjaRanjivost: this.pretnjeRanjivostiData[i].pretnja + '\n' + this.pretnjeRanjivostiData[i].ranjivost
                }
            );
        }
        return pretnjeRanjivostiDataZaCheckScrollTable;
    }

    /**
     * Promena vrste vrednosti
     */
    rowChanged(row) {
        this.gridRowVrsteVrednosti = _.cloneDeep(row);
        // Ucitaj pretnje-ranjivosti za vrstu vrednosti
        this.service.getPretnjeRaznjivostiZaVrstuVrednosti(row.id).
            subscribe(res => this.ucitanePretnjeRaznjivostiZaVrstuVrednosti(res), error => this.displayServerError(error));
    }

    ucitanePretnjeRaznjivostiZaVrstuVrednosti(res) {
        this.ucesniciVrsteVrednostiPretnjeRanjivosti = res.data;
        this.pretnjeRanjivosti.parentRowChanged(this.gridRowVrsteVrednosti, this.ucesniciVrsteVrednostiPretnjeRanjivosti);

    }

    // Azuriram ucesnike na osnovu promene u RanjivostiCheckComponenet
    togglePretnjaRanjivost(event) {
        let row = event.row;
        this.pretnjeRanjivostiAktivanRed = row;

        if (row.checked) {
            if (this.potvrdiBrisanjeModalPretnjaRanjivost) {
                this.potvrdiBrisanjeModalPretnjaRanjivost.open(row.pretnjaRanjivost);
            } else {
                this.potvrdjenoBrisanjePretnjeRanjivosti();
            }
        } else {
            if (this.procenaRizikaModal) {
                if (!this.gridRowVrsteVrednosti.poslovnaVrednost) {
                    this.pretnjeRanjivosti.uncheck(row.id);
                    this.toasterService.pop('error', 'Poslovna vrednost nije definisana. Procena rizika nije moguća.');
                } else {
                    let param = {                        
                        vrsteVrednosti: this.gridRowVrsteVrednosti,
                        pretnjaRanjivost: this.pretnjeRanjivosti.getSelectedRow(),
                        intenzitetPretnji: this.intenzitetPretnji,
                        intenzitetRanjivosti: this.intenzitetRanjivosti,
                        prihvatljivaVrednostRizika: this.globalService.prihvatljivaVrednostRizika
                    };

                    this.procenaRizikaModal.open('Procena rizika', param);
                }
            }
        }

    }

    odustaniOdBrisanjaPretnjeRanjivosti() {
        // this.pretnjeRanjivosti.undoCheck(this.pretnjeRanjivostiAktivanRed.id);
        this.pretnjeRanjivosti.check(this.pretnjeRanjivostiAktivanRed.id);
    }

    potvrdjenoBrisanjePretnjeRanjivosti() {
        let row = this.pretnjeRanjivostiAktivanRed;
        this.potvrdiBrisanjeModalPretnjaRanjivost.close();

        let postData = {
            vrstaVrednostiId: this.gridRowVrsteVrednosti.id,
            pretnjaRanjivostId: row.id
        };

        this.service.togglePretnjaRanjivost(postData).subscribe(
            res => {
                if (res.success) {
                    this.toasterService.pop('success', '', 'Podaci snimljeni');                    
                    this.pretnjeRanjivosti.ucesniciChanged(this.gridRowVrsteVrednosti, res.data);
                } else {
                    this.toasterService.pop('error', '', res.errors);
                    this.pretnjeRanjivosti.undoCheck(row.id);
                }
            },
            error => {
                this.toasterService.pop('error', '', error);
                this.pretnjeRanjivosti.undoCheck(row.id);
            }
        )

    }

    editProcenaRizika(event) {
        this.izmenaProceneRizika = true;
        let pretnjaRanjivost = this.pretnjeRanjivosti.getSelectedRow(); 
        let param = {
            vrsteVrednosti: this.gridRowVrsteVrednosti,
            pretnjaRanjivost: pretnjaRanjivost,
            intenzitetPretnji: this.intenzitetPretnji,
            intenzitetRanjivosti: this.intenzitetRanjivosti,
            prihvatljivaVrednostRizika: 40
        };

        this.procenaRizikaModal.open('Procena rizika', param);
    }
    snimiProcenuRizika(event) {
        if (this.izmenaProceneRizika === true){
            this.azurirajProcenuRizika(event);
        } else {
            this.dodajProcenuRizika(event);
        }
    }

    azurirajProcenuRizika(event){
        let data = {
            vrstaVrednostiId: this.gridRowVrsteVrednosti.id,
            pretnjaRanjivostId: this.pretnjeRanjivosti.getSelectedRow().id,
            pretnjaPre: event.procenaRizika.pretnjaPre,
            pretnjaPosle: event.procenaRizika.pretnjaPosle,
            ranjivostPre: event.procenaRizika.ranjivostPre,
            ranjivostPosle: event.procenaRizika.ranjivostPosle
        }

        this.service.azurirajProcenuRizika(data).subscribe(
            res => {
                if (res.success) {
                    this.pretnjeRanjivosti.ucesniciChanged(this.gridRowVrsteVrednosti, res.data);
                    this.izmenaProceneRizika = false;
                    this.toasterService.pop('success', '', 'Podaci snimljeni');
                    this.procenaRizikaModal.close();
                } else {
                    this.toasterService.pop('error', '', res.errorMessage);
                }
            },
            error => {
                this.toasterService.pop('error', '', error);
            }
        )
        
    }

    dodajProcenuRizika(event) {
        let data = {
            vrstaVrednostiId: this.gridRowVrsteVrednosti.id,
            pretnjaRanjivostId: this.pretnjeRanjivosti.getSelectedRow().id,
            pretnjaPre: event.procenaRizika.pretnjaPre,
            pretnjaPosle: event.procenaRizika.pretnjaPosle,
            ranjivostPre: event.procenaRizika.ranjivostPre,
            ranjivostPosle: event.procenaRizika.ranjivostPosle
        }
        this.service.dodajProcenuRizika(data).subscribe(
            res => {
                if (res.success) {
                    this.ucesniciVrsteVrednostiPretnjeRanjivosti = res.data;
                    this.pretnjeRanjivosti.ucesniciChanged(this.gridRowVrsteVrednosti, res.data);
                    this.toasterService.pop('success', '', 'Podaci snimljeni');
                    this.procenaRizikaModal.close();
                } else {
                    this.toasterService.pop('error', '', res.errorMessage);
                }
            },
            error => {
                this.toasterService.pop('error', '', error);
            }
        )
    }

    /**
     * Greske na serveru koje nisu posledica validacije (SQL, 400,  500, ...) 
    */
    displayServerError(error) {
        this.serverErrorMessage = error;
        alert(this.serverErrorMessage);
    }

    pretnjaRanjivostRowChanged(event) {
        let id = this.vrsteVrednostiPretnjeRanjivostiSelectedRowId();
        // Ako nema nista u PretnjamRanjivostima resetujem PrimenjeneMere
        if (!id) {
            this.primenjeneMere.parentRowChanged(this.pretnjeRanjivosti.getSelectedRow(), []);
        } else {
            this.service.getPrimenjeneMereZaPretnjeRaznjivostiZaVrstuVrednosti(id).
                subscribe(res => this.ucitanePrimenjeneMereZaPretnjeRaznjivostiZaVrstuVrednosti(res), error => this.displayServerError(error));
        }
    }

    private vrsteVrednostiPretnjeRanjivostiSelectedRowId() {
        let pretnjaRanjivost = this.pretnjeRanjivosti.getSelectedRow();
        let vrstaVrednosti_PretnjaRanjivost = _.find(this.ucesniciVrsteVrednostiPretnjeRanjivosti, vvpr => { return vvpr.pretnjaRanjivostId === pretnjaRanjivost.id });
        return (vrstaVrednosti_PretnjaRanjivost && vrstaVrednosti_PretnjaRanjivost.id) ? vrstaVrednosti_PretnjaRanjivost.id : null;
    }

    /**
     * MERE
     */
    mereRowChanged($event) { }

    mereDisabled() {
        if (this.pretnjeRanjivosti.getSelectedRow() === null) return true;
        return this.pretnjeRanjivosti.getSelectedRow() && !this.pretnjeRanjivosti.getSelectedRow().checked == true ? true : false;
    }

    ucitanePrimenjeneMereZaPretnjeRaznjivostiZaVrstuVrednosti(res) {
        this.ucesniciVrsteVrednostiPretnjeRanjivostiPrimenjeneMere = res.data;
        this.primenjeneMere.parentRowChanged(this.pretnjeRanjivosti.getSelectedRow(), this.ucesniciVrsteVrednostiPretnjeRanjivostiPrimenjeneMere);
    }

    togglePrimenjeneMere(event) {
        let row = event.row;
        this.primenjeneMereAktivanRed = row;

        if (row.checked) {
            if (this.potvrdiBrisanjeModalPrimenjeneMere) {
                this.potvrdiBrisanjeModalPrimenjeneMere.open(row.naziv);
            } else {
                this.potvrdjenoBrisanjePrimenjeneMere();
            }
        } else {
            this.potvrdjenoBrisanjePrimenjeneMere();
        }
    }

    potvrdjenoBrisanjePrimenjeneMere() {
        let mera = this.primenjeneMereAktivanRed;
        let vrstaVrednosti_PretnjaRanjivostId = this.vrsteVrednostiPretnjeRanjivostiSelectedRowId();

        this.potvrdiBrisanjeModalPrimenjeneMere.close();

        let postData = {
            pretnjaRanjivostId: vrstaVrednosti_PretnjaRanjivostId,
            meraId: mera.id
        };

        this.service.togglePrimenjeneMere(postData).subscribe(
            res => {
                if (res.success) {
                    this.toasterService.pop('success', '', 'Podaci snimljeni');
                    this.primenjeneMere.ucesniciChanged(this.gridRowVrsteVrednosti, res.data);
                } else {
                    this.toasterService.pop('error', '', res.errors);
                    this.primenjeneMere.undoCheck(mera.id);
                }
            },
            error => {
                this.toasterService.pop('error', '', error);
                this.primenjeneMere.undoCheck(mera.id);
            }
        )

    }

    odustaniOdBrisanjaPrimenjeneMere() {
        this.primenjeneMere.undoCheck(this.primenjeneMereAktivanRed.id);
    }

} 