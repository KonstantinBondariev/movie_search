import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAllValuesOfNestedObjectsService {
  constructor() {}

  getAllValues(val: any): any {
    return val instanceof Object
      ? [].concat.apply(
          [],
          Object.keys(val).map((k) => {
            return this.getAllValues(val[k]);
          })
        )
      : [val];
  }
}
