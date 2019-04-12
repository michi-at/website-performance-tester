import {
    Component,
    ElementRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { GoogleChartComponent, ScriptLoaderService } from 'angular-google-charts';

@Component({
    selector: 'app-bar-chart',
    template: '',
    styles: [':host { width: fit-content; display: block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent extends GoogleChartComponent {
    constructor(element: ElementRef, loaderService: ScriptLoaderService) {
        super(element, loaderService);
    }

    createChart() {
        this.loadNeededPackages().subscribe(() => {
            this.chartData = {
                chartType: this.type,
                dataTable: this.getDataTable(),
                options: this.parseOptions(),
            };

            this.formatter = [
                { formatter: new google.visualization.NumberFormat({ suffix: 'ms' }), colIndex: 1 },
                { formatter: new google.visualization.NumberFormat({ suffix: 'ms' }), colIndex: 2 },
                { formatter: new google.visualization.NumberFormat({ suffix: 'ms' }), colIndex: 3 },
            ];
            this.wrapper = new google.visualization.ChartWrapper();
            this.updateChart();
        });
    }
}
