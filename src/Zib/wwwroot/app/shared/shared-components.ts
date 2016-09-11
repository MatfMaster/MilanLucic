import {SELECT_DIRECTIVES} from "./components/select/select";

// import {TreeTableFormCrudBaseComponent} from "./components/tree-table-form-crud-base.component";
import {ServerErrorComponent} from "./components/server-error.component";
import {TreeScrollableTableComponent} from "./components/scrollable-table/tree-scrollable-table.component";
import {BootstrapPanelComponent} from "./components/bootstrap.panel.component";
import {ButtonAddComponent} from "./components/buttons/button-add.component";
import {ButtonDeleteComponent} from "./components/buttons/button-delete.component";
import {ButtonSaveComponent} from "./components/buttons/button-save.component";
import {ButtonCancelComponent} from "./components/buttons/button-cancel.component";
import {FormFieldComponent} from "./components/field.component";
import {BootstrapFormDirective, BootstrapInputDirective} from "./components/form-bootstrap.directives";
import {FormButtonsGroupComponentComponent} from "./components/buttons/form-buttons-group.component";
import {CheckboxComponent} from "./components/checkbox.component";
import {SelectFieldComponent} from "./components/field-select.component";
// import {PotvrdiBrisanjeModalComponent} from "./components/modal/potvrdi-brisanje-modal.component";
import { TAB_DIRECTIVES } from './components/tabs/tabs';
import { TabsetComponent } from './components/tabs/tabset.component';

export const SHARED_COMPONENTS:Array<any> = [
    SELECT_DIRECTIVES,
    TAB_DIRECTIVES,
    TabsetComponent,
//    TreeTableFormCrudBaseComponent,
    ServerErrorComponent,
    TreeScrollableTableComponent,
    BootstrapPanelComponent,
    ButtonAddComponent,
    ButtonDeleteComponent,
    ButtonSaveComponent,
    ButtonCancelComponent,
    FormFieldComponent,
    BootstrapFormDirective,
    FormButtonsGroupComponentComponent,
    CheckboxComponent,
    SelectFieldComponent
    // PotvrdiBrisanjeModalComponent
];

