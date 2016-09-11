import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'button-login',
    template: `
        <button class="btn btn-primary btn-sm" (click)="onClick($event)" [disabled]="disabled || submitPending">
            <i class="fa fa-sign-in"></i>
             Login
            <span *ngIf="submitPending" class="fa fa-refresh fa-spin"></span> 
        </button>`
})
export class ButtonLoginComponent implements OnInit {
    @Input() disabled = false;
    @Input() submitPending = false;
    @Output() login: EventEmitter<any> = new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    public onClick(event){
        event.preventDefault();
        this.login.emit({});
    }
}