import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatRow } from '@angular/material';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class DataTableComponent implements OnInit {
    @Input() data: any[];
    @Input() propertyTitles: { [propertyName: string]: string };
    @Input() canSelect = false;
    @Output() rowSelected = new EventEmitter<MatRow>();

    public columns: string[];
    selectedRow: MatRow;

    constructor() { }

    ngOnInit() {
        this.columns = Object.keys(this.propertyTitles);
    }

    onSelect(row: MatRow) {
        if (this.canSelect) {
            this.selectedRow = row;
            this.rowSelected.emit(this.selectedRow);
        }
    }
}
