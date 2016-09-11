import { Component, Input, ContentChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'checkbox',
    template: `
        <div class="form-group" [ngClass]="{'has-error':inputControl && inputControl.touched && inputControl.errors || inputControl?.errors?.remote}">
            <label for="for" [ngClass]="labelWidthClass" class="control-label">{{label}}</label>
            <div [ngClass]="fieldWidthClass">
                <ng-content ></ng-content>
                <div *ngIf="inputControl.touched && inputControl.errors  || inputControl?.errors?.remote">
                    <div *ngIf="inputControl?.errors?.remote" class="help-block text-danger">
                        {{inputControl?.errors?.remote}}
                    </div>
                </div>
            </div>
        </div>
    `
    
})
export class CheckboxComponent {
    @Input() label: string;
    @Input() labelWidthClass: string = 'col-md-3';
    @Input() fieldWidthClass: string = 'col-md-9' ;
    @Input() inputControl: FormControl;
    //@ContentChild(FormControl) inputControl;
  
}