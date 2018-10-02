import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-datatable',
  template: '<p-table [columns]="headers" [value]="values" paginator="true" [rows]="10"  [scrollable]="true" scrollHeight="200px">\n' +
  '    <ng-template pTemplate="header" let-columns>\n' +
  '        <tr>\n' +
  '            <th *ngFor="let col of columns">\n' +
  '                {{col.header}}\n' +
  '            </th>\n' +
  '        </tr>\n' +
  '    </ng-template>\n' +
  '    <ng-template pTemplate="body" let-rowData let-columns="columns">\n' +
  '        <tr>\n' +
  '            <td *ngFor="let col of columns">\n' +
  '                {{rowData[col.field]}}\n' +
  '            </td>\n' +
  '        </tr>\n' +
  '    </ng-template>\n' +
  '</p-table>',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {


  @Input() values: any[];
  @Input() headers: any[];

  ngOnInit(): void {
  }

}
export class Paginator implements OnInit {
  ngOnInit(): void {
  }
}

