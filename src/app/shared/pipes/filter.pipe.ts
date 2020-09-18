import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'columnPipe'
})
export class columnPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const columnNames = [];
        for (var i = 0; i < value.length; i++) {
            for (let key in value[i]) {
                if (columnNames.indexOf(key) === -1) {
                    columnNames.push(key);
                }
            }
        }
        return columnNames;
    }
}

@Pipe({
    name: 'rowPipe'
})

export class rowPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const rowValues = Object.keys(value);
        return rowValues.map(k => value[k]);
    }
}

@Pipe({
    name: 'search'
})
export class searchPipe implements PipeTransform {
    transform(values: any[], filter: any, keyArray: any): any {
        if (!values || !values.length) { return []; }
        if (!filter) { return values; }

        filter = filter.toUpperCase();

        if (filter && Array.isArray(values)) {
            const keys = keyArray;
            return values.filter(v => v && keys.some(k => String(v[k]).toUpperCase().indexOf(filter) >= 0));
        }
    }
}

@Pipe({
    name: 'searchTabelPipe'
})
export class searchTabelPipe implements PipeTransform {
    transform(values: any[], filter: any, keyArray: any): any {
        if (!values || !values.length) { return []; }
        if (!filter) { return values; }

        filter = filter.toUpperCase();

        if (filter && Array.isArray(values)) {
            const keys = keyArray;
            return values.filter(v => v && keys.some(k => String(v[k]).toUpperCase().indexOf(filter) >= 0));
        }
    }
}

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, showName: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it[showName].toLowerCase().includes(searchText);
        });
    }
}


@Pipe({ name: 'reverse' })

export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}

