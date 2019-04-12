import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestResultDetailsComponent } from './components/test-result-details/test-result-details.component';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { TestResultDetailsResolverService } from './services/test-result-details-resolver.service';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: TestResultsComponent },
  { path: 'results/:id/details', component: TestResultDetailsComponent,
    resolve: { details: TestResultDetailsResolverService } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
