import {
    Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild, Input, Output, OnChanges, EventEmitter } from "@angular/core";
import { FORM_DIRECTIVES } from '@angular/common';

import * as _ from "lodash";

import { FilterComponent } from './filter.component';

import {DomService} from "../services/dom.service";
import {ToasterService} from "angular2-toaster/angular2-toaster";

@Component({
})
export abstract class CheckScrollTableComponent implements AfterViewInit, OnChanges {
    filterComponent: FilterComponent;

    selectedRow: any = {};
    rowChanged: EventEmitter<any> = new EventEmitter();

    // Ime propertija za ciju promenu vrednosti refreshujem podatke 
    changedPropertyName: string;
    tabela: ElementRef;

    // naziv propertija ('dobavljaci', 'resursi') u kojem su podaci, npr. procesServis.dobavljaci, procesServis.resursi,...
    property: string;
    // id property-ja
    propertyId: string;

    tableHeight:number;
    tableWidth: number;
    tableWidthWithoutScrollBar: number;
    ucestvujeWidth: number;
    nazivWidth: number;
    nazivWidthHeader: number;

    data:any[] = [];
    tableData: any[] = [];
    ucesnici: any[] = [];

    filter = true;
    filterText: string = "";

    masterId: number;

    prikazIzabranih = true;

    constructor(public changeDetectionRef:ChangeDetectorRef, public dom: DomService, public toasterService: ToasterService, changedPropertyName) {
        this.changedPropertyName = changedPropertyName;
    }
    public abstract dimenzionisiTabelu()

    ngAfterViewInit() {
        this.dimenzionisiTabelu();
        this.changeDetectionRef.detectChanges();
    }

    onResize(event) {
        this.dimenzionisiTabelu();
    }

    public onDataChanged(data) {
        this.data = data;
        this.tableData = _.map(this.data, _.clone);
    }

    /**
     * Kad se promeni vrednostu u parent componenti (npr. tabela sa nekim podacima u parent komponenti)
     */
    ngOnChanges(changedValue) {
        if (changedValue && changedValue[this.changedPropertyName] && changedValue[this.changedPropertyName].currentValue && changedValue[this.changedPropertyName].currentValue[this.property]){
            this.masterId = changedValue[this.changedPropertyName].currentValue.id; 
            this.ucesnici = changedValue[this.changedPropertyName].currentValue[this.property];
            this.cekirajUcesnike();
            this.filterComponent.clearFilter();
        }

    }

    // Posto informaciju o cekiranim nemam u podacima tabele rucno selektujem na osnovu podataka dobijenih sa servera
    public cekirajUcesnike() {
        this.decekirajSve();
        for(let i = 0; i < this.ucesnici.length; i++){
            for(let j = 0; j < this.tableData.length; j++){
                if (this.ucesnici[i][this.propertyId] === this.tableData[j].id) {
                    this.tableData[j].checked = true;
                } 
            }
        }
    }


    private decekirajSve() {
        for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].checked = false;
        }
    }

    /**
     * Ako sa servera vrati gresku
     */
    protected undoCheck(id: number) {
        for(let i = 0; i < this.tableData.length; i++){
            if (this.tableData[i].id === id) {
                this.tableData[i].checked = !this.tableData[i].checked;
                break;
            }
        }
    }

    /**
     * Filter
     */
    public onFilterChange(e) {
        this.filterText = e.filterText;
        return;
    }

    vidljiviRedovi(): any[] {
        return this.tableData.filter(item => {
            return this.prikazIzabranih ? item.checked && this.isRowInFilter(item, this.filterText) : this.isRowInFilter(item, this.filterText);
        });
    }


    protected isRowInFilter(row, filterText): boolean {
        if (filterText === "") return true;

        // _.valuesIn pravi niz sa vrednostima propertija u objektu
        let values = '%' + _.valuesIn(row).join('%') + '%';
        values = values.toLowerCase().replace('%true%','').replace('%false%','');
        return values && values.indexOf(filterText.toLowerCase()) >= 0;
    }

/**
     * Pomocne funkcije 
     */
    private rowClicked(row) {
        this.selectRow(row);
    }

    protected selectRow(row = null) {
        if (row != null) {
            this.selectedRow = row;
        } else {
            if (this.tableData.length > 0) {
                this.selectedRow = this.tableData[0];
            } else {
                this.selectedRow = null;
            }
        }
        this.rowChanged.emit(this.selectedRow);
    }

}
