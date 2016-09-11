import { Component, Input } from '@angular/core';

@Component({
  selector: 'server-error',
  template: `
      <div *ngIf="error" class="form-group form-group-md">
        <div class="alert alert-danger alert-dismissible col-md-12 col-sm-12" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          {{error}}
        </div>
      </div>
  `
})
export class ServerErrorComponent {
  @Input() error:string;
}