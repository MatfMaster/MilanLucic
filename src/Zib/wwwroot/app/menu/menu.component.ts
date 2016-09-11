import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'menu-bar',
    templateUrl: './menu.html',
    directives: [ROUTER_DIRECTIVES]
})

export class MenuComponent {

    constructor() {}

}