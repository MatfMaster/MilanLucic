import {VrstaPretnje} from '../vrstePretnji/vrstaPretnje';

export class Pretnja{
    id: number;
    naziv: string;
    poverljivost: boolean;
    integritet: boolean;
    raspolozivost: boolean;
    vrstaPretnjeId: number;
    vrstaPretnje: VrstaPretnje;
    //test: number[];  Multiselect
}