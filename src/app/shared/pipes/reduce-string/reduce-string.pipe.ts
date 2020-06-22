import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceString'
})
export class ReduceStringPipe implements PipeTransform {
  transform(initiate: string): string {
    let dot = '';
     if (initiate.length > 16) {
       dot = '...';
     }
    return initiate.substring(0, 16) + dot;
  }
}
