import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'button-add',
    //template: '<button class="btn btn-success btn-sm" ng-click="vm.add(form)" ng-disabled="vm.adding || form.$dirty"><i class="fa fa-file-o"></i> Dodaj</button>'
    template: '<button class="btn btn-primary btn-sm" (click)="onClick($event)" [disabled]="disabled"><i class="fa fa-file-o"></i> Dodaj</button>'
})
export class ButtonAddComponent implements OnInit {
    @Input() disabled = false;
    @Output() add: EventEmitter<any> = new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    public onClick(event){
        event.preventDefault();
        this.add.emit({});
    }
}