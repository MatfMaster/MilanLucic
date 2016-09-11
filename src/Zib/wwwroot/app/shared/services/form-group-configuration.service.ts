import { Injectable } from '@angular/core';
import { ControlGroup, Control }  from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {FormFieldConfiguration, FormFieldValidation} from './form-field-configuration';

@Injectable()
export class FormGroupConfigurationService {
    url: string = 'Configuration/FormValidationConfiguration';

    constructor(private fb: FormBuilder, private http: Http) { }


    configureControlGroup(config: FormFieldConfiguration[]): FormGroup {
        let controlGroup = {};
        config.forEach(cfg => {
            let fieldValidators = [];
            if (cfg.validation.required) fieldValidators.push(Validators.required);
            if (cfg.validation.minLength > 0) fieldValidators.push(Validators.minLength(cfg.validation.minLength));
            if (cfg.validation.maxLength > 0) fieldValidators.push(Validators.maxLength(cfg.validation.maxLength));

            controlGroup[cfg.fieldName] = ['', Validators.compose(fieldValidators)];
        });

        return this.fb.group(controlGroup);
    }

    getFormConfiguration(formName: string) {
        return this.http.get(this.url + '/' + formName)
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    // configureForm(config: FormFieldConfiguration[]): ControlGroup {
    //     let controlGroup = {};
    //     //let config = response.data;

    //     config.forEach(cfg => {
    //         let fieldValidators = [];
    //         if (cfg.validation.required) fieldValidators.push(Validators.required);
    //         if (cfg.validation.minLength > 0) fieldValidators.push(Validators.minLength(cfg.validation.minLength));
    //         if (cfg.validation.maxLength > 0) fieldValidators.push(Validators.maxLength(cfg.validation.maxLength));

    //         controlGroup[cfg.fieldName] = ['', Validators.compose(fieldValidators)];
    //     });

    //     return this.fb.group(controlGroup);

    // }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}