import { Injectable } from '@angular/core';


@Injectable()
export class DomService {
    public PROSTOR_ISPOD_PANELA = 20;  // prostor koji ostavljam ispod panela
    public PROSTOR_IZMEDJU_REDOVA = 20;  // prostor koji ostavljam ispod panela

    constructor() { }

    windowHeight() : number{
        return window.innerHeight;
    }

    navbarHeight() : number{
        let navbar = document.getElementsByClassName('navbar')[0];
        return navbar ? this.getAbsoluteHeight(navbar) : 0; 
    }

    korisnaVisnaEkrana() : number{
        return this.windowHeight() - this.navbarHeight();
    }

    // IE11+
    findAncestorWithClassName(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    getSiblings(el, filter) {
        var siblings = [];
        el = el.parentNode.firstChild;
        do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
        return siblings;
    }

    getAbsoluteHeight(el) : number {
        // Get the DOM Node if you pass in a string
        el = (typeof el === 'string') ? document.querySelector(el) : el;

        var styles = window.getComputedStyle(el);
        var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

        return Math.ceil(el.offsetHeight + margin);
    }

    // Visina panel headera, filtera (ako ga ima) i hedera tabele
    panelWithTableHeight(el, height: number = 0): number{
        let panelHeadingHeight = 0;
        let tableHeaderHeight = 0;
        let filterHeight = 0;
        let panel = this.findAncestorWithClassName(el, 'panel');

        if (!height) height = this.korisnaVisnaEkrana();
        
        let panelHeading = panel.getElementsByClassName('panel-heading')[0];
        if (panelHeading) panelHeadingHeight = this.getAbsoluteHeight(panelHeading);
        
        let tableHeader = panel.getElementsByClassName('css-thead')[0];
        if (tableHeader) tableHeaderHeight = this.getAbsoluteHeight(tableHeader);
        let filter = panel.getElementsByClassName('filter-with-grid')[0];
        if (filter) filterHeight = this.getAbsoluteHeight(tableHeader);

        // return height - panelHeadingHeight - tableHeaderHeight - filterHeight - this.PROSTOR_ISPOD_PANELA;
        return panelHeadingHeight + tableHeaderHeight + filterHeight; // + this.PROSTOR_ISPOD_PANELA;

    }

    tableInPanelHeight(tableEl, zeljenaVisinaPanela: number) : number {
        return zeljenaVisinaPanela - this.panelWithTableHeight(tableEl);
    }

    formInPanelHeight(formEl): number {
        let panel = this.findAncestorWithClassName(formEl, 'panel');
        return this.getAbsoluteHeight(panel);
    }

    scrollBarWidth(): number {
        var outer = document.createElement("div");
        //outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    /**
     * Za tabelu preko div elemenata izracunava sirine kolona
     */
    divTableProperties(tabela, columns, height) {
        if (columns.length < 1) return;

        let sirinaScrollBara = this.scrollBarWidth();
        let tableProperties = new TableProperties();
        let indexPoslednjeVidljiveKolone: number = -1;

        // U ovom trenutku imam samo header tabele. PRETPOSTAVLJAM da je ista visina headera i redova, 
        // pa tako dimenzionisem tabelu da stane tacan broj redova bez preloma

        let visinaHedera = tabela.getElementsByClassName('css-td')[0].offsetHeight;
        let visinaTabele = (document.documentElement.clientHeight - 250);
        let brojPotpunoVidljivihRedova = Math.floor(visinaTabele / visinaHedera);

        tableProperties.rowHeight = visinaHedera;
        tableProperties.height = height ? height : brojPotpunoVidljivihRedova * visinaHedera;

        // Prvi parentElement je <scrollable-arrea>, a sledeci je panel u kojem se nalazi tabela

        // debugger;
        let panel = this.findAncestorWithClassName(tabela, 'panel');
        tableProperties.width = panel.offsetWidth; // tabela.parentElement.parentElement.offsetWidth;

        // Mozda jednog dana saznam zasto
        if (tableProperties.width === 0) tableProperties.width = tabela.parentElement.offsetWidth;

        tableProperties.widthWithoutScrollBar = tableProperties.width - sirinaScrollBara;
        // tableProperties.widthWithoutScrollBar = tabela.parentElement.parentElement.offsetWidth - sirinaScrollBara;

        // Kopiram zadate sirine kolona - za hidden kolone i gde sirina nije zadata inicijalizum sirinu na 0
        let sirineKolona = 0;
        let brojVidljivihKolona = 0;
        let brojKolonaBezZadateSirine = 0;

        tableProperties.kolone = [];
        for (let i = 0; i < columns.length; i++) {
            indexPoslednjeVidljiveKolone = columns[i].hidden ? indexPoslednjeVidljiveKolone : i;
            let sirinaKolone: number = columns[i].hidden ? 0 : (columns[i].width ? columns[i].width : 0);
            let hidden: boolean = columns[i].hidden ? true : false;

            tableProperties.kolone[i] = new Kolona(sirinaKolone, hidden);
            tableProperties.kolone[i].columnWidth = sirinaKolone;
            tableProperties.kolone[i].hidden = hidden;

            sirineKolona += sirinaKolone;
            brojVidljivihKolona += hidden ? 0 : 1;
            brojKolonaBezZadateSirine += hidden ? 0 : (tableProperties.kolone[i].columnWidth ? 0 : 1);
        }

        if (indexPoslednjeVidljiveKolone === -1) console.error("Nema vidljive kolone!");

        if (brojKolonaBezZadateSirine > 0) {
            //            let prostorZaKoloneBezZadateSirine = tableProperties.width - sirineKolona - 12;
            let prostorZaKoloneBezZadateSirine = 100.0 - sirineKolona;
            // Kolone bez zadate seirine dele podjednako preostali prostor
            let sirinaKolonaBezZadateSirine = Math.floor(prostorZaKoloneBezZadateSirine / brojKolonaBezZadateSirine);
            // Ako postoji ostatak deljenja dodajem ga najsiroj koloni
            let ostatak = prostorZaKoloneBezZadateSirine - (brojKolonaBezZadateSirine * sirinaKolonaBezZadateSirine);

            // Popunjavam sirinu za kolone koje nisu imale zadatu sirinu 
            for (let i = 0; i < tableProperties.kolone.length; i++) {
                // Ako je kolona vidljiva i nema zadatu sirinu
                if (!tableProperties.kolone[i].hidden && !tableProperties.kolone[i].columnWidth) {
                    tableProperties.kolone[i].columnWidth = sirinaKolonaBezZadateSirine;
                }
            }

            // Ako postoji ostatak dodajem ga najsiroj koloni
            if (ostatak > 0) {
                var najsiraKolona = 0;
                var najsiraKolonaIndex = 0;
                for (let i = 0; i < tableProperties.kolone.length; i++) {
                    if (tableProperties.kolone[i].columnWidth > najsiraKolona) {
                        najsiraKolona = tableProperties.kolone[i].columnWidth;
                        najsiraKolonaIndex = i;
                    }
                }

                tableProperties.kolone[najsiraKolonaIndex].columnWidth += ostatak;
            }
        }

        /**
         * Posto se na sirinu kolone (box model) dodaje padding i border, oduzimam 1 za desni border svake kolone
         * jer mi je border 1. Ako se promene padding ili border treba preracunati ili iskodirati da automatski uzima u obzir  
         */
        // for (let i = 0; i < columns.length; i++) {
        //     tableProperties.kolone[i].columnWidth -= 1;
        // }

        //tableProperties.widthWithoutScrollBar = tableProperties.widthWithoutScrollBar / tableProperties.width * 100.0;
        for (let i = 0; i < tableProperties.kolone.length; i++) {
            tableProperties.kolone[i].columnWidth = tableProperties.kolone[i].columnWidth * tableProperties.widthWithoutScrollBar / 100.0
        }


        return tableProperties;
    }
}

export class TableProperties {
    rowHeight: number;
    width: number;
    widthWithoutScrollBar: number;
    height: number;
    kolone: Kolona[];
    //data: any[];

    constructor() {
        this.rowHeight = 0;
        this.width = 0;
        this.height = 0;
        this.kolone = [];
        //this.data = [];
    }
}

export class Kolona {
    columnWidth: number
    hidden: boolean;

    constructor(columnWidth = 0, hidden = false) {
        this.columnWidth = columnWidth;
        this.hidden = hidden;
    }
}