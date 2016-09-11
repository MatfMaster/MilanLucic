import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input } from "@angular/core";
import * as _ from "lodash";

import { CheckScrollTableComponent } from '../../shared/components/check-scroll-table.component.OLD';
import { CheckFilterPipe } from '../../shared/pipes/check-filter.pipe';
import { FilterComponent } from '../../shared/components/filter.component';

import {DomService} from "../../shared/services/dom.service";
import {BiaService} from "./bia.service";
import {ToasterService} from "angular2-toaster/angular2-toaster";

@Component({
    moduleId: module.id,
    selector: 'resursi-bia',
    template: `
        <div class="sadrzaj" [style.width]="tableWidth + 'px'">
            <filter #filter *ngIf=(filter) (onFilterChange)="onFilterChange($event)" [disabled]="disabled"></filter>

            <div class="css-table" #tabela [style.width]="widthWithoutScrollBar + 'px'" (window:resize)="onResize($event)">
                <div class="css-thead">
                    <div  class="css-tr">
                        <div class="css-td header-style center" [style.width]="ucestvujeWidth + 'px'">
                            Učestvuje<br />
                            <input type="checkbox" noBootstrap [(ngModel)]="prikazIzabranih"/>                    
                        </div>
                        <div class="css-td header-style center" [style.width]="resursiWidthHeader + 'px'">
                            Resurs
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
                            <div class="css-td left" [style.width]="resursiWidth + 'px'">{{ row.naziv }}</div>
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
    providers: [ DomService, BiaService ],
    directives: [ FilterComponent ],
    pipes: [CheckFilterPipe]
})
export class ResursiBiaComponent extends CheckScrollTableComponent {
    @Input() procesServis: any;
    @Input() changedPropertyName: any;
    @ViewChild('tabela') tabela: ElementRef;
    @ViewChild(FilterComponent) filterComponent: FilterComponent;


    property = 'resursi';
    propertyId = 'vrednostId';
    
    private resursiWidth: number = 0;
    private resursiWidthHeader: number = 0;

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
        this.resursiWidth = this.tableWidthWithoutScrollBar - this.ucestvujeWidth -1;
        this.resursiWidthHeader = this.resursiWidth + scrollBarWidth -1;

    }


    public toggleUcestvuje(event, row) {
        let postData = {
            procesServisId: this.procesServis.id,
            resursId: row.id
        };
        this.service.toggleResursi(postData).subscribe(
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
            this.ucesnici.push({ resursId: row.id, procesServisBiaId: this.procesServis.id});
        } else {
            for (let i = 0; i < this.ucesnici.length; i++) {
                if (this.ucesnici[i].zaposleniId == row.id) {
                    this.ucesnici.splice(i, 1);
                    break;
                }
            }
        }
    }

}