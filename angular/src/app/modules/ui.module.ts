import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '../layout/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { SanitizeHtmlPipe } from '../helpers/sanitize-html.pipe';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        HeaderComponent,
        DataTableComponent,
        BarChartComponent,
        SanitizeHtmlPipe,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        FlexLayoutModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatListModule,
        GoogleChartsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatCardModule,
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        HeaderComponent,
        FlexLayoutModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatListModule,
        DataTableComponent,
        GoogleChartsModule,
        BarChartComponent,
        SanitizeHtmlPipe,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatCardModule,
    ]
})
export class UIModule { }
