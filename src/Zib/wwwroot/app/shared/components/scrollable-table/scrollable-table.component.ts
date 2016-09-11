import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Renderer, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { DomService, TableProperties, Kolona } from '../../services/dom.service';
import { FilterComponent } from '../filter.component';
import { ScrollTableKeyupService, KeyupResult } from './scroll-table-keyup.service';

// //import _ from 'lodash';
import * as _ from 'lodash';

import { BaseScrollableTableComponent } from './base-scrollable-table.component'; 

@Component({
    selector: '<scrollable-table></scrollable-table>',
    template: `
        <filter #filter *ngIf=(filter) (onFilterChange)="onFilterChange($event)" [disabled]="disabled"></filter>        
        
        <div class="css-table" #tabela [style.width]="tableProperties.widthWithoutScrollBar + 'px'" (window:resize)="onResize($event)">
            <div class="css-thead">
                <template ngFor let-column [ngForOf]="columns" let-i="index">
                    <div *ngIf="!column.hidden" (click)="sortByColumn(column)" class="css-td header-style" 
                        [style.text-align]="column.alignHeader ? column.alignHeader : 'center'" 
                        [style.width]="(tableProperties.kolone[i].columnWidth) + 'px'" 
                        [style.max-width]="(tableProperties.kolone[i].columnWidth) + 'px'" 
                        >
                        {{column.header}}
                        <i *ngIf="column.field==orderByColumn" [ngClass]="orderByReverse ? 'fa fa-sort-desc' : 'fa fa-sort-asc'" ></i >
                    </div>
                </template>
            </div>
        </div>
        <div class="css-table" #tabelaBody>
            <div #scrollableArea tabindex="0" (keyup)="onKeyUp($event)"  class="scrollable-area" [style.height]="tableProperties.height + 'px'" [style.width]="tableProperties.width + 'px'">
                <div class="css-tbody" >
                    <div  class="css-tr" *ngFor="let row of tableData"   (click)="rowClicked(row)" [class.selected]="row.id===selectedRow.id">
                        <template ngFor let-column [ngForOf]="columns" let-i="index">
                            <div *ngIf="!column.hidden" class="css-td" [style.text-align]="column.alignData ? column.alignData : 'left'" [style.width]="(tableProperties.kolone[i].columnWidth) + 'px'">
                                <span>{{  displayField(vrednost(row, column.field)) }}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        '.header-style {vertical-align: middle; cursor: pointer; }',
        '.css-td { padding-left: 5px; overflow: hidden; text-overflow: clip; }',
        '.scrollable-area {overflow-y: scroll;}',
        '.scrollable-area:focus {outline: none;}',
        '.css-table {table-layout: fixed}',
        '.css-thead { background-color: #61778a; }'
    ],
    directives: [
        FilterComponent
    ],
    providers: [
        DomService, 
        ScrollTableKeyupService
    ]
})


export class ScrollableTableComponent extends BaseScrollableTableComponent implements AfterViewInit, OnInit {
    @Input() disabled: boolean = false;
    @Input() filter: boolean = true;
    @Input() columns;
    @Input() height: number;
    @Output() rowChanged: EventEmitter<any> = new EventEmitter();

    @ViewChild('tabela') tabela: ElementRef;
    // @ViewChild('tabelaBody') tabelaBody: ElementRef;
    @ViewChild('scrollableArea') scrollableArea: ElementRef;
    @ViewChild('filter') filterComponent;

    private filterText: string = "";

    private orderByReverse: boolean;
    private orderByColumn: string = "";

    constructor(        
        public renderer: Renderer,
        public dom: DomService,
        public changeDetectionRef: ChangeDetectorRef,
        public keyupService: ScrollTableKeyupService)
    { 
        super(renderer, dom, changeDetectionRef);
    }

    

    /**
     * API - pozivaju se iz parent komponente
     */

    public addRow(row: any) {
        this.data.push(row);
        if (this.isRowInFilter(row)) {
            this.tableData.push(row);
        }
        this.selectRow(row);
    }

    public editRow(row: any) {
        let indexRedaUFiltriranim = this.indeksRedaUFiltriranim(row);
        if (indexRedaUFiltriranim >= 0) {
            this.tableData[indexRedaUFiltriranim] = _.cloneDeep(row);
        }

        let indexRedaUNeFiltriranim = this.indeksRedaUNefiltriranim(row);
        if (indexRedaUNeFiltriranim >= 0) {
            this.data[indexRedaUNeFiltriranim] = _.cloneDeep(row);
        }
    }

    public deleteRow(row: any) {
        let indexRedaUFiltriranim = this.indeksRedaUFiltriranim(row);
        if (indexRedaUFiltriranim >= 0) {
            if (this.selektujSledeciRed()) {
                this.tableData.splice(indexRedaUFiltriranim, 1);
            } else {
                if (this.selektujPrethodniRed()) {
                    this.tableData.splice(indexRedaUFiltriranim, 1);
                } else {
                    this.tableData.splice(indexRedaUFiltriranim, 1);
                    this.selectRow();
                }
            }
        }

        let indexRedaUNeFiltriranim = this.indeksRedaUNefiltriranim(row);
        if (indexRedaUNeFiltriranim >= 0) {
            this.data.splice(indexRedaUNeFiltriranim, 1);
        }
    }

    /**
     * Dimenzionise visinu tabele kada je poznata visina celog panela u kojem se nalazi kontrola
     * visinaPanela - visina celog panela
     */
    public setHeight(visinaPanela: number){
        let tabelaEl = this.tabela.nativeElement;
        this.tableProperties.height = this.dom.tableInPanelHeight(tabelaEl, visinaPanela);

        // let tabelaEl = this.tabela.nativeElement;
        // // Visina tabele za zadatu visinu cele kontrole
        // let panel = this.dom.findAncestorWithClassName(tabelaEl, 'panel');

        // if (!panel) {
        //     console.error('check-scroll-table.component: nema panela');
        //     return 0;
        // }
        
        // let panelHeading = panel.getElementsByClassName('panel-heading')[0];
        // let panelHeadingHeight = this.dom.getAbsoluteHeight(panelHeading);
        // let filter = panel.getElementsByClassName('filter-with-grid')[0];
        // let filterHeight = this.dom.getAbsoluteHeight(filter);
        // let tableHeader = panel.getElementsByClassName('css-thead')[0];
        // let tableHeaderHeight = this.dom.getAbsoluteHeight(tableHeader);

        // let visinaPanelaBezTabele = panelHeadingHeight + filterHeight + tableHeaderHeight;
        // let visinaTabele = visinaPanela - visinaPanelaBezTabele - 4; // 4 = broj linija iznad scrollabilne tabele ????? 
        // this.tableProperties.height = visinaTabele;

    }

    /* API END */

    /**
     * Obradjuje keyup na tabeli
     */
    protected onKeyUp(event) {

        event.preventDefault();

        if (this.disabled) return;

        let indeksSelektovanogReda = this.indeksRedaUFiltriranim(this.selectedRow);

        if (indeksSelektovanogReda < 0) {
            return;
        }

//        switch (event.keyIdentifier) {
        switch (event.key) {
            case 'U+0046':
            case 'f':
            case 'F':
                this.filterComponent.setFocus();
                return;
            default:
                let keyupResult = this.keyupService.keyup(event.key, this.scrollableArea.nativeElement.offsetHeight, this.tableProperties.rowHeight, indeksSelektovanogReda, this.tableData.length);
                if (keyupResult !== undefined) {
                    this.selectRow(this.tableData[keyupResult.redZaSelektovanje]);
                    this.scrollableArea.nativeElement.scrollTop = keyupResult.scrollToPosition;
                }
                break;
        }
    }



    /**
     * Sortiranje
     */
    private sortByColumn(column) {
        this.orderByReverse = !this.orderByReverse;
        this.orderByColumn = column.field;
        this.sort();
    }

    // Izdojio sam ovako sortiranje da bi posle filtriranja pozvao sort da zdrzim dobar redosled filtriranih
    private sort() {
        if (this.orderByColumn === "") return;

        this.tableData = _.sortBy(this.tableData, (d) => { return d[this.orderByColumn]; });
        if (this.orderByReverse) {
            this.tableData = _.reverse(this.tableData);
        }
    }
    /* Sortiranje END */

    /**
     * Filter
     */
    private onFilterChange(e) {

        if (e.filterText === undefined) {
            return;
        }

        this.filterText = e.filterText;
        this.tableData = [];
        if (this.filterText.length == 0) {
            this.tableData = this.data;
        }
        else {
            this.tableData = _.filter(this.data, row => this.isRowInFilter(row));
        }
        
        this.sort();

        // Ako selektovan red nije vise vidljiv (nije u filtriranim), selektujem red u filtriranim
        if (this.indeksRedaUFiltriranim(this.selectedRow) < 0) {
            this.selectRow();
        }

        // Da selektovan red posle promene filtera bude uvek vidljiv
        setTimeout(() => this.scrollSelectedRowToTop());
    }

    /**
     * Indeks reda u filtriranim redovima
     * vraca indeks ili -1
     */
    protected indeksRedaUFiltriranim(red): number {
        if (!red) return -1;
        return _.findIndex(this.tableData, d => { return d.id === red.id })
    }

    /**
     * Indeks reda u NEfiltriranim redovima
     * vraca indeks ili -1
     */
    protected indeksRedaUNefiltriranim(red): number {
        if (!red) return -1;
        return _.findIndex(this.data, d => { return d.id === red.id })
    }

    /**
     * Da li je 'row' u filtriranim redovima
     */
    private isRowInFilter(row): boolean {
        if (this.filterText === "") return true;

        let values = _.valuesIn(row);
        let brojKolona = values.length;
        for (let i = 0; i < brojKolona; i++) {
            if (values[i] && values[i].toString().toLowerCase().indexOf(this.filterText.toLowerCase()) >= 0) {
                return true;
            }
        }
        return false;
    }

    /* End Filter */


    scrollSelectedRowToTop() {
        let indeksSelektovanogReda = this.indeksRedaUFiltriranim(this.selectedRow);
        if (indeksSelektovanogReda >= 0) {
            let newScrollToPosition = indeksSelektovanogReda * this.tableProperties.rowHeight;
            this.scrollableArea.nativeElement.scrollTop = newScrollToPosition;
        }
    }

    /**
     * Selektuje sledeci red u odnosu na trenutno selektovan
     */
    protected selektujSledeciRed(): boolean {
        let indeksTrenutnoSelektovanogReda = this.indeksRedaUFiltriranim(this.selectedRow);
        if (indeksTrenutnoSelektovanogReda >= 0 && indeksTrenutnoSelektovanogReda < this.tableData.length - 1) {
            this.selectRow(this.tableData[indeksTrenutnoSelektovanogReda + 1]);
            return true;
        }
        return false;
    }

    /**
     * Selektuje prethodni red u odnosu na trenutno selektovan
     */
    protected selektujPrethodniRed(): boolean {
        let indeksTrenutnoSelektovanogReda = this.indeksRedaUFiltriranim(this.selectedRow);
        if (indeksTrenutnoSelektovanogReda - 1 >= 0 && this.tableData.length > 0) {
            this.selectRow(this.tableData[indeksTrenutnoSelektovanogReda - 1]);
            return true;
        }
        return false;
    }

}