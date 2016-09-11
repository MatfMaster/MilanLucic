export class FormFieldConfiguration {
    fieldName: string
    validation: FormFieldValidation

    constructor() {
        this.validation = new FormFieldValidation();
    }
}

export class FormFieldValidation {
    required: boolean;
    minLength: number;
    maxLength: number

    constructor() {
        this.required = false;
        this.minLength = 0;
        this.maxLength = 0;
    }
}