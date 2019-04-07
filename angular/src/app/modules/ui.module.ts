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
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '../layout/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { SanitizeHtmlPipe } from '../helpers/sanitize-html.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        DataTableComponent,
        BarChartComponent,
        SanitizeHtmlPipe,
    ],
    imports: [
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
    ]
})
export class UIModule { }
