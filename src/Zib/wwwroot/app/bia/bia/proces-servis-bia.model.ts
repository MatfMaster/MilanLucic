export class ProcesServisBia implements IModel{
    id: number;
    naziv: string;
    kritican: boolean;
    mogucnostRucnogObavljanja: boolean;
    finansijskiGubitak: boolean;
    finansijskiGubitakIznos: number;
    reputacioniGubitak: boolean;
    reputacioniGubitakIznos: number;
    zakonskaObaveza: boolean;
    zakonskaObavezaIznos: number;
    ugovornaObaveza: boolean;
    ugovornaObavezaIznos: number;
    neiskoriscenaPrilika: boolean;
    neiskoriscenaPrilikaIznos: number;
    rto: number;
    rpo: number;
    ciljaniNivoOporavka: string; 
}