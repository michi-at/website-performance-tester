import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './layout/app.component';
import { UIModule } from './modules/ui.module';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { CustomBreakPointsProvider } from './helpers/custom-breakpoints';
import { CustomShowHideDirective } from './directives/show-hide.directive';
import { CustomNgClassDirective } from './directives/ng-class.directive';
import { TestResultDetailsComponent } from './components/test-result-details/test-result-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestResultsComponent,
    TestResultDetailsComponent,
    CustomShowHideDirective,
    CustomNgClassDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIModule
  ],
  providers: [CustomBreakPointsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
