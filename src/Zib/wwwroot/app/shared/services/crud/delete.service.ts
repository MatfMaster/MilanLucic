import { Injectable } from '@angular/core';

import { PotvrdiBrisanjeModalComponent } from  '../../components/modal/potvrdi-brisanje-modal.component';

@Injectable()
export class DeleteService {

    constructor() { }

    public potvrdiBrisanje(potvrdiBrisanjeModal: PotvrdiBrisanjeModalComponent, poruka: string) {
        potvrdiBrisanjeModal.open(poruka);
    }

    public potvrdjenoBrisanje() {

    }
}