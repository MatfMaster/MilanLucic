import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'button-delete',
    //template: '<button class="btn btn-success btn-sm" ng-click="vm.add(form)" ng-disabled="vm.adding || form.$dirty"><i class="fa fa-file-o"></i> Dodaj</button>'
    template: '<button class="btn btn-danger btn-sm" (click)="onClick($event)" [disabled]="disabled" ><i class="fa fa-trash"></i> Obriši</button>'
})
export class ButtonDeleteComponent implements OnInit {
    @Input() disabled = false;
    @Output() delete: EventEmitter<any> = new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    public onClick(event){
        event.preventDefault();
        this.delete.emit({});
    }

}