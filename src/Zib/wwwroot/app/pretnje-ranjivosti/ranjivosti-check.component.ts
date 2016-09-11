import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import * as _ from "lodash";

import { CheckScrollTableComponent } from '../shared/components/check-scroll-table.component.OLD';
//import { CheckScrollTableComponent } from '../procena-rizika/check-scroll-table.component';

//import { CheckFilterPipe } from '../shared/pipes/check-filter.pipe';
import { FilterComponent } from '../shared/components/filter.component';

import {DomService} from "../shared/services/dom.service";
import {PretnjeRanjivostiService} from "./pretnje-ranjivosti.service";
import {PretnjeRanjivostiComponent} from "./pretnje-ranjivosti.component";
import {ToasterService} from "angular2-toaster/angular2-toaster";

// <div  class="css-tr" *ngFor="let row of tableData | CheckFilter:prikazIzabranih:filterText" >
@Component({
    moduleId: module.id,
    selector: 'ranjivosti-check',
    template: `
        <div class="sadrzaj" [style.width]="tableWidth + 'px'">
            <filter #filter *ngIf=(filter) (onFilterChange)="onFilterChange($event)" [disabled]="disabled"></filter>

            <div class="css-table" #tabela [style.width]="widthWithoutScrollBar + 'px'" (window:resize)="onResize($event)">
                <div class="css-thead">
                    <div  class="css-tr">
                        <div class="css-td header-style center" [style.width]="ucestvujeWidth + 'px'">
                            Učestvuje<br />
                            <input type="checkbox" [(ngModel)]="prikazIzabranih"/>                    
                        </div>
                        <div class="css-td header-style center" [style.width]="ranjivostiWidthHeader + 'px'">
                            Ranjivost
                        </div>
                    </div>
                </div>
            </div>
{{tableHeight}}
            <div class="css-table" #tabelaBody>
                <div #scrollableArea class="scrollable-area" [style.height.px]="tableHeight" [style.width.px]="tableWidth">
                    <div class="css-tbody" >
                        <div  class="css-tr" *ngFor="let row of vidljiviRedovi()" >
                            <div class="css-td center" [style.width]="ucestvujeWidth + 'px'">
                                <input type="checkbox" (change)="toggleRanjivost($event, row)" [(ngModel)]="row.checked" />                    
                            </div>
                            <div class="css-td left" [style.width]="ranjivostiWidth + 'px'">{{ row.opis }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        '.sadrzaj {width:100%; border: 1px solid #ddd}',
        '.css-td { padding-left: 5px; overflow: hidden; text-overflow: clip; }',
        '.scrollable-area {overflow-y: scroll;}',
        '.scrollable-area:focus {outline: none;}',
        '.css-table {table-layout: fixed}'
    ],
    providers: [ DomService, PretnjeRanjivostiService ],
    directives: [ FilterComponent ]
})
export class RanjivostiCheckComponent extends CheckScrollTableComponent {
    @Input() pretnja: any;
    @Input() ucesniciChanged: any;
    @Input() height: number;

    @ViewChild('tabela') tabela: ElementRef;
    @ViewChild(FilterComponent) filterComponent: FilterComponent;

    @Output() onUcesniciChanged: EventEmitter<any> = new EventEmitter();
   
    property = 'pretnjeRanjivosti';
    propertyId = 'ranjivostId';
    
    private ranjivostiWidth: number = 0;
    private ranjivostiWidthHeader: number = 0;

    constructor(public changeDetectionRef:ChangeDetectorRef, 
                public dom: DomService, 
                public service: PretnjeRanjivostiService, 
                public toasterService: ToasterService) {
        super(changeDetectionRef, dom, toasterService, 'pretnja');
    }
    

    public dimenzionisiTabelu(){
        let scrollBarWidth = this.dom.scrollBarWidth();
        let element = this.tabela.nativeElement.parentElement.parentElement.parentElement.parentElement; // tabset
        let style = element.currentStyle || window.getComputedStyle(element);  // IE || ostali browseri
        let pl = style.paddingLeft;  // srting '20px' ?????
        let pr = style.paddingRight;
        let paddingLeft = parseInt(pl.substring(0, pl.indexOf('px')));
        let paddingRight = parseInt(pr.substring(0, pr.indexOf('px')));
        this.tableWidth = this.tabela.nativeElement.parentElement.parentElement.parentElement.parentElement.offsetWidth - paddingLeft - paddingRight;
        this.tableWidthWithoutScrollBar = this.tableWidth - scrollBarWidth;

//        this.tableHeight = this.tabela.nativeElement.parentElement.parentElement.parentElement.parentElement.offsetHeight;
debugger;
        this.tableHeight = this.height;

        this.ucestvujeWidth = 0.2 * this.tableWidthWithoutScrollBar;
        this.ranjivostiWidth = this.tableWidthWithoutScrollBar - this.ucestvujeWidth -1;
        this.ranjivostiWidthHeader = this.ranjivostiWidth + scrollBarWidth -1;

    }

    private dodajSkiniUcesnika(row) {
        if (row.checked){
            this.ucesnici.push({ pretnjaId: this.masterId, ranjivostId: row.id});
        } else {
            let obrisan = false;
            for (let i = 0; i < this.ucesnici.length; i++) {
                if (this.ucesnici[i].ranjivostId == row.id) {
                    obrisan = true;
                    let ret = this.ucesnici.splice(i, 1);
                    if (ret.length !== 1) console.error('Brisanje: ', this.ucesnici[i]);
                    break;
                }
            }
            if (!obrisan) console.error('Nije obrisan:' , row);
        }

        // Azurira ucesnike u PretnjeRanjivostiComponent
       this.onUcesniciChanged.emit({ ucesnici: this.ucesnici});
    }

    public toggleRanjivost(event, row) {
        let postData = {
            pretnjaId: this.pretnja.id,
            ranjivostId: row.id
        };
        this.service.toggleRanjivost(postData).subscribe(
            res => {
                if (res.success) {
                    this.toasterService.pop('success', '', 'Podaci snimljeni');
                    this.dodajSkiniUcesnika(row);
                } else {
                    this.toasterService.pop('error', '', res.errors);
                    this.undoCheck(row.id);
                }
            },
            error => {
                this.toasterService.pop('error', '', error);
                this.undoCheck(row.id);
            }
        )
    }

}