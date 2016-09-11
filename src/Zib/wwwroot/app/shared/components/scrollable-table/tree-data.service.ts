import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class TreeDataService {

    /** 
     * TreeScrollableTableComponent API
     */
    expandAll(treeData: any[]) {
        treeData.forEach(element => {
            element.expanded = true;
            if (element.children.length > 0) {
                this.expandAll(element.children);
            }
        });
    }

    colapseAll(treeData: any[]) {
        treeData.forEach(element => {
            element.expanded = false;
            if (element.children.length > 0) {
                this.colapseAll(element.children);
            }
        });
    }


    expandNodeById(treeData: any[], id: number): boolean {
        let node = this.findNodeById(treeData, id);
        return this.expandNode(treeData, node);
    }

    expandNode(treeData: any[], node: any): boolean {
        if (!node) return false;

        node.expanded = true;
        let parentNode = this.findNodeById(treeData, node.nadredjenaKategorija);
        while (parentNode && parentNode.nadredjenaKategorija) {
            let prethodniNod = this.findNodeById(treeData, parentNode.id);
            if (prethodniNod) {
                prethodniNod.expanded = true;
            }
            parentNode = this.findNodeById(treeData, prethodniNod.nadredjenaKategorija);
        }
        return true;
    }

    findNodeById(treeData: any[], id: number): any {

        for (var i = 0; i < treeData.length; i++) {
            var element = treeData[i];
            //console.log(element.id);
            if (element.id === id) {
                element.expanded = true;
                //console.log('Nadjen: ' + element.id);
                return element;
            } else if (element.children.length > 0) {
                let el = this.findNodeById(element.children, id);
                if (el) {
                    return el;
                }
            }
        }
        return null;
    }

    // expandSingleNode(treeData: any[], id: number): boolean {

    //     for (var i = 0; i < treeData.length; i++) {
    //         var element = treeData[i];
    //         //console.log(element.id);
    //         if (element.id === id) {
    //             element.expanded = true;
    //             //console.log('Nadjen: ' + element.id);
    //             return true;
    //         } else if (element.children.length > 0) {
    //             if (this.expandSingleNode(element.children, id)) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }

    updateNode(treeData: any[], node: any): boolean {
        let postojeciNod = this.findNodeById(treeData, node.id);

        if (!postojeciNod) {
            console.log('Nema noda sa id=' + node.id);
            return false;
        }
        if (postojeciNod.id === node.id && postojeciNod.nadredjenaKategorija === node.nadredjenaKategorija) {
            this.updateNodeBezPromeneNadredjenog(treeData, node);
        } else {
            this.removeNode(treeData, node);
                // Zadrzavam postojece children i expanded propertije
                node.children = postojeciNod.children;   
                node.expanded = postojeciNod.expanded;
            this.addNode(treeData, node);
        }
        return true;
    }

    updateNodeBezPromeneNadredjenog(treeData: any[], node: any): boolean {
        for (var i = 0; i < treeData.length; i++) {
            if (treeData[i].id === node.id && treeData[i].nadredjenaKategorija === node.nadredjenaKategorija) {
                // Zadrzavam postojece children, expanded i nivo propertije
                node.children = treeData[i].children;   
                node.expanded = treeData[i].expanded;
                node.nivo = treeData[i].nivo;
                   
                treeData[i] = node;
                return true;
            } else if (treeData[i].children.length > 0) {
                if (this.updateNodeBezPromeneNadredjenog(treeData[i].children, node)) {
                    return true;
                }
            }
        }
        return false;
    }

    removeNode(treeData: any[], node: any): boolean {
        for (var i = 0; i < treeData.length; i++) {
            if (treeData[i].id === node.id) {
                treeData.splice(i, 1);
                return true;
            } else if (treeData[i].children.length > 0) {
                if (this.removeNode(treeData[i].children, node)) {
                    return true;
                }
            }
        }
        return false;
    }

    addNode(treeData: any[], node: any): boolean {
        // Ako je ispod ruta tj. nadredjenaKategorija = 0
        if (node.nadredjenaKategorija === 0){
            node.expanded = false;
            node.nivo = 0;
            node.childern = [];
            treeData.push(node);
            return;
        }

        for (var i = 0; i < treeData.length; i++) {
            if (treeData[i].id === node.nadredjenaKategorija) {
                node.nivo = treeData[i].nivo + 1;
                node.expanded = false;
                node.children = [];
                treeData[i].children.push(node);
                return true;
            } else if (treeData[i].children.length > 0) {
                if (this.addNode(treeData[i].children, node)) {
                    return true;
                }
            }
        }
        return false;
    }

    prethodniVidljiv(treeData: any[], node: any): any {
        let vidljiviNodovi: any[] = [];
        this.vidljiviNodovi(treeData, vidljiviNodovi);

        let indexNoda = _.findIndex(vidljiviNodovi, function(vn){ return vn.id == node.id;})
        if (indexNoda > 0 && vidljiviNodovi.length >= indexNoda){
            return vidljiviNodovi[indexNoda - 1];
        }
        return null;
    }

    sledeciVidljiv(treeData: any[], node: any): any {
        let vidljiviNodovi: any[] = [];
        this.vidljiviNodovi(treeData, vidljiviNodovi);

        let indexNoda = _.findIndex(vidljiviNodovi, function(vn){ return vn.id == node.id;})
        if (indexNoda < vidljiviNodovi.length){
            return vidljiviNodovi[indexNoda + 1];
        }
        return null;
    }

    vidljiviNodovi(treeData: any[], vidljiviNodovi: any[], nivo: number = 0): any[] {

        for (var i = 0; i < treeData.length; i++) {
            if (treeData[i].nivo === nivo || treeData[i].expanded) {
                //console.log(treeData[i].naziv);
                vidljiviNodovi.push(treeData[i]);
                if (treeData[i].expanded && treeData[i].children && treeData[i].children.length > 0) {
                    this.vidljiviNodovi(treeData[i].children, vidljiviNodovi, nivo + 1);

                } 
            }
        }
        return vidljiviNodovi;
    }
}