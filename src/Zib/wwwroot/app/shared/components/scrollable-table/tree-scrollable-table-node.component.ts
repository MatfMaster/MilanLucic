import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: '<tree-scrollable-table-node></tree-scrollable-table-node>',
    template: `
        <div  *ngFor="let row of data">
            <div  class="css-tr" (click)="rowClicked(row)" [class.selected]="row.id===selectedRowId">
<!--        <div  class="css-tr" *ngFor="let row of data" #r="row"  (click)="rowClicked(row)" [class.selected]="row.id===selectedRowId">-->
                <template ngFor let-column [ngForOf]="columns" let-i="index">
                    <div *ngIf="!column.hidden" class="css-td" [style.text-align]="column.alignData ? column.alignData : 'left'" [style.width]="(tableProperties.kolone[i].columnWidth) + 'px'">
                        <i *ngIf="column.field==treeColumn && !row.expanded && row.children?.length > 0" class="fa fa-plus-square" (click)="togleExpand($event, row)" [style.padding-left]="(row.nivo * 20) + 'px'"></i>
                        <i *ngIf="column.field==treeColumn && row.expanded && row.children?.length > 0" class="fa fa-minus-square" (click)="togleExpand($event, row)" [style.padding-left]="(row.nivo * 20) + 'px'"></i>
                        <i *ngIf="column.field==treeColumn && row.children?.length <= 0"  [style.padding-left]="(row.nivo * 20) + 'px'"></i>
                        <span> {{ displayField(vrednost(row, column.field)) }}</span>
                    </div>
                </template>
            </div>
            <!-- Rekurzivno pozivam samu sebe za children propertije -->
            <div *ngIf="row.expanded">
                <tree-scrollable-table-node 
                    [tableProperties]="tableProperties" 
                    [data]="row.children" 
                    [columns]="columns" 
                    [selectedRowId]="selectedRowId"
                    [treeColumn]="treeColumn"
                    (onRowClicked)="rowClicked($event)">
                </tree-scrollable-table-node>
            </div>

        </div>

    `,
    directives: [TreeScrollableTableNodeComponent]
})
export class TreeScrollableTableNodeComponent implements OnInit {
    @Input() treeColumn: string;
    @Input() columns: any;
    @Input() tableProperties: any;
    @Input() data: any;
    @Input() selectedRowId:number;
    @Output() onRowClicked: EventEmitter<any> = new EventEmitter();
    
    constructor() { }

    ngOnInit() {
    }

    togleExpand(event, row){
        event.preventDefault();
        row.expanded = !row.expanded;
    }

    rowClicked(row){
        //console.log('TreeScrollableTableNodeComponent.rowClicked: ' + row.id);
        this.onRowClicked.emit(row);
    }

    displayField(field) {
        if (typeof (field) === 'boolean') {
            return field ? 'X' : '';
        }
        return field;
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

}