import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products',
  pure: false
 })
 export class ProductfilterPipe implements PipeTransform {

 constructor(){
  console.log("sdasdasd");
 }
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter){
      return items;
    }
 
    if (!Array.isArray(items)){
      return items;
    }
 
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
 
      if (defaultFilter) {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }
 
 }