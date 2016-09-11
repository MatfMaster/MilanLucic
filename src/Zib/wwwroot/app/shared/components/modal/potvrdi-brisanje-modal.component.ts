import { Component } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ButtonDeleteComponent } from '../buttons/button-delete.component';
import { ButtonCancelComponent } from '../buttons/button-cancel.component';

@Component({
    selector: 'potvrdi-brisanje-modal',
    template: `
        <div class="modal" tabindex="-1" role="dialog"
            #modalRoot
            (keydown.esc)="close()"
            [ngClass]="{ in: isOpened, fade: isOpened }"
            [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
            (click)="closeOnOutsideClick ? close() : 0">
            <div [class]="'modal-dialog ' + modalClass" (click)="preventClosing($event)">
                <div class="modal-content" tabindex="0" *ngIf="isOpened">
                    <div class="modal-header">
                        <button *ngIf="!hideCloseButton" type="button" class="close" data-dismiss="modal" [attr.aria-label]="cancelButtonLabel || 'Close'" (click)="close()"><span aria-hidden="true">&times;</span></button>
                        <h2>Upozorenje</h2>
                    </div>
                    <div class="modal-body">
                        Potvrdite brisanje podataka
                        <div><strong>{{ poruka }}</strong></div>
                    </div>
                    <div class="modal-footer">
                        <button-delete (delete)="onSubmit.emit(undefined)" ></button-delete>
                        <button-cancel (cancel)="close()"></button-cancel>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
    directives: [ButtonDeleteComponent, ButtonCancelComponent]
})

export class PotvrdiBrisanjeModalComponent extends ModalComponent {

}