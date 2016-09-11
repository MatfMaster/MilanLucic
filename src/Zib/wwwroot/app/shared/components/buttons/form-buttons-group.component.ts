import {Component, Input, Output, EventEmitter} from '@angular/core';

import { ButtonSaveComponent } from './button-save.component';
import { ButtonCancelComponent } from './button-cancel.component';

@Component({
    selector: 'form-buttons-group',
    template: `
    <div class="form-group">
        <div class="col-md-offset-3 col-md-9">
            <button-save [submitPending]="submitPending" (save)="snimi()" [disabled]="saveDisabled"></button-save>
            <button-cancel (cancel)="onCancel()" [disabled]="cancelDisabled" ></button-cancel>        
        </div>
    </div>`,
    directives: [ButtonSaveComponent, ButtonCancelComponent]

})
export class FormButtonsGroupComponentComponent { 
    @Input() submitPending = false;
    @Input() saveDisabled = false;
    @Input() cancelDisabled = false;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    public snimi(){
        this.save.emit({});
    }
    public onCancel(){
        this.cancel.emit({});
    }

}