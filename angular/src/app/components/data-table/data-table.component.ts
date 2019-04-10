import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatRow } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class DataTableComponent<T> implements OnInit {
    @Input() data: T[];
    @Input() propertyTitles: { [propertyName: string]: string };
    @Input() canSelect = false;
    @Input() formatColumns: { [columnName: string]: (value: any) => string } = {};
    @Input() exclude: string;
    @Output() rowSelected = new EventEmitter<MatRow>();

    columns: string[];

    initialSelection = [];
    allowMultiSelect = false;
    selection = new SelectionModel<MatRow>(this.allowMultiSelect, this.initialSelection);

    constructor() { }

    ngOnInit() {
        this.columns = Object.keys(this.propertyTitles);
    }

    onSelect(event: Event, row: MatRow) {
        if (this.canSelect) {
            this.selection.toggle(row);
            this.rowSelected.emit(row);
            event.stopPropagation();
        }
    }

    onClickOutside(e: Event) {
        if (this.canSelect) {
            const element: Element = e.target as Element;
            if (!this.exclude || !element.matches(this.exclude)) {
                this.clearSelection();
            }
        }
    }

    private clearSelection() {
        this.selection.clear();
        this.rowSelected.emit(null);
    }
}
