import {Directive, HostListener} from '@angular/core';

import {isMetaKey} from '@shared/helpers/keys.helpers';

interface InputTarget extends EventTarget {
  value?: string;
}

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    const e = <KeyboardEvent>event;
    const min = event.target.getAttribute('appMin');
    const max = event.target.getAttribute('appMax');
    const v = event.target.value;

    if (
      e.key === 'ArrowDown'
      && typeof min !== 'undefined'
      && +v <= +min
    ) {
      return e.preventDefault();
    }

    if (
      e.key === 'ArrowUp'
      && typeof max !== 'undefined'
      && +v >= +max
    ) {
      return e.preventDefault();
    }

    if (
      e.key === '-'
      && typeof min !== 'undefined'
      && !isNaN(min) && +min >= 0
    ) {
      return e.preventDefault();
    }

    if (isMetaKey(e)) {
      return;
    }

    if (/^\d*$/.test(e.key)) {
      return;
    } else {
      e.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event) {
    const e = <KeyboardEvent>event;
    const t = <InputTarget>e.currentTarget;

    if (t.value && isNaN(+t.value)) {
      t.value = '';
    }
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event) {
    const e = <Event>event;
    const v = event.target.value;
    const max = event.target.getAttribute('appMax');
    const min = event.target.getAttribute('appMin') !== null ? event.target.getAttribute('appMin') : 0;
    if ((event.deltaY < 0 && max !== null && +v >= +max) ||
      (event.deltaY > 0 && min !== null && +v <= +min)) {
      return e.preventDefault();
    }
  }
}
