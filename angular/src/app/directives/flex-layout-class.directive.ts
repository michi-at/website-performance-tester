import { Directive } from '@angular/core';
import { DefaultClassDirective } from '@angular/flex-layout';

const selector = `[ngClass.xs.screen]`;
const inputs = ['ngClass.xs.screen'];

// tslint:disable-next-line: use-input-property-decorator
@Directive({ selector, inputs })
export class FlexLayoutClassDirective extends DefaultClassDirective {
  protected inputs = inputs;
}
