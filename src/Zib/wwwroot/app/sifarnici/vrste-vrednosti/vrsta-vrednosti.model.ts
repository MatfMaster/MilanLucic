export class VrstaVrednosti implements ITreeModel{
    id: number;
    naziv: string;
    opis: string;
    nadredjenaKategorija: number;
    poslovnaVrednostId : number;
    organizacionaCelinaId: number;
    children: any[];
}