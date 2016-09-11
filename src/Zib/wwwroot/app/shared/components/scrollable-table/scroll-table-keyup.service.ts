import { Injectable } from '@angular/core';

@Injectable()
export class ScrollTableKeyupService {

    constructor() { }

    keyup(key, scrollableAreaHeight, visinaReda, indeksSelektovanogReda, brojRedovaUTabeli): KeyupResult{
//        let scrollHeight = scrollableArea.scrollHeight;
//        let visinaVidljivogScrola = scrollableArea.offsetHeight;
//        let scrollTop = scrollableArea.scrollTop;
        let brojRedovaPoStrani = Math.floor(scrollableAreaHeight / visinaReda);

        let redZaSelektovanje: number;
        let scrollToPosition: number;

        switch (key) {

            case 'ArrowDown':
                redZaSelektovanje = indeksSelektovanogReda < brojRedovaUTabeli - 1 ?
                    indeksSelektovanogReda + 1 :
                    brojRedovaUTabeli - 1;

                // Dodao sam 1 da mi ne prelomi poslednji red, nego da scroluje na pretposlednji
                if ((redZaSelektovanje + 1) < brojRedovaPoStrani) {
                    scrollToPosition = 0;
                } else {
                    scrollToPosition = redZaSelektovanje * visinaReda;
                }
                break;

            case 'ArrowUp':
                redZaSelektovanje = indeksSelektovanogReda > 0 ? indeksSelektovanogReda - 1 : 0;
                if ((redZaSelektovanje + 1) < brojRedovaPoStrani) {
                    scrollToPosition = 0;
                } else {
                    scrollToPosition = redZaSelektovanje * visinaReda;
                }
                break;

            case 'PageDown':
                redZaSelektovanje = indeksSelektovanogReda + brojRedovaPoStrani < brojRedovaUTabeli ?
                    indeksSelektovanogReda + brojRedovaPoStrani :
                    brojRedovaUTabeli - 1;

                scrollToPosition = redZaSelektovanje * visinaReda;
                break;

            case 'PageUp':
                redZaSelektovanje = indeksSelektovanogReda - brojRedovaPoStrani < 0 ?
                    0 :
                    indeksSelektovanogReda - brojRedovaPoStrani;

                scrollToPosition = redZaSelektovanje * visinaReda;
                break;

            case 'Home':
                if (brojRedovaUTabeli > 0) {
                    redZaSelektovanje = 0;
                    scrollToPosition = 0;
                }
                break;
            case 'End':
                if (brojRedovaUTabeli > 0) {
                    redZaSelektovanje = brojRedovaUTabeli - 1;
                    scrollToPosition = redZaSelektovanje * visinaReda;
                }
                break;
            default:
                return undefined;
        }

        return new KeyupResult(redZaSelektovanje, scrollToPosition);
    }
}

export class KeyupResult{
    public redZaSelektovanje: number;
    public scrollToPosition: number;

    constructor(redZaSelektovanje, scrollToPosition) {
        this.redZaSelektovanje = redZaSelektovanje;
        this.scrollToPosition = scrollToPosition;
    }
}
