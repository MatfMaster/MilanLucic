/**
 * Ancestor za ScrollableTable.Component i TreeScrollableTable.component
 */
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Renderer, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { DomService, TableProperties, Kolona } from '../../services/dom.service';
import { FilterComponent } from '../filter.component';
import { ScrollTableKeyupService, KeyupResult } from './scroll-table-keyup.service';
import { SortDataService } from './sort-data-service';

//import _ from 'lodash';
import * as _ from 'lodash';


@Component({
    //providers: [Window]
})

export abstract class BaseScrollableTableComponent {
    disabled: boolean = false;
    columns: any[];
    rowChanged: EventEmitter<any> = new EventEmitter();

    tabela: ElementRef;
    scrollableArea: ElementRef;

    height: number = 0;
    protected data: any[];
    public tableData: any[];
    protected selectedRow: any = {};
    public tableProperties = new TableProperties();

    constructor(
        public renderer: Renderer,
        public dom: DomService,
        public changeDetectionRef: ChangeDetectorRef) {

    }

    /**
     * ng2
     */
    ngOnInit() {
        this.tableProperties.kolone = this.columns;
    }

    ngAfterViewInit() {
        this.dimenzionisiTabelu();
    }

    // Dimenzionisem ponovo tabelu posle resize-a
    public onResize(event) {
        this.dimenzionisiTabelu()
    }

    public getSelectedRow(){
        return this.selectedRow;
    }

    dimenzionisiTabelu() {
        if (!this.dom || !this.tabela.nativeElement) return;

        this.tableProperties = this.dom.divTableProperties(this.tabela.nativeElement, this.columns, this.height);

        // Zbog greske koju A2 izbacuje "Expression has changed after it was checked...." u development modu (dva puta prolazi kroz detekciju promene bindovanih vrednosti)
        // potrebno je rucno pokrenuti detekciju.Moze koriscenjem timeout funkcije ili ovako ili ... 
        this.changeDetectionRef.detectChanges();

        this.scrollableArea.nativeElement.focus();
    }
    /* End ng2 */


    public onDataChanged(newData) {
        this.data = newData;
        this.tableData = _.map(this.data, _.clone);
        this.selectRow();
    }




    /**
     * Pomocne funkcije 
     */
    private rowClicked(row) {
        if (row.id === this.selectedRow.id) return;
        if (this.disabled) return;
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



    /**     
     * Kad treba prikazati vrednost nested polja (koje je string), npr. "vrstaVrednosti.opis"
     */
    vrednost(row, field) {
        var fields = field.split('.');
        var ret = row;

        for (var i = 0; i < fields.length; i++) {
            if (ret) {
                ret = ret[fields[i]];
            }
        }
        return ret;
    }

    /**
     * Formatiranje display polja - TODO: izbaciti odavde 
     */
    displayField(field) {
        if (typeof (field) === 'boolean') {
            return field ? 'X' : '';
        }
        return field;
    }
}