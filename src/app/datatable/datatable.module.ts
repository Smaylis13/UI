import {TableModule} from 'primeng/table';
import {DatatableComponent} from './datatable/datatable.component';
import {NgModule} from '@angular/core';
import {PaginatorComponent} from './paginator/paginator.component';


@NgModule({
  declarations: [
    DatatableComponent,
    PaginatorComponent
  ],
  imports: [
    TableModule
  ],
  providers: [],
})
export class DatatableModule { }
