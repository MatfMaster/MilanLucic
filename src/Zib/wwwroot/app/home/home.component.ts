import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BootstrapPanelComponent } from '../shared/components/bootstrap.panel.component';
import { FormFieldComponent } from '../shared/components/field.component';
import { ButtonLoginComponent } from '../shared/components/buttons/button-login.component';
import { BootstrapInputDirective, BootstrapFormDirective } from '../shared/components/form-bootstrap.directives';

@Component({
    selector: '<home></home>',
    templateUrl: 'home/login',
    styles: ['bs-panel { padding-top: 200px}'],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        BootstrapPanelComponent,
        FormFieldComponent,
        BootstrapInputDirective,
        BootstrapFormDirective,
        ButtonLoginComponent
        ],
})

export class HomeComponent implements OnInit{
    form: FormGroup;

    ngOnInit(){
        this.form = new FormGroup({
            userName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    onLogin(){
        //debugger;
        console.log(this.form.value);
    }

    isFormValid(){
        return this.form.valid;
    }
}

// import { Component, OnInit } from '@angular/core';
// import { ControlGroup, Control }  from '@angular/common';

// import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


// import {BootstrapPanelComponent} from '../shared/components/bootstrap.panel.component';

// import {Login} from './login';
// import {FormFieldConfiguration, FormFieldValidation} from '../shared/services/form-field-configuration';
// import {FormGroupConfigurationService} from '../shared/services/form-group-configuration.service';

// import { GlobalService} from '../global.service';

// @Component({
//    selector: '<home></home>',
//    templateUrl: 'home/login',
//    styles: ['bs-panel { padding-top: 200px}'],
//    directives: [BootstrapPanelComponent, REACTIVE_FORM_DIRECTIVES],
//    providers: [FormGroupConfigurationService]
// })

// export class HomeComponent implements OnInit {
//    metadataLoaded = false;
//    formName = 'login';
//    formControlGroup: FormGroup;
//    submitted: boolean = false;
//    formConfiguration: FormFieldConfiguration[] = [];

//    constructor(private fb: FormBuilder, private formGroupConfiguration: FormGroupConfigurationService, private _global: GlobalService) { }

//    ngOnInit() {

//        this.formGroupConfiguration.getFormConfiguration(this.formName)
//            .subscribe(
//            res => {
//                const config = res.data;
//                if (config === undefined || config.length < 1) {
//                    alert('Nije nadjena konfiguracija za formu: ' + this.formName);
//                } else {
//                    this.formControlGroup = this.formGroupConfiguration.configureControlGroup(config);
//                    this.metadataLoaded = true;
//                }
//                },
//            this.displayErrors);

//        //this.formControlGroup = this.fb.group({
//        //    userName: [this.model.userName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
//        //    password: [this.model.password, Validators.required]
//        //});
//    }

//    onSubmit(form) {
//        console.log(form);
//        this._global.isLoged = true;
//    }


//    configureFormValidation(response) {
//        let controlGroup = {};
//        let config = response.data;

//        console.log('configureFormValidation - start');
//        //let x = this.formGroupConfiguration.configureForm(config);
//        //console.log(x);
//        //this.formControlGroup = x;
//        console.log('configureFormValidation - end');
//        //config.forEach(cfg => {
//        //    console.log(cfg);
//        //    let fieldValidators = [];
//        //    if (cfg.validation.required) fieldValidators.push(Validators.required);
//        //    if (cfg.validation.minLength > 0) fieldValidators.push(Validators.minLength(cfg.validation.minLength));
//        //    if (cfg.validation.maxLength > 0) fieldValidators.push(Validators.maxLength(cfg.validation.maxLength));

//        //    controlGroup[cfg.fieldName] = ['', Validators.compose(fieldValidators)];
//        //});

//        //this.formControlGroup = this.fb.group(controlGroup);
//    }

//    displayErrors(errors) {
//        console.error(errors);
//    }
// }