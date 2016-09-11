import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { FORM_DIRECTIVES } from '@angular/common';

import * as _ from "lodash";

import { FilterComponent } from '../filter.component';
import {DomService, TableProperties} from "../../services/dom.service";

import { CheckScrollTableService } from './check-scroll-table.service';
import { CheckScrollTableAbstractComponent } from './check-scroll-table.abstract.component';

@Component({
    selector: 'check-scroll-table-component',
    moduleId: module.id,
    templateUrl: 'check-scroll-table.template.html',
    styleUrls: ['check-scroll-table.component.css'],
    providers: [ CheckScrollTableService ],
    directives: [ FilterComponent ]
})
export class CheckScrollTableComponent extends CheckScrollTableAbstractComponent {
//export class CheckScrollTableComponent implements AfterViewInit, OnInit {
    @Input() disabled: boolean;
    @Input() columns: any[];
    @Input() ucesniciId: number; // Ucesnici koje dobijam spolja su neki objekat gde mi treba ime propertija koje sadrzi id ucesnika
    @Input() poljaSaUcesnika: string = ''; // Polja sa ucenika koja dodadajem u tableData
    @Input() height: number;
    @Input() filter: boolean = true;
     
    @Output() onUcesniciChanged: EventEmitter<any> = new EventEmitter();
    @Output() rowChanged: EventEmitter<any> = new EventEmitter();
    @Output() doubleClick: EventEmitter<any> = new EventEmitter();


    @ViewChild(FilterComponent) protected filterComponent: FilterComponent;
    @ViewChild('tabela') protected tabela: ElementRef;

    // @ViewChild('filter') private filterEl: ElementRef;
    // @ViewChild('tabelaBody') private tabelaBodyEl: ElementRef;
    // @ViewChild('checkScrollTableComponent') private kontrola: ElementRef;
    
    // private tableProperties = new TableProperties();

    // private selectedRow: any = {};
    // private sacuvajSelektovanRed: any = {};


    // private tableData: any[] = [];
    // private ucesnici: any[] = [];
    // private vidljiviRedovi: any[] = [];

    // private filterText: string = "";

    // private masterId: number;

    // private prikazIzabranih = true;

    constructor(public dom: DomService, public changeDetectionRef: ChangeDetectorRef) {
    // constructor(public dom: DomService, public changeDetectionRef: ChangeDetectorRef, public checkScrollTableService: CheckScrollTableService) {
        super(dom, changeDetectionRef);
    }
    
    // checkBoxClick(event, row){
    //     // console.log('checkBoxClick(event)');
    //     this.toggleCheckBox(event, row);
    //     event.preventDefault();
    // }

    /**
     * API
     */
    // public getSelectedRow() {
    //     return this.selectedRow;
    // }

    // public onDataChanged(data) {
    //     //this.data = data;
    //     // this.tableData = _.map(this.data, _.clone);
    //     this.tableData = _.map(data, _.clone);
    // }

    // public parentRowChanged(row: any, cekirani: any[]){
    //     this.masterId = row ? row.id: null;
    //     this.ucesnici = cekirani;
    //     if (this.filterComponent) this.filterComponent.clearFilter();
    //     this.cekirajUcesnike();
    //     this.vidljiviRedovi = this.getVidljiviRedovi();
    //     this.sacuvajSelektovanRed = null;
    //     this.selectRow();
    // }

    // public ucesniciChanged(row: any, cekirani: any[]){
    //     this.masterId = row ? row.id: null;
    //     this.ucesnici = cekirani;
    //     if (this.filterComponent) this.filterComponent.clearFilter();
    //     this.cekirajUcesnike();
    //     this.vidljiviRedovi = this.getVidljiviRedovi();
    //     this.selectRow();
    // }
    
    // /**
    //  * Ako sa servera vrati gresku
    //  */
    // public undoCheck(id: number) {
    //     this.undoCheckData(this.tableData, id);
    //     this.undoCheckData(this.vidljiviRedovi, id);
    //     // for(let i = 0; i < this.tableData.length; i++){
    //     //     if (this.tableData[i].id === id) {
    //     //         this.tableData[i].checked = !this.tableData[i].checked;
    //     //         break;
    //     //     }
    //     // }
    // }

    // private undoCheckData(data: any[], id: number){
    //     for(let i = 0; i < data.length; i++){
    //         if (data[i].id === id) {
    //             data[i].checked = !data[i].checked;
    //             return;
    //         }
    //     }
    // }

    // public check(id: number) {
    //     this.setCheckStatus(this.tableData, id, true);
    //     this.setCheckStatus(this.vidljiviRedovi, id, true);
    //     // for(let i = 0; i < this.tableData.length; i++){
    //     //     if (this.tableData[i].id === id) {
    //     //         this.tableData[i].checked = true;
    //     //         break;
    //     //     }
    //     // }
    // }

    // public uncheck(id: number) {
    //     this.setCheckStatus(this.tableData, id, false);
    //     this.setCheckStatus(this.vidljiviRedovi, id, false);
    //     // for(let i = 0; i < this.tableData.length; i++){
    //     //     if (this.tableData[i].id === id) {
    //     //         this.tableData[i].checked = false;
    //     //         break;
    //     //     }
    //     // }
    // }

    // private setCheckStatus(data: any[], id: number, checkStatus: boolean){
    //     for(let i = 0; i < data.length; i++){
    //         if (data[i].id === id) {
    //             data[i].checked = checkStatus;
    //             return;
    //         }
    //     }        
    // }

    // /**
    //  * Dimenzionise visinu tabele kada je poznata visina celog panela u kojem se nalazi kontrola
    //  * visinaPanela - visina celog panela
    //  */
    // public setHeight(visinaPanela: number){
        
    //     let tabelaEl = this.tabela.nativeElement;
    //     // Visina tabele za zadatu visinu cele kontrole
    //     let panel = this.dom.findAncestorWithClassName(tabelaEl, 'panel');

    //     if (!panel) {
    //         console.error('check-scroll-table.component: nema panela');
    //         return 0;
    //     }
        
    //     let panelHeading = panel.getElementsByClassName('panel-heading')[0];
    //     let panelHeadingHeight = panelHeading ? this.dom.getAbsoluteHeight(panelHeading) : 0;

    //     let filter = panel.getElementsByClassName('filter-with-grid')[0];
    //     let filterHeight = filter ? this.dom.getAbsoluteHeight(filter) : 0;

    //     let tableHeader = panel.getElementsByClassName('css-thead')[0];
    //     let tableHeaderHeight = tableHeader ? this.dom.getAbsoluteHeight(tableHeader): 0;

    //     let visinaPanelaBezTabele = panelHeadingHeight + filterHeight + tableHeaderHeight;
    //     let visinaTabele = visinaPanela - visinaPanelaBezTabele - 4; // 4 = broj linija iznad scrollabilne tabele ????? 
    //     this.tableProperties.height = visinaTabele;

    // }
    /* API END */

    // public ngOnInit() {
    //     this.tableProperties.kolone = this.columns;
    // }

    // public ngAfterViewInit() {
    //     this.dimenzionisiTabelu();
    //     //this.changeDetectionRef.detectChanges();
    // }

    // public  onResize(event) {
    //     this.dimenzionisiTabelu();
    // }

    // private prikazIzabranihClicked(){
    //     this.prikazIzabranih = !this.prikazIzabranih;
    //     this.osveziPrikaz();
    // }

    // private dimenzionisiTabelu() {
    //     let tabelaEl = this.tabela.nativeElement;
    //     if (!this.dom || !this.tabela.nativeElement) return;

    //     this.tableProperties = this.dom.divTableProperties(tabelaEl, this.columns, this.height);

    //     // // Visina tabele za zadatu visinu cele kontrole
    //     // let panel = this.dom.findAncestorWithClassName(tabelaEl, 'panel');
    //     // if (!panel) console.error('check-scroll-table.component: nema panela');
        
    //     // let visinaPanelaBezTabele = this.height - this.dom.getAbsoluteHeight(panel);
    //     // this.tableProperties.height = visinaPanelaBezTabele;
    //     this.setHeight(this.height);

    //     // Zbog greske koju A2 izbacuje "Expression has changed after it was checked...." u development modu (dva puta prolazi kroz detekciju promene bindovanih vrednosti)
    //     // potrebno je rucno pokrenuti detekciju.Moze koriscenjem timeout funkcije ili ovako ili ... 
    //     this.changeDetectionRef.detectChanges();
    // }


    // private getVidljiviRedovi(): any[] {
    //     let vidljiviRedovi = _.filter(this.tableData, item => {
    //         return this.prikazIzabranih ? item.checked && this.isRowInFilter(item, this.filterText) : this.isRowInFilter(item, this.filterText);
    //     });
    //     // Ako je vidljiv red u ucesnicima kopiram ostala polja iz ucesnika u vidljoive redove
    //     return vidljiviRedovi;
    // }

    // private uVidljivimRedovima(id: number) : boolean {
    //     for(let i = 0; i < this.vidljiviRedovi.length; i++){
    //         if (this.vidljiviRedovi[i].id === id)
    //             return true;
    //     }
    //     return false;
    // }

    // private cekirajUcesnike() {
    //     this.decekirajSve();
    //     for(let i = 0; i < this.ucesnici.length; i++){
    //         for(let j = 0; j < this.tableData.length; j++){
    //             if (this.ucesnici[i][this.ucesniciId] === this.tableData[j].id) {
    //             // if (this.ucesnici[i].id === this.tableData[j].id) {
    //                 this.tableData[j].checked = true;
    //                 this.dodajPoljaSaUcesnika(this.tableData[j], this.ucesnici, this.ucesniciId, this.poljaSaUcesnika);
    //             } 
    //         }
    //     }

    //     for(let i = 0; i < this.ucesnici.length; i++){
    //         for(let j = 0; j < this.vidljiviRedovi.length; j++){
    //             if (this.ucesnici[i][this.ucesniciId] === this.vidljiviRedovi[j].id) {
    //             // if (this.ucesnici[i].id === this.vidljiviRedovi[j].id) {
    //                 this.vidljiviRedovi[j].checked = true;
    //                 this.dodajPoljaSaUcesnika(this.vidljiviRedovi[j], this.ucesnici, this.ucesniciId, this.poljaSaUcesnika);
    //             } 
    //         }
    //     }

    // }

    // /**
    //  * Ako u tabeli treba da prikazem polja koja inicijalno (tableData) ne postoje, ili se popunjavaju svaki put kad se ucesnici promene
    //  * Npr. kod procene rizika treba da prikazem vrednosti pretnji, ranjivosti i rizika koja ne postoje u inicijanoj tableData
    //  * koju popunjavam sa kombinacijama pretnji-ranjivosti i jos se menjaju svaki put kad se promeni parentRow (vrsta vrednosti)
    //  **/
    // private dodajPoljaSaUcesnika(dataRow: any, ucesnici: any[], idPoljeUcesnika, polja: string){
    //     for(let i = 0; i < ucesnici.length; i++){
    //         if (ucesnici[i][idPoljeUcesnika] === dataRow.id){
    //             let nizPolja = polja.split(',');
    //             for (let j = 0; j < nizPolja.length; j++){
    //                 let property = nizPolja[j].trim(); 
    //                 dataRow[property] = ucesnici[i][property];
    //             }
    //             return;
    //         }
    //     }
    // }

    // private resetujPoljaSaUcesnika(idPoljeUcesnika, polja: string, resetVrednost: any = undefined){
    //     for(let i = 0; i < this.tableData.length; i++){
    //         let nizPolja = polja.split(',');
    //         for (let j = 0; j < nizPolja.length; j++){
    //             let property = nizPolja[j].trim(); 
    //             this.tableData[i][property] = resetVrednost;
    //         }
    //     }

    //     for(let i = 0; i < this.vidljiviRedovi.length; i++){
    //         let nizPolja = polja.split(',');
    //         for (let j = 0; j < nizPolja.length; j++){
    //             let property = nizPolja[j].trim(); 
    //             //debugger;
    //             this.vidljiviRedovi[i][property] = resetVrednost;
    //         }
    //     }
    // }


    // private decekirajSve() {
    //     this.resetujPoljaSaUcesnika(this.ucesniciId, this.poljaSaUcesnika);
    //     for(let i = 0; i < this.tableData.length; i++){
    //         this.tableData[i].checked = false;
    //     }
    //     for(let i = 0; i < this.vidljiviRedovi.length; i++){
    //         this.vidljiviRedovi[i].checked = false;
    //     }
    // }

    // /**
    //  * Refresuje prikaz podataka posle nekog dogadjaja - promena filtera, prikaz cekiranih-decekiranih, promena parent reda ...
    //  */
    // private osveziPrikaz(){
    //     this.vidljiviRedovi = this.getVidljiviRedovi();
    //     this.selectRow();
    // }


    // /**
    //  * Filter
    //  */
    // private onFilterChange(e) {                
    //     this.filterText = e.filterText;
    //     this.osveziPrikaz();
    //     return;
    // }


    // private isRowInFilter(row, filterText): boolean {
    //     if (filterText === "") return true;

    //     // _.valuesIn pravi niz sa vrednostima propertija u objektu
    //     let values = '%' + _.valuesIn(row).join('%') + '%';
    //     values = values.toLowerCase().replace('%true%','').replace('%false%','');
    //     return values && values.indexOf(filterText.toLowerCase()) >= 0;
    // }

    // /**
    //  * Pomocne funkcije 
    //  */
    // private rowClicked(row) {
    //     if (row.id === this.selectedRow.id) return;
    //     this.selectRow(row);
    //     this.sacuvajSelektovanRed = row;
    // }

    // private doubleClickEmmiter(event){
    //     this.doubleClick.emit(this.selectedRow);
    // }

    // private selectRow(row = null) {
    //     if (row != null) {
    //         this.selectedRow = row;
    //     } else {
    //         if (this.sacuvajSelektovanRed != null && this.uVidljivimRedovima(this.sacuvajSelektovanRed.id)){
    //             this.selectedRow = this.sacuvajSelektovanRed;
    //         } else {
    //             //let vidljiviRedovi = this.vidljiviRedovi();
    //             if (this.vidljiviRedovi.length > 0) {
    //                 this.selectedRow = this.vidljiviRedovi[0];
    //                 this.sacuvajSelektovanRed = this.selectedRow;
    //             } else {
    //                 this.selectedRow = null;
    //             }
    //         }
    //     }

    //     if (this.selectedRow)
    //         this.rowChanged.emit(this.selectedRow);        
    // }

    // /**
    //  * Cekiranje-Decekiranje
    //  */
    // private toggleCheckBox(event, row) {
    //     this.sacuvajSelektovanRed = row;
    //     if (row.id !== this.selectedRow.id){
    //         this.selectRow(row);
    //     }
    //     this.onUcesniciChanged.emit({ row: row});
    // }

    // /**     
    //  * Kad treba prikazati vrednost nested polja (koje je string), npr. "vrstaVrednosti.opis"
    //  */
    // private vrednost(row, field) {
    //     var fields = field.split('.');
    //     var ret = row;

    //     for (var i = 0; i < fields.length; i++) {
    //         if (ret) {
    //             ret = ret[fields[i]];
    //         }
    //     }
    //     return ret;
    // }

    // /**
    //  * Formatiranje display polja - TODO: izbaciti odavde 
    //  */
    // private displayField(field) {
    //     if (typeof (field) === 'boolean') {
    //         return field ? 'X' : '';
    //     }
    //     return field;
    // }
}
