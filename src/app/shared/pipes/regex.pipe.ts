import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regex'
})
export class RegexPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let _regex = /\[(.*?)\]/g;
    let regex = /(\((https?:\/\/[^\s]+))/g;
    let _heading: any = value.match(_regex);
    let _link: any = value.match(regex);
    let _string = value;
    if (_heading !== null && _link !== null) {
      for (let i = 0; i < _heading.length; i++) {
        if (_heading[i] !== undefined && _link[i] !== undefined) {
          _string = _string.replace(_link[i], '');
          _string = _string.replace(_heading[i],  _heading[i].slice(1, _heading[i].length - 1) );
          // _string = _string.replace(_heading[i], "<a href=" + _link[i].slice(1, _link[i].length - 1) + " target=_blank>" + _heading[i].slice(1, _heading[i].length - 1) + "</a>");
        }
      }
      return _string
    } else {
      return value;
    }

  }

}
