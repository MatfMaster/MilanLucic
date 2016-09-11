// TODO: U odvojenim nizovima cuvam listu za izbor (npr. dobavljace) i listu cekiranih koju inicijalno popunjavam
// kad se promeni red u Procesi/Servisi. Kad korisnik doda/skine ucesnika rucno azuriram lokalnu listu cekiranih.
// Eventualno da se posle dodavanja/skidanja ucesnika sa servera vrati noa lista ucesnika
//
// Posto svaki put kod promene filtera unistavam i kreiram niz tableData koji ima informaciju o cekiranim

///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
// import {
//     Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild, Input,
//     OnChanges
// } from "@angular/core";
import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input } from "@angular/core";

//import { FORM_DIRECTIVES } from '@angular/common';

import * as _ from "lodash";

import { CheckScrollTableComponent } from '../../shared/components/check-scroll-table.component.OLD';
import { CheckFilterPipe } from '../../shared/pipes/check-filter.pipe';
import { FilterComponent } from '../../shared/components/filter.component';


import {DobavljacBia} from "./dobavljac-bia.model";
import {DomService} from "../../shared/services/dom.service";
import {BiaService} from "./bia.service";
import {ToasterService} from "angular2-toaster/angular2-toaster";

@Component({
    moduleId: module.id,
    selector: 'dobavljaci-bia',
    //templateUrl: 'dobavljaci-bia.html'
    template: `
        <div class="sadrzaj" [style.width]="tableWidth + 'px'">
            <filter #filter *ngIf=(filter) (onFilterChange)="onFilterChange($event)" [disabled]="disabled" ></filter>

            <div class="css-table" #tabela [style.width]="widthWithoutScrollBar + 'px'" (window:resize)="onResize($event)">
                <div class="css-thead">
                    <div  class="css-tr">
                        <div class="css-td header-style center" [style.width]="ucestvujeWidth + 'px'">
                            Učestvuje<br />
                            <input noBootstrap type="checkbox" [(ngModel)]="prikazIzabranih"/>                    
                        </div>
                        <div class="css-td header-style center" [style.width]="nazivWidthHeader + 'px'">
                            Dobavljač
                        </div>
                    </div>
                </div>
            </div>

            <div class="css-table" #tabelaBody>
                <div #scrollableArea class="scrollable-area" [style.height]="tableHeight + 'px'" [style.width]="tableWidth + 'px'">
                    <div class="css-tbody" >
                        <div  class="css-tr" *ngFor="let row of vidljiviRedovi()" >
                            <div class="css-td center" [style.width]="ucestvujeWidth + 'px'">
                                <input type="checkbox" noBootstrap (change)="toggleUcestvuje($event, row)" [(ngModel)]="row.checked" />                    
                            </div>
                            <div class="css-td left" [style.width]="nazivWidth + 'px'">{{ row.naziv }}</div>
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
    providers: [DomService, BiaService],
    directives: [
        //FORM_DIRECTIVES, 
        FilterComponent
    ],
    pipes: [CheckFilterPipe]
})
export class DobavljaciBiaComponent extends CheckScrollTableComponent {
    // ovu vrednost hvatam u CheckScrollTableComponent.ngOnChanges, a ime prenosim u konstruktoru 
    @Input() procesServis: any;
    @Input() changedPropertyName: any;
    @ViewChild('tabela') tabela: ElementRef;
    @ViewChild(FilterComponent) filterComponent: FilterComponent;


    property = 'dobavljaci';
    propertyId = 'dobavljacId';

    constructor(public changeDetectionRef:ChangeDetectorRef, public dom: DomService, public service: BiaService, public toasterService: ToasterService) {
        super(changeDetectionRef, dom, toasterService, 'procesServis');
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

        this.tableHeight = this.tabela.nativeElement.parentElement.parentElement.parentElement.parentElement.offsetHeight;

        this.ucestvujeWidth = 0.2 * this.tableWidthWithoutScrollBar;
        this.nazivWidth = this.tableWidthWithoutScrollBar - this.ucestvujeWidth -1;
        this.nazivWidthHeader = this.nazivWidth + scrollBarWidth -1;

    }


    public toggleUcestvuje(event, row: DobavljacBia) {
        let postData = {
            procesServisId: this.procesServis.id,
            dobavljacId: row.id
        };
        this.service.toggleDobavljac(postData).subscribe(
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

    private dodajSkiniUcesnika(row) {
        if (row.checked){
            this.ucesnici.push({ dobavljacId: row.id, procesServisBiaId: this.procesServis.id});
        } else {
            for (let i = 0; i < this.ucesnici.length; i++) {
                if (this.ucesnici[i].dobavljacId == row.id) {
                    this.ucesnici.splice(i, 1);
                    break;
                }
            }
        }
    }

}