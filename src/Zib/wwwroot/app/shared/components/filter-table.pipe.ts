import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterTable'
})

export class FilterTablePipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        debugger;
    }
}