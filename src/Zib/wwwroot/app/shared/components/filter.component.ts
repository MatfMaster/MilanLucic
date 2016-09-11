import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { InputDebounceComponent } from './input-debounce.component';

@Component({
    selector: '<filter></filter>',
    template: `
        <div class="input-group filter-with-grid">
            <span class="input-group-addon">
                <i class="fa fa-filter"></i>
            </span>
            <input-debounce [text]="filterText" placeholder="filter" delay="300" (value)="filterChanged($event)" [disabled]="disabled" (keydown)="keyDown($event)"></input-debounce>
            <span class="input-group-addon btn btn-default" (click)="clearFilter()" [style.disabled]="filterText.length === 0 || disabled">
                <i class="fa fa-times"></i>
            </span>
        </div>
    `,
    directives: [InputDebounceComponent]
})

export class FilterComponent implements OnInit {
    
    @Input() disabled: boolean = false;
    @Output() onFilterChange: EventEmitter<any> = new EventEmitter();
    
    @ViewChild(InputDebounceComponent) inputDebounce:InputDebounceComponent;
     
    filterText = "";
    
    
    constructor() { }

    ngOnInit() { }

    /** API
     * 
     */
    public setFocus(){
        this.inputDebounce.setFocus();
    }

    /**
     * Privatne metode
     */

    keyDown($event){
        // ESC
        if ($event.keyCode === 27) this.clearFilter();
    }

    private filterChanged(filterText){
        this.onFilterChange.emit({ filterText: filterText});
    }
    
    public clearFilter(){
        this.filterText = '';
        this.inputDebounce.inputValue = this.filterText;
        this.filterChanged(this.filterText);
    }
}