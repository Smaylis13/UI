///<reference path="../../node_modules/primeng/components/inputtext/inputtext.d.ts"/>
///<reference path="../../node_modules/primeng/components/common/confirmationservice.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {TestComponent} from './datatable/test/test.component';

import {DatatableModule} from './datatable/datatable.module';
import {TableComponent} from './datatable/datatable/datatable.component';

@NgModule({
  declarations: [
    AppComponent, TestComponent, TableComponent],
  imports: [
    BrowserModule,
    DatatableModule
    ],
  providers: [ ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: []
})
export class AppModule {

}
