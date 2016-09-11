import { Component, Input, ContentChild } from '@angular/core';

import { FormControl } from '@angular/forms';
//import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'field',
  template: `
    <div class="form-group" [ngClass]="{'has-error':inputControl && inputControl.touched && inputControl.errors || inputControl?.errors?.remote}">
      <label for="for" [ngClass]="labelWidthClass" class="control-label">{{label}}</label>
      <div [ngClass]="fieldWidthClass">
        <ng-content ></ng-content>

        <div *ngIf="(inputControl.touched && inputControl.errors && !inputControl.pristine )|| inputControl?.errors?.remote">
          <div *ngIf="inputControl.errors.required" class="help-block text-danger">
            Polje je obavezno
          </div>
          <div *ngIf="inputControl.errors.minlength" class="help-block text-danger">
            Minimalna duzina je XXX
          </div>
          <div *ngIf="inputControl.errors.maxlength" class="help-block text-danger">
            Maksimalna duzina je XXX
          </div>
          <div *ngIf="inputControl?.errors?.remote" class="help-block text-danger">
              {{inputControl?.errors?.remote}}
          </div>
          <div *ngIf="inputControl?.errors?.custom" class="help-block text-danger">
              {{inputControl?.errors?.custom}}
          </div>
        </div>

      </div>
    </div>
  `,  
  styles: ['.new-line {white-space:pre-line;}']
})

export class FormFieldComponent{
  @Input() label: string;
  @Input() labelWidthClass: string = 'col-md-3';
  @Input() fieldWidthClass: string = 'col-md-9' ;
  @Input() inputControl: FormControl;

  //@ContentChild(inputControl) inputControl;
}

