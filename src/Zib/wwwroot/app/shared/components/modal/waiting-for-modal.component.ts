import { Component } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'waiting-for-modal',
    template: `
        <div class="modal" tabindex="-1" role="dialog"
            #modalRoot
            [ngClass]="{ in: isOpened, fade: isOpened }"
            [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
            >
            <div [class]="'modal-dialog ' + modalClass" (click)="preventClosing($event)">
                <div class="modal-content" tabindex="0" *ngIf="isOpened">
                    <div class="modal-header">
                        Snimanje u toku ...
                    </div>
                    <div class="modal-body">
                        <div class="progress">
                            <div class="progress progress-striped active" style="margin-bottom:0;">
                                <div class="progress-bar" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: []
})

export class WaitingForModalComponent extends ModalComponent {

}

