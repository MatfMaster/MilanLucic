import {Component, Input, Output, ElementRef, EventEmitter} from '@angular/core';  
import {CORE_DIRECTIVES} from '@angular/common';  
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'input-debounce',
    template: '<input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="inputValue" [disabled]="disabled" >'
})
export class InputDebounceComponent {  
    @Input() text: string = "";
    @Input() disabled: boolean = false;
    @Input() placeholder: string;
    @Input() delay: number = 300;
    @Output() value: EventEmitter<any> = new EventEmitter();

    public inputValue: string;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.value.emit(input));
    }
    
    /**
     * API
     */
    public setFocus(){
        this.elementRef.nativeElement.getElementsByTagName('input')[0].focus()
    }
}