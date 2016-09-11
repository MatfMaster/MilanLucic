import {Component,Input,OnInit,Query,QueryList,ElementRef,ContentChild} from '@angular/core';
import { FormControl } from '@angular/forms';
//import {NgClass,Control,NgFormControl} from '@angular/common';

@Component({
    selector: 'field-select',
    template: `
        <div class="form-group" [ngClass]="{'has-error':inputControl && inputControl.touched && inputControl.errors || inputControl?.errors?.remote}">
            <label for="for" class="col-md-3 control-label">{{label}}</label>
            <div class="col-md-9">
                <ng-content ></ng-content>

                <div *ngIf="inputControl && inputControl.touched && inputControl.errors || inputControl?.errors?.remote">
                    <div *ngIf="inputControl.errors.required" class="help-block text-danger">
                        Polje je obavezno
                    </div>
                    <div *ngIf="inputControl?.errors?.remote" class="help-block text-danger">
                        {{inputControl?.errors?.remote}}
                    </div>
                </div>
            </div>
        </div>        
    `
})
export class SelectFieldComponent {
    @Input() key: string;
    @Input() value: string;
    @Input() options: any [];
    @Input() selected: any;
    @Input() label: string;

    @Input() inputControl: FormControl;

    selektovan(){
        console.log(this.selected);
        this.selected ? this.selected.id : '';
    }
}

        // <select class="form-control">
        //     <template ngFor #opt  [ngForOf]="options">
        //         <option  [ngValue]="opt.id" >{{ opt.text }}</option>
        //     </template>
        // </select>
