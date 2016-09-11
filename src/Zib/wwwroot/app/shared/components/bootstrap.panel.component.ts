import {Component} from '@angular/core';

@Component({
    selector: 'bs-panel',
    template: `
		<div class="panel panel-primary panel-bottom-margin0">
			<div class="panel-heading">
				<ng-content select=".heading"></ng-content>
            </div>
            <div class="panel-body">
		        <ng-content select=".body"></ng-content>
            </div>		
        </div>
    `
})
export class BootstrapPanelComponent { }
