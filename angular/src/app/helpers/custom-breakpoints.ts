import { BREAKPOINT } from '@angular/flex-layout';

const SCREEN_BREAKPOINTS = [{
  alias: 'xs.screen',
  suffix: 'XsScreen',
  mediaQuery: 'screen and (max-width: 380px)',
  overlapping: false
}];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: SCREEN_BREAKPOINTS,
  multi: true
};
