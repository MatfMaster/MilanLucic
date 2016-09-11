import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'button-save',
    template: `
        <button type="submit" class="btn btn-primary btn-sm" [disabled]="disabled || submitPending">
            <i class="fa fa-save"></i>
             Snimi
            <span *ngIf="submitPending" class="fa fa-refresh fa-spin"></span> 
        </button>`
})
export class ButtonSaveComponent implements OnInit {
    @Input() disabled = false;
    @Input() submitPending = false;
    @Output() save: EventEmitter<any> = new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    public onClick(event){
        debugger;
        event.preventDefault();
        this.save.emit({});
    }
}

//<button type="submit" class="btn btn-primary btn-sm" (click)="onClick($event)" [disabled]="disabled || submitPending">