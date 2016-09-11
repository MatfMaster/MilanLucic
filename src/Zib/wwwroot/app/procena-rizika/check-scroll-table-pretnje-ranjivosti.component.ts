import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { GlobalService } from '../global.service';

import { DomService } from "../shared/services/dom.service";
import { CheckScrollTableComponent } from '../shared/components/check-scroll-table/check-scroll-table.component';
import { CheckScrollTableAbstractComponent } from '../shared/components/check-scroll-table/check-scroll-table.abstract.component';
import { FilterComponent } from '../shared/components/filter.component';

@Component({
    moduleId: module.id,
    selector: 'check-scroll-table-pretnje-ranjivosti',
    template: `
<div #checkScrollTableComponent class="sadrzaj" [style.width.px]="tableWidth">
    <filter #filter *ngIf=(filter) (onFilterChange)="onFilterChange($event)" [disabled]="disabled"></filter>

    <div class="css-table" #tabela [style.width.px]="tableProperties.widthWithoutScrollBar">
        <div class="css-thead">
            <div class="css-tr">
                <template ngFor let-column [ngForOf]="columns" let-i="index">
                    <div *ngIf="i==0" class="css-td header-style center" [style.width.px]="(tableProperties.kolone[i].columnWidth)" [style.max-width.px]="(tableProperties.kolone[i].columnWidth)">
                        {{ column.header }}<br />
                        <input type="checkbox" noBootstrap [(ngModel)]="prikazIzabranih" (change)="prikazIzabranihClicked()" [disabled]="disabled"
                        />
                    </div>
                    <div *ngIf="i>0" class="css-td header-style center" [style.width.px]="(tableProperties.kolone[i].columnWidth)" [style.max-width.px]="(tableProperties.kolone[i].columnWidth)">
                        {{ column.header }}
                    </div>
                </template>

            </div>
        </div>
    </div>

    <div class="css-table" #tabelaBody>
        <div #scrollableArea class="scrollable-area" [style.height.px]="tableProperties.height" [style.width.px]="tableProperties.width">
            <div class="css-tbody">
                <div class="css-tr" *ngFor="let row of vidljiviRedovi" [class.selected]="row.id===selectedRow?.id">
                    <template ngFor let-column [ngForOf]="columns" let-i="index">
                        <div *ngIf="i==0" class="css-td center" [style.width.px]="tableProperties.kolone[i].columnWidth">
                            <input type="checkbox" noBootstrap [(ngModel)]="row[column.field]" [disabled]="disabled" (click)="checkBoxClick($event, row)"
                            />

                        </div>
                        <div *ngIf="i>0"
                            [class.kritican-rizik]="i==4 && vrednost(row, column.field) > globalService.prihvatljivaVrednostRizika" 
                            [class.rezidualni-rizik]="i==7 && vrednost(row, column.field) > globalService.prihvatljivaVrednostRizika" 
                            [class.prihvatljiv-rizik]="i==7 && vrednost(row, column.field) < globalService.prihvatljivaVrednostRizika" 
                            class="css-td left new-line no-select" (click)="rowClicked(row)" (dblclick)="doubleClickEmmiter($event)"
                            [style.text-align]="column.alignData ? column.alignData : 'left'" [style.width.px]="tableProperties.kolone[i].columnWidth"
                            [innerHtml]="displayField(vrednost(row, column.field))">
                        </div>
                    </template>

                </div>
            </div>
        </div>
    </div>
</div>
    `,
    styleUrls: ['../shared/components/check-scroll-table/check-scroll-table.component.css'],
})
export class CheckScrollTablePretnjeRanjivostiComponent extends CheckScrollTableAbstractComponent implements OnInit {
    @Input() disabled: boolean;
    // @Input() columns: any[];
    @Input() ucesniciId: number; // Ucesnici koje dobijam spolja su neki objekat gde mi treba ime propertija koje sadrzi id ucesnika
    @Input() poljaSaUcesnika: string = ''; // Polja sa ucenika koja dodadajem u tableData
    @Input() height: number;
    @Input() filter: boolean = true;
     
    @Output() onUcesniciChanged: EventEmitter<any> = new EventEmitter();
    @Output() rowChanged: EventEmitter<any> = new EventEmitter();
    @Output() doubleClick: EventEmitter<any> = new EventEmitter();


    @ViewChild(FilterComponent) protected filterComponent: FilterComponent;
    @ViewChild('tabela') protected tabela: ElementRef;

    columns = [
        {
            field: 'checked',
            header: 'Ucestvuje',
            width: 10
        },
        {
            field: 'pretnjaRanjivost',
            header: 'Pretnja / Ranjivost'
        },
        {
            field: 'pretnjaPre.vrednost',
            header: 'Pretnja pre',
            width: 10,
            alignData: 'center'
        },
        {
            field: 'ranjivostPre.vrednost',
            header: 'Ranjivost pre',
            width: 10,
            alignData: 'center'
        },
        {
            field: 'rizikPre',
            header: 'Rizik pre',
            width: 10,
            alignData: 'center'
        },
        {
            field: 'pretnjaPosle.vrednost',
            header: 'Pretnja posle',
            width: 10,
            alignData: 'center'
        },
        {
            field: 'ranjivostPosle.vrednost',
            header: 'Ranjivost posle',
            width: 10,
            alignData: 'center'
        },
        {
            field: 'rizikPosle',
            header: 'Rizik posle',
            width: 10,
            alignData: 'center'
        }
    ];


    constructor(public dom: DomService, public changeDetectionRef: ChangeDetectorRef, public globalService: GlobalService) { 
        super(dom, changeDetectionRef);
    }
}