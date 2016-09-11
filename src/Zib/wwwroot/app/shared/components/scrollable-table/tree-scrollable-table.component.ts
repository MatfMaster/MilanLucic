import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Renderer,
    ChangeDetectorRef
} from "@angular/core";
import {DomService} from "../../services/dom.service";
import {TreeScrollableTableNodeComponent} from "./tree-scrollable-table-node.component";
import {TreeDataService} from "./tree-data.service";
import {BaseScrollableTableComponent} from "./base-scrollable-table.component";


@Component({
    selector: 'tree-scrollable-table',
    template: `
        <!--<filter #filter *ngIf=(filter) (onFilterChange)="onFilterChange($event)" [disabled]="disabled"></filter>-->        

        <div class="css-table" #tabela [style.width]="tableProperties.widthWithoutScrollBar + 'px'" (window:resize)="onResize($event)" >
            <div class="css-thead">
                <template ngFor let-column [ngForOf]="columns" let-i="index">
                    <!--<div *ngIf="!column.hidden" (click)="sortByColumn(column)" class="css-td header-style]" [style.text-align]="column.alignHeader ? column.alignHeader : 'center'" [style.width]="(tableProperties.kolone[i].columnWidth) + 'px'" >-->
                    <div *ngIf="!column.hidden" class="css-td header-style]" 
                        [style.text-align]="column.alignHeader ? column.alignHeader : 'center'" 
                        [style.width]="(tableProperties.kolone[i].columnWidth) + 'px'" 
                        [style.max-width]="(tableProperties.kolone[i].columnWidth) + 'px'" 
                        >
                        {{column.header}}
                    </div>
                </template>
            </div>
        </div>
        <div class="css-table" #tabelaBody>
            <div #scrollableArea tabindex="0" (keyup)="onKeyUp($event)"  class="scrollable-area" [style.height]="tableProperties.height + 'px'" [style.width]="tableProperties.width + 'px'">
                <div class="css-tbody">
                    <tree-scrollable-table-node 
                        [tableProperties]="tableProperties" 
                        [data]="tableData" 
                        [columns]="columns" 
                        [selectedRowId]="selectedRow?.id"
                        [treeColumn]="treeColumn"
                        (onRowClicked)="rowClicked($event)">
                    </tree-scrollable-table-node>
                </div>
            </div>
        </div>
    `,
    styles: [
        '.header-style {vertical-align: middle; cursor: pointer; }',
        '.css-td { padding-left: 5px; overflow: hidden; text-overflow: clip;}',
        '.scrollable-area {overflow-y: scroll; border-radius: 4px;}',
        '.scrollable-area:focus {outline: none;}',
        '.css-table {table-layout: fixed}',
        '.css-thead { background-color: #61778a; }'
    ],
    directives: [
        //FilterComponent, 
        TreeScrollableTableNodeComponent
    ],
    providers: [
        DomService, 
        //ScrollTableKeyupService, 
        TreeDataService
    ]
})


export class TreeScrollableTableComponent extends BaseScrollableTableComponent implements AfterViewInit, OnInit {
    @Input() disabled: boolean = false;
    @Input() filter: boolean = true;
    @Input() columns;
    @Input() treeColumn: string;
    @Output() rowChanged: EventEmitter<any> = new EventEmitter();

    @ViewChild('tabela') tabela: ElementRef;
    @ViewChild('scrollableArea') scrollableArea: ElementRef;

    constructor(
        public renderer: Renderer,
        public dom: DomService,
        public changeDetectionRef: ChangeDetectorRef,
        //public keyupService: ScrollTableKeyupService,
        public treeDataService: TreeDataService)
    { 
        super(renderer, dom, changeDetectionRef);
    }

    /**
     * API - pozivaju se iz parent komponente
     */
    public addRow(row: any) {
        this.treeDataService.addNode(this.tableData, row);
        this.treeDataService.expandNode(this.tableData, row)
        this.selectRow(row);
    }

    public editRow(row: any) {
        this.treeDataService.updateNode(this.tableData, row);
    }

    public deleteRow(row: any) {
        let sledeciNode = this.treeDataService.sledeciVidljiv(this.tableData, row);
        if (sledeciNode) {
            this.selectRow(sledeciNode);
        } else {
            let prethodniNode = this.treeDataService.sledeciVidljiv(this.tableData, row);
            if (prethodniNode) {
                this.selectRow(prethodniNode);
            }
        }
        this.treeDataService.removeNode(this.tableData, row);
    }
    /* API end */

    // Ne koristim sali da mi ostane u html-u
    protected onKeyUp(event) {}
}