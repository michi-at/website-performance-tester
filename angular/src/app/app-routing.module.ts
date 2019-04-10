import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { TestResultDetailsComponent } from './components/test-result-details/test-result-details.component';
import { TestResultDetailsResolverService } from './services/test-result-details-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: TestResultsComponent },
  { path: 'results/:id/details', component: TestResultDetailsComponent,
    resolve: { details: TestResultDetailsResolverService } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
