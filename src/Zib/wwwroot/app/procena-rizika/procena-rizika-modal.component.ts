import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToasterService } from "angular2-toaster/angular2-toaster";

import { FormFieldComponent } from '../shared/components/field.component';

import { ModalComponent } from '../shared/components/modal/modal.component';
import { ButtonSaveComponent } from '../shared/components/buttons/button-save.component';
import { ButtonCancelComponent } from '../shared/components/buttons/button-cancel.component';
import { BootstrapFormDirective, BootstrapInputDirective } from '../shared/components/form-bootstrap.directives';
import { SELECT_DIRECTIVES } from '../shared/components/select/select';

@Component({
    moduleId: module.id,
    selector: '<procena-rizika-modal></procena-rizika-modal>',
    templateUrl: 'procena-rizika-modal.template.html',
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        SELECT_DIRECTIVES,
        ButtonSaveComponent, ButtonCancelComponent, FormFieldComponent,
        BootstrapFormDirective, BootstrapInputDirective
    ],
    styles: [
        'h2 {text-align: center;}',
        '.xmodal-dialog { width: 750px}',
        '.rizik { font-weight: bold; font-size: 20px;}'
    ]
})
export class ProcenaRizikaModalComponent extends ModalComponent implements OnInit {
    @Output() onSave: EventEmitter<any> = new EventEmitter();
    
    @ViewChild("modalRoot") protected modalRoot: ElementRef;

    closeOnOutsideClick = false;

    formGroup: FormGroup;
    isResetting = false;
    // formRow: any = {};
    naslov = '';
    procenaRizika: any = {};

    intenzitetPretnji = [];
    intenzitetRanjivosti = [];

    get rizikPrePrimeneMere(){       
        let rizik = undefined;
        if (this.formGroup.value.pretnjaPre && this.formGroup.value.ranjivostPre){
            let pretnjaPre = this.intenzitetPretnji.find(x => x.id === this.formGroup.value.pretnjaPre).vrednost;
            let ranjivostPre = this.intenzitetRanjivosti.find(x => x.id === this.formGroup.value.ranjivostPre).vrednost;
            rizik = pretnjaPre * ranjivostPre * this.formGroup.value.poslovnaVrednost;
        }        
        return rizik ? rizik : '';
    }

    get rizikPoslePrimeneMere(){
        let rizik = undefined;
        if (this.formGroup.value.pretnjaPosle && this.formGroup.value.ranjivostPosle){
            let pretnjaPosle = this.intenzitetPretnji.find(x => x.id === this.formGroup.value.pretnjaPosle).vrednost;
            let ranjivostPosle = this.intenzitetRanjivosti.find(x => x.id === this.formGroup.value.ranjivostPosle).vrednost;
            rizik = pretnjaPosle * ranjivostPosle * this.formGroup.value.poslovnaVrednost;
        }        
        return rizik ? rizik : '';
    }

    constructor(private formBuilder: FormBuilder, public toasterService: ToasterService, public changeDetectionRef: ChangeDetectorRef){
        super();
        this.buildForm();
    }

    ngOnInit() {}

    open(poruka: string= '', ...args: any[]) {
        this.resetForm();
        
        this.procenaRizika = args[0];

        this.naslov = '<h3>' + this.procenaRizika.vrsteVrednosti.naziv + ' (' +  this.procenaRizika.vrsteVrednosti.poslovnaVrednost.vrednost + ')' + '</h3><br />' + this.procenaRizika.pretnjaRanjivost.pretnjaRanjivost;
        this.intenzitetPretnji = this.procenaRizika.intenzitetPretnji;
        this.intenzitetRanjivosti = this.procenaRizika.intenzitetRanjivosti
        this.intenzitetZaSelect(this.intenzitetPretnji);
        this.intenzitetZaSelect(this.intenzitetRanjivosti);

        // this.formRow.prihvatljivaVrednostRizika = this.procenaRizika.prihvatljivaVrednostRizika;
        // this.formRow.pretnjaPre = this.procenaRizika.pretnjaRanjivost.pretnjaPre ? this.procenaRizika.pretnjaRanjivost.pretnjaPre.id : undefined;
        // this.formRow.ranjivostPre = this.procenaRizika.pretnjaRanjivost.ranjivostPre ? this.procenaRizika.pretnjaRanjivost.ranjivostPre.id : undefined;
        // this.formRow.pretnjaPosle = this.procenaRizika.pretnjaRanjivost.pretnjaPosle ? this.procenaRizika.pretnjaRanjivost.pretnjaPosle.id : undefined;
        // this.formRow.ranjivostPosle = this.procenaRizika.pretnjaRanjivost.ranjivostPosle ? this.procenaRizika.pretnjaRanjivost.ranjivostPosle.id : undefined;
        // this.formRow.poslovnaVrednost = this.procenaRizika.vrsteVrednosti.poslovnaVrednost.vrednost;
        
        this.formGroup.patchValue({
            prihvatljivaVrednostRizika: this.procenaRizika.prihvatljivaVrednostRizika,
            pretnjaPre: this.procenaRizika.pretnjaRanjivost.pretnjaPre ? this.procenaRizika.pretnjaRanjivost.pretnjaPre.id : undefined,
            ranjivostPre: this.procenaRizika.pretnjaRanjivost.ranjivostPre ? this.procenaRizika.pretnjaRanjivost.ranjivostPre.id : undefined,
            pretnjaPosle: this.procenaRizika.pretnjaRanjivost.pretnjaPosle ? this.procenaRizika.pretnjaRanjivost.pretnjaPosle.id : undefined,
            ranjivostPosle: this.procenaRizika.pretnjaRanjivost.ranjivostPosle ? this.procenaRizika.pretnjaRanjivost.ranjivostPosle.id : undefined,
            poslovnaVrednost: this.procenaRizika.vrsteVrednosti.poslovnaVrednost.vrednost
        });

        this.poruka = poruka;

//        this.resetForm();

        this.isOpened = true;
        this.onOpen.emit(args);
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
    }

    resetForm() {
        if (!this.formGroup) return;
        this.formGroup.reset();
        // this.formGroup.patchValue({});

        // this.buildForm();
        // this.isResetting = true;
        // setTimeout(() => this.isResetting = false, 0);
        // return false;
    }


    private intenzitetZaSelect(intenzitet: any[]){
        for(let i = 0; i < intenzitet.length; i++){
            intenzitet[i].text = intenzitet[i].vrednost + ' - ' + intenzitet[i].naziv
        }
    }

    buildForm() {
        this.formGroup = this.formBuilder.group({
            pretnjaPre: ['', Validators.required],
            ranjivostPre: ['', Validators.required],
            rizikPre: [],
            pretnjaPosle: ['', Validators.required],
            ranjivostPosle: ['', Validators.required],
            rizikPosle: [],
            poslovnaVrednost: []
        });
    }

    save() {
        debugger;
        if (this.isFormValid()){
            // debugger;
            // this.onSave.emit({procenaRizika: this.formRow});
            this.onSave.emit({procenaRizika: this.formGroup.value});
        }
    }

    private isFormValid(){
        if (!this.formGroup.valid) return false;

        let ret = true;
        if (this.formGroup.controls['pretnjaPre'].valid && this.formGroup.controls['pretnjaPosle'].valid){
            let pretnjaPreVrednost = this.vrednostIntenziteta(this.intenzitetPretnji, this.formGroup.controls['pretnjaPre'].value); 
            let pretnjaPosleVrednost = this.vrednostIntenziteta(this.intenzitetPretnji, this.formGroup.controls['pretnjaPosle'].value); 
            if ( pretnjaPosleVrednost > pretnjaPreVrednost ){
                this.formGroup.controls['pretnjaPosle'].setErrors({remote: 'Veća nego pretnja pre primene mere'});
                ret = false;
            }
        }

        if (this.formGroup.controls['ranjivostPre'].valid && this.formGroup.controls['ranjivostPosle'].valid){
            let ranjivostPreVrednost = this.vrednostIntenziteta(this.intenzitetRanjivosti, this.formGroup.controls['ranjivostPre'].value); 
            let ranjivostPosleVrednost = this.vrednostIntenziteta(this.intenzitetRanjivosti, this.formGroup.controls['ranjivostPosle'].value); 
            if ( ranjivostPosleVrednost > ranjivostPreVrednost ){
                this.formGroup.controls['ranjivostPosle'].setErrors({remote: 'Veća nego ranjivost pre primene mere'});
                ret = false;
            }
        }
        return ret;
    }

    private vrednostIntenziteta(intenzitet: any[], id: number): number {
        for(let i = 0; i < intenzitet.length; i++){
            if (intenzitet[i].id === id) return intenzitet[i].vrednost;
        }
        return 0;
    }
}