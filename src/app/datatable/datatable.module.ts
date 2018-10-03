import {
  CellEditor,
  ContextMenuRow, EditableColumn, ReorderableColumn, ReorderableRow, ReorderableRowHandle,
  ResizableColumn,
  RowToggler,
  ScrollableView,
  SelectableRow, SelectableRowDblClick,
  SortableColumn, SortIcon,
  Table,
  TableBody, TableCheckbox, TableHeaderCheckbox, TableRadioButton, TableService,
} from 'primeng/table';
import {NgModule} from '@angular/core';
import {PaginatorModule} from 'primeng/primeng';

import {CommonModule} from '@angular/common';
import {SharedModule} from 'primeng/shared';
import {TestComponent} from './test/test.component';
import {DomHandler} from 'primeng/api';
import {ObjectUtils} from 'primeng/components/utils/objectutils';


@NgModule({
  imports: [CommonModule, PaginatorModule],
  exports: [Table, SharedModule, SortableColumn,
    SelectableRow, RowToggler, ContextMenuRow, ResizableColumn,
    ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton,
    TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, TableBody, ScrollableView],
  declarations: [Table, SortableColumn, SelectableRow, RowToggler,
    ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn,
    CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton,
    TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick],
  providers: [DomHandler, ObjectUtils, TableService, Table]

})
export class DatatableModule { }
