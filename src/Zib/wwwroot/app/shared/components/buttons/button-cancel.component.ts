import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'button-cancel',
    template: '<button class="btn btn-warning btn-sm" (click)="onClick($event)" [disabled]="disabled"><i class="fa fa-undo"></i> Odustani</button>'
})
export class ButtonCancelComponent implements OnInit {
    @Input() disabled = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    public onClick(event){
        event.preventDefault();
        this.cancel.emit({});
    }
}    
