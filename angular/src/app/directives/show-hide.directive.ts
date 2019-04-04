import { Directive, Input } from '@angular/core';
import { ShowHideDirective } from '@angular/flex-layout';

const selector = `[fxHide.xs.screen]`;
const inputs = ['fxHide.xs.screen'];

// tslint:disable-next-line: use-input-property-decorator
@Directive({ selector, inputs })
export class CustomShowHideDirective extends ShowHideDirective {
  protected inputs = inputs;
}
