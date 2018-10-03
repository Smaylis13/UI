///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {
  NgModule,
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ContentChildren,
  TemplateRef,
  QueryList,
  ViewChild,
  NgZone
} from '@angular/core';

import {PrimeTemplate} from 'primeng/shared';
import {BlockableUI, DomHandler, FilterMetadata, SortMeta} from 'primeng/api';
import {ObjectUtils} from 'primeng/components/utils/objectutils';
import {TableService} from 'primeng/table';
@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})


export class TableComponent implements OnInit, AfterContentInit, BlockableUI {

  @Input() frozenColumns: any[];

  @Input() frozenValue: any[];

  @Input() style: any;

  @Input() styleClass: string;

  @Input() tableStyle: any;

  @Input() tableStyleClass: string;

  @Input() paginator: boolean;

  @Input() rows: number;

  @Input() first: number = 0;

  @Input() pageLinks: number = 5;

  @Input() rowsPerPageOptions: number[];

  @Input() alwaysShowPaginator: boolean = true;

  @Input() paginatorPosition: string = 'bottom';

  @Input() paginatorDropdownAppendTo: any;

  @Input() defaultSortOrder: number = 1;

  @Input() sortMode: string = 'single';

  @Input() resetPageOnSort: boolean = true;

  @Input() selectionMode: string;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  @Input() contextMenuSelection: any;

  @Output() contextMenuSelectionChange: EventEmitter<any> = new EventEmitter();

  @Input() contextMenuSelectionMode: string = "separate";

  @Input() dataKey: string;

  @Input() metaKeySelection: boolean;

  @Input() rowTrackBy: Function = (index: number, item: any) => item;

  @Input() lazy: boolean = false;

  @Input() lazyLoadOnInit: boolean = true;

  @Input() compareSelectionBy: string = 'deepEquals';

  @Input() csvSeparator: string = ',';

  @Input() exportFilename: string = 'download';

  @Input() filters: { [s: string]: FilterMetadata; } = {};

  @Input() globalFilterFields: string[];

  @Input() filterDelay: number = 300;

  @Input() expandedRowKeys: { [s: string]: number; } = {};

  @Input() rowExpandMode: string = 'multiple';

  @Input() scrollable: boolean;

  @Input() scrollHeight: string;

  @Input() virtualScroll: boolean;

  @Input() virtualScrollDelay: number = 500;

  @Input() virtualRowHeight: number = 28;

  @Input() frozenWidth: string;

  @Input() responsive: boolean;

  @Input() contextMenu: any;

  @Input() resizableColumns: boolean;

  @Input() columnResizeMode: string = 'fit';

  @Input() reorderableColumns: boolean;

  @Input() loading: boolean;

  @Input() loadingIcon: string = 'pi pi-spinner';

  @Input() rowHover: boolean;

  @Input() customSort: boolean;

  @Input() autoLayout: boolean;

  @Input() exportFunction;

  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

  @Output() onPage: EventEmitter<any> = new EventEmitter();

  @Output() onSort: EventEmitter<any> = new EventEmitter();

  @Output() onFilter: EventEmitter<any> = new EventEmitter();

  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

  @Output() onRowExpand: EventEmitter<any> = new EventEmitter();

  @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();

  @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();

  @Output() onColResize: EventEmitter<any> = new EventEmitter();

  @Output() onColReorder: EventEmitter<any> = new EventEmitter();

  @Output() onRowReorder: EventEmitter<any> = new EventEmitter();

  @Output() onEditInit: EventEmitter<any> = new EventEmitter();

  @Output() onEditComplete: EventEmitter<any> = new EventEmitter();

  @Output() onEditCancel: EventEmitter<any> = new EventEmitter();

  @Output() onHeaderCheckboxToggle: EventEmitter<any> = new EventEmitter();

  @Output() sortFunction: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') containerViewChild: ElementRef;

  @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

  @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: ElementRef;

  @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: ElementRef;

  @ViewChild('table') tableViewChild: ElementRef;

  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

  _value: any[] = [];

  _columns: any[];

  _totalRecords: number = 0;

  filteredValue: any[];

  headerTemplate: TemplateRef<any>;

  bodyTemplate: TemplateRef<any>;

  captionTemplate: TemplateRef<any>;

  frozenRowsTemplate: TemplateRef<any>;

  footerTemplate: TemplateRef<any>;

  summaryTemplate: TemplateRef<any>;

  colGroupTemplate: TemplateRef<any>;

  expandedRowTemplate: TemplateRef<any>;

  frozenHeaderTemplate: TemplateRef<any>;

  frozenBodyTemplate: TemplateRef<any>;

  frozenFooterTemplate: TemplateRef<any>;

  frozenColGroupTemplate: TemplateRef<any>;

  emptyMessageTemplate: TemplateRef<any>;

  paginatorLeftTemplate: TemplateRef<any>;

  paginatorRightTemplate: TemplateRef<any>;

  selectionKeys: any = {};

  lastResizerHelperX: number;

  reorderIconWidth: number;

  reorderIconHeight: number;

  draggedColumn: any;

  draggedRowIndex: number;

  droppedRowIndex: number;

  rowDragging: boolean;

  dropPosition: number;

  editingCell: Element;

  _multiSortMeta: SortMeta[];

  _sortField: string;

  _sortOrder: number = 1;

  virtualScrollTimer: any;

  virtualScrollCallback: Function;

  preventSelectionSetterPropagation: boolean;

  _selection: any;

  anchorRowIndex: number;

  rangeRowIndex: number;

  filterTimeout: any;

  initialized: boolean;

  rowTouched: boolean;

  constructor(public domHandler: DomHandler, public objectUtils: ObjectUtils, public zone: NgZone, public tableService: TableService) {}

  ngOnInit() {
    if (this.lazy && this.lazyLoadOnInit) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    this.initialized = true;
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'caption':
          this.captionTemplate = item.template;
          break;

        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'body':
          this.bodyTemplate = item.template;
          break;

        case 'footer':
          this.footerTemplate = item.template;
          break;

        case 'summary':
          this.summaryTemplate = item.template;
          break;

        case 'colgroup':
          this.colGroupTemplate = item.template;
          break;

        case 'rowexpansion':
          this.expandedRowTemplate = item.template;
          break;

        case 'frozenrows':
          this.frozenRowsTemplate = item.template;
          break;

        case 'frozenheader':
          this.frozenHeaderTemplate = item.template;
          break;

        case 'frozenbody':
          this.frozenBodyTemplate = item.template;
          break;

        case 'frozenfooter':
          this.frozenFooterTemplate = item.template;
          break;

        case 'frozencolgroup':
          this.frozenColGroupTemplate = item.template;
          break;

        case 'emptymessage':
          this.emptyMessageTemplate = item.template;
          break;

        case 'paginatorleft':
          this.paginatorLeftTemplate = item.template;
          break;

        case 'paginatorright':
          this.paginatorRightTemplate = item.template;
          break;
      }
    });
  }

  @Input() get value(): any[] {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;

    if (!this.lazy) {
      this.totalRecords = (this._value ? this._value.length : 0);

      if (this.sortMode == 'single' && this.sortField)
        this.sortSingle();
      else if (this.sortMode == 'multiple' && this.multiSortMeta)
        this.sortMultiple();
      else if(this.hasFilter())       //sort already filters
        this._filter();
    }

    if(this.virtualScroll && this.virtualScrollCallback) {
      this.virtualScrollCallback();
    }

    this.tableService.onValueChange(val);
  }

  @Input() get columns(): any[] {
    return this._columns;
  }
  set columns(cols: any[]) {
    this._columns = cols;
    this.tableService.onColumnsChange(cols);
  }

  @Input() get totalRecords(): number {
    return this._totalRecords;
  }
  set totalRecords(val: number) {
    this._totalRecords = val;
    this.tableService.onTotalRecordsChange(this._totalRecords);
  }

  @Input() get sortField(): string {
    return this._sortField;
  }

  set sortField(val: string) {
    this._sortField = val;

    //avoid triggering lazy load prior to lazy initialization at onInit
    if ( !this.lazy || this.initialized ) {
      if (this.sortMode === 'single') {
        this.sortSingle();
      }
    }
  }

  @Input() get sortOrder(): number {
    return this._sortOrder;
  }
  set sortOrder(val: number) {
    this._sortOrder = val;

    //avoid triggering lazy load prior to lazy initialization at onInit
    if ( !this.lazy || this.initialized ) {
      if (this.sortMode === 'single') {
        this.sortSingle();
      }
    }
  }

  @Input() get multiSortMeta(): SortMeta[] {
    return this._multiSortMeta;
  }

  set multiSortMeta(val: SortMeta[]) {
    this._multiSortMeta = val;
    if (this.sortMode === 'multiple') {
      this.sortMultiple();
    }
  }

  @Input() get selection(): any {
    return this._selection;
  }

  set selection(val: any) {
    this._selection = val;

    if(!this.preventSelectionSetterPropagation) {
      this.updateSelectionKeys();
      this.tableService.onSelectionChange();
    }
    this.preventSelectionSetterPropagation = false;
  }

  updateSelectionKeys() {
    if(this.dataKey && this._selection) {
      this.selectionKeys = {};
      if(Array.isArray(this._selection)) {
        for(let data of this._selection) {
          this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
        }
      }
      else {
        this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
      }
    }
  }

  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;

    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }

    this.onPage.emit({
      first: this.first,
      rows: this.rows
    });

    this.tableService.onValueChange(this.value);
  }

  sort(event) {
    let originalEvent = event.originalEvent;

    if(this.sortMode === 'single') {
      this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
      this._sortField = event.field;
      this.sortSingle();
    }
    if (this.sortMode === 'multiple') {
      let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      let sortMeta = this.getSortMeta(event.field);

      if (sortMeta) {
        if (!metaKey) {
          this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }]
        }
        else {
          sortMeta.order = sortMeta.order * -1;
        }
      }
      else {
        if (!metaKey || !this.multiSortMeta) {
          this._multiSortMeta = [];
        }
        this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
      }

      this.sortMultiple();
    }
  }

  sortSingle() {
    if(this.sortField && this.sortOrder) {
      if(this.resetPageOnSort) {
        this.first = 0;
      }

      if(this.lazy) {
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
      }
      else if (this.value) {
        if(this.customSort) {
          this.sortFunction.emit({
            data: this.value,
            mode: this.sortMode,
            field: this.sortField,
            order: this.sortOrder
          });
        }
        else {
          this.value.sort((data1, data2) => {
            let value1 = this.objectUtils.resolveFieldData(data1, this.sortField);
            let value2 = this.objectUtils.resolveFieldData(data2, this.sortField);
            let result = null;

            if (value1 == null && value2 != null)
              result = -1;
            else if (value1 != null && value2 == null)
              result = 1;
            else if (value1 == null && value2 == null)
              result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
              result = value1.localeCompare(value2);
            else
              result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (this.sortOrder * result);
          });
        }

        if(this.hasFilter()) {
          this._filter();
        }
      }

      let sortMeta: SortMeta = {
        field: this.sortField,
        order: this.sortOrder
      };

      this.onSort.emit(sortMeta);
      this.tableService.onSort(sortMeta);
    }
  }

  sortMultiple() {
    if(this.multiSortMeta) {
      if (this.lazy) {
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
      }
      else if (this.value) {
        if(this.customSort) {
          this.sortFunction.emit({
            data: this.value,
            mode: this.sortMode,
            multiSortMeta: this.multiSortMeta
          });
        }
        else {
          this.value.sort((data1, data2) => {
            return this.multisortField(data1, data2, this.multiSortMeta, 0);
          });
        }

        if(this.hasFilter()) {
          this._filter();
        }
      }

      this.onSort.emit({
        multisortmeta: this.multiSortMeta
      });
      this.tableService.onSort(this.multiSortMeta);
    }
  }

  multisortField(data1, data2, multiSortMeta, index) {
    let value1 = this.objectUtils.resolveFieldData(data1, multiSortMeta[index].field);
    let value2 = this.objectUtils.resolveFieldData(data2, multiSortMeta[index].field);
    let result = null;

    if (value1 == null && value2 != null)
      result = -1;
    else if (value1 != null && value2 == null)
      result = 1;
    else if (value1 == null && value2 == null)
      result = 0;
    if (typeof value1 == 'string' || value1 instanceof String) {
      if (value1.localeCompare && (value1 != value2)) {
        return (multiSortMeta[index].order * value1.localeCompare(value2));
      }
    }
    else {
      result = (value1 < value2) ? -1 : 1;
    }

    if (value1 == value2) {
      return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
    }

    return (multiSortMeta[index].order * result);
  }

  getSortMeta(field: string) {
    if (this.multiSortMeta && this.multiSortMeta.length) {
      for (let i = 0; i < this.multiSortMeta.length; i++) {
        if (this.multiSortMeta[i].field === field) {
          return this.multiSortMeta[i];
        }
      }
    }

    return null;
  }

  isSorted(field: string) {
    if(this.sortMode === 'single') {
      return (this.sortField && this.sortField === field);
    }
    else if(this.sortMode === 'multiple') {
      let sorted = false;
      if(this.multiSortMeta) {
        for(let i = 0; i < this.multiSortMeta.length; i++) {
          if(this.multiSortMeta[i].field == field) {
            sorted = true;
            break;
          }
        }
      }
      return sorted;
    }
  }

  handleRowClick(event) {
    let targetNode = (<HTMLElement> event.originalEvent.target).nodeName;
    if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
      return;
    }

    if(this.selectionMode) {
      this.preventSelectionSetterPropagation = true;
      if(this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
        this.domHandler.clearSelection();
        if(this.rangeRowIndex != null) {
          this.clearSelectionRange(event.originalEvent);
        }

        this.rangeRowIndex = event.rowIndex;
        this.selectRange(event.originalEvent, event.rowIndex);
      }
      else {
        let rowData = event.rowData;
        let selected = this.isSelected(rowData);
        let metaSelection = this.rowTouched ? false : this.metaKeySelection;
        let dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.anchorRowIndex = event.rowIndex;
        this.rangeRowIndex = event.rowIndex;

        if(metaSelection) {
          let metaKey = event.originalEvent.metaKey||event.originalEvent.ctrlKey;

          if(selected && metaKey) {
            if(this.isSingleSelectionMode()) {
              this._selection = null;
              this.selectionKeys = {};
              this.selectionChange.emit(null);
            }
            else {
              let selectionIndex = this.findIndexInSelection(rowData);
              this._selection = this.selection.filter((val,i) => i!=selectionIndex);
              this.selectionChange.emit(this.selection);
              if(dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
              }
            }

            this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
          }
          else {
            if(this.isSingleSelectionMode()) {
              this._selection = rowData;
              this.selectionChange.emit(rowData);
              if(dataKeyValue) {
                this.selectionKeys = {};
                this.selectionKeys[dataKeyValue] = 1;
              }
            }
            else if(this.isMultipleSelectionMode()) {
              if(metaKey) {
                this._selection = this.selection||[];
              }
              else {
                this._selection = [];
                this.selectionKeys = {};
              }

              this._selection = [...this.selection,rowData];
              this.selectionChange.emit(this.selection);
              if(dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
              }
            }

            this.onRowSelect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex});
          }
        }
        else {
          if (this.selectionMode === 'single') {
            if (selected) {
              this._selection = null;
              this.selectionKeys = {};
              this.selectionChange.emit(this.selection);
              this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
            }
            else {
              this._selection = rowData;
              this.selectionChange.emit(this.selection);
              this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
              if (dataKeyValue) {
                this.selectionKeys = {};
                this.selectionKeys[dataKeyValue] = 1;
              }
            }
          }
          else if (this.selectionMode === 'multiple') {
            if (selected) {
              let selectionIndex = this.findIndexInSelection(rowData);
              this._selection = this.selection.filter((val, i) => i != selectionIndex);
              this.selectionChange.emit(this.selection);
              this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
              if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
              }
            }
            else {
              this._selection = this.selection ? [...this.selection, rowData] : [rowData];
              this.selectionChange.emit(this.selection);
              this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
              if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
              }
            }
          }
        }
      }

      this.tableService.onSelectionChange();
    }

    this.rowTouched = false;
  }

  handleRowTouchEnd(event) {
    this.rowTouched = true;
  }

  handleRowRightClick(event) {
    if (this.contextMenu) {
      const rowData = event.rowData;

      if (this.contextMenuSelectionMode === 'separate') {
        this.contextMenuSelection = rowData;
        this.contextMenuSelectionChange.emit(rowData);
        this.onContextMenuSelect.emit({originalEvent: event.originalEvent, data: rowData});
        this.contextMenu.show(event.originalEvent);
        this.tableService.onContextMenu(rowData);
      }
      else if (this.contextMenuSelectionMode === 'joint') {
        this.preventSelectionSetterPropagation = true;
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;

        if (!selected) {
          if (this.isSingleSelectionMode()) {
            this.selection = rowData;
            this.selectionChange.emit(rowData);
          }
          else if (this.isMultipleSelectionMode()) {
            this.selection = [rowData];
            this.selectionChange.emit(this.selection);
          }

          if (dataKeyValue) {
            this.selectionKeys[dataKeyValue] = 1;
          }
        }

        this.contextMenu.show(event.originalEvent);
        this.onContextMenuSelect.emit({originalEvent: event, data: rowData});
      }
    }
  }

  selectRange(event: MouseEvent, rowIndex: number) {
    let rangeStart, rangeEnd;

    if(this.anchorRowIndex > rowIndex) {
      rangeStart = rowIndex;
      rangeEnd = this.anchorRowIndex;
    }
    else if(this.anchorRowIndex < rowIndex) {
      rangeStart = this.anchorRowIndex;
      rangeEnd = rowIndex;
    }
    else {
      rangeStart = rowIndex;
      rangeEnd = rowIndex;
    }

    for(let i = rangeStart; i <= rangeEnd; i++) {
      let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
      if(!this.isSelected(rangeRowData)) {
        this._selection = [...this.selection, rangeRowData];
        let dataKeyValue: string = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
        if(dataKeyValue) {
          this.selectionKeys[dataKeyValue] = 1;
        }
        this.onRowSelect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
      }
    }

    this.selectionChange.emit(this.selection);
  }

  clearSelectionRange(event: MouseEvent) {
    let rangeStart, rangeEnd;

    if(this.rangeRowIndex > this.anchorRowIndex) {
      rangeStart = this.anchorRowIndex;
      rangeEnd = this.rangeRowIndex;
    }
    else if(this.rangeRowIndex < this.anchorRowIndex) {
      rangeStart = this.rangeRowIndex;
      rangeEnd = this.anchorRowIndex;
    }
    else {
      rangeStart = this.rangeRowIndex;
      rangeEnd = this.rangeRowIndex;
    }

    for(let i = rangeStart; i <= rangeEnd; i++) {
      let rangeRowData = this.value[i];
      let selectionIndex = this.findIndexInSelection(rangeRowData);
      this._selection = this.selection.filter((val,i) => i!=selectionIndex);
      let dataKeyValue: string = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
      if(dataKeyValue) {
        delete this.selectionKeys[dataKeyValue];
      }
      this.onRowUnselect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
    }
  }

  isSelected(rowData) {
    if (rowData && this.selection) {
      if (this.dataKey) {
        return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
      }
      else {
        if (this.selection instanceof Array)
          return this.findIndexInSelection(rowData) > -1;
        else
          return this.equals(rowData, this.selection);
      }
    }

    return false;
  }

  findIndexInSelection(rowData: any) {
    let index: number = -1;
    if (this.selection && this.selection.length) {
      for (let i = 0; i < this.selection.length; i++) {
        if (this.equals(rowData, this.selection[i])) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  toggleRowWithRadio(event: Event, rowData:any) {
    this.preventSelectionSetterPropagation = true;

    if(this.selection != rowData) {
      this._selection = rowData;
      this.selectionChange.emit(this.selection);
      this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});

      if(this.dataKey) {
        this.selectionKeys = {};
        this.selectionKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
      }
    }
    else {
      this._selection = null;
      this.selectionChange.emit(this.selection);
      this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});
    }

    this.tableService.onSelectionChange();
  }

  toggleRowWithCheckbox(event, rowData: any) {
    this.selection = this.selection||[];
    let selected = this.isSelected(rowData);
    let dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
    this.preventSelectionSetterPropagation = true;

    if (selected) {
      let selectionIndex = this.findIndexInSelection(rowData);
      this._selection = this.selection.filter((val, i) => i != selectionIndex);
      this.selectionChange.emit(this.selection);
      this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
      if (dataKeyValue) {
        delete this.selectionKeys[dataKeyValue];
      }
    }
    else {
      this._selection = this.selection ? [...this.selection, rowData] : [rowData];
      this.selectionChange.emit(this.selection);
      this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
      if (dataKeyValue) {
        this.selectionKeys[dataKeyValue] = 1;
      }
    }

    this.tableService.onSelectionChange();
  }

  toggleRowsWithCheckbox(event: Event, check: boolean) {
    this._selection = check ? this.filteredValue ? this.filteredValue.slice(): this.value.slice() : [];
    this.preventSelectionSetterPropagation = true;
    this.updateSelectionKeys();
    this.selectionChange.emit(this._selection);
    this.tableService.onSelectionChange();
    this.onHeaderCheckboxToggle.emit({originalEvent: event, checked: check});
  }

  equals(data1, data2) {
    return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
  }

  filter(value, field, matchMode) {
    if(this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    if (!this.isFilterBlank(value)) {
      this.filters[field] = { value: value, matchMode: matchMode };
    } else if (this.filters[field]) {
      delete this.filters[field];
    }

    this.filterTimeout = setTimeout(() => {
      this._filter();
      this.filterTimeout = null;
    }, this.filterDelay);
  }

  filterGlobal(value, matchMode) {
    this.filter(value, 'global', matchMode);
  }

  isFilterBlank(filter: any): boolean {
    if (filter !== null && filter !== undefined) {
      if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
        return true;
      else
        return false;
    }
    return true;
  }

  _filter() {
    this.first = 0;

    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    else {
      if (!this.value) {
        return;
      }

      if(!this.hasFilter()) {
        this.filteredValue = null;
        if (this.paginator) {
          this.totalRecords = this.value ? this.value.length : 0;
        }
      }
      else {
        let globalFilterFieldsArray;
        if (this.filters['global']) {
          if (!this.columns && !this.globalFilterFields)
            throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
          else
            globalFilterFieldsArray = this.globalFilterFields||this.columns;
        }

        this.filteredValue = [];

        for (let i = 0; i < this.value.length; i++) {
          let localMatch = true;
          let globalMatch = false;
          let localFiltered = false;

          for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
              localFiltered = true;
              let filterMeta = this.filters[prop];
              let filterField = prop;
              let filterValue = filterMeta.value;
              let filterMatchMode = filterMeta.matchMode || 'startsWith';
              let dataFieldValue = this.objectUtils.resolveFieldData(this.value[i], filterField);
              let filterConstraint = this.filterConstraints[filterMatchMode];

              if (!filterConstraint(dataFieldValue, filterValue)) {
                localMatch = false;
              }

              if (!localMatch) {
                break;
              }
            }
          }

          if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
            for(let j = 0; j < globalFilterFieldsArray.length; j++) {
              let globalFilterField = globalFilterFieldsArray[j].field||globalFilterFieldsArray[j];
              globalMatch = this.filterConstraints[this.filters['global'].matchMode](this.objectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);

              if(globalMatch) {
                break;
              }
            }
          }

          let matches: boolean;
          if(this.filters['global']) {
            matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
          }
          else {
            matches = localFiltered && localMatch;
          }

          if (matches) {
            this.filteredValue.push(this.value[i]);
          }
        }

        if (this.filteredValue.length === this.value.length) {
          this.filteredValue = null;
        }

        if (this.paginator) {
          this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
        }
      }
    }

    this.onFilter.emit({
      filters: this.filters,
      filteredValue: this.filteredValue || this.value
    });

    this.tableService.onValueChange(this.value);
  }

  hasFilter() {
    let empty = true;
    for (let prop in this.filters) {
      if (this.filters.hasOwnProperty(prop)) {
        empty = false;
        break;
      }
    }

    return !empty;
  }

  filterConstraints = {

    startsWith(value, filter): boolean {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      let filterValue = filter.toLowerCase();
      return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
    },

    contains(value, filter): boolean {
      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    },

    endsWith(value, filter): boolean {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      let filterValue = filter.toString().toLowerCase();
      return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
    },

    equals(value, filter): boolean {
      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      if (value.getTime && filter.getTime)
        return value.getTime() === filter.getTime();
      else
        return value.toString().toLowerCase() == filter.toString().toLowerCase();
    },

    notEquals(value, filter): boolean {
      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return false;
      }

      if (value === undefined || value === null) {
        return true;
      }

      if (value.getTime && filter.getTime)
        return value.getTime() !== filter.getTime();
      else
        return value.toString().toLowerCase() != filter.toString().toLowerCase();
    },

    in(value, filter: any[]): boolean {
      if (filter === undefined || filter === null || filter.length === 0) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      for (let i = 0; i < filter.length; i++) {
        if (filter[i] === value || (value.getTime && filter[i].getTime && value.getTime() === filter[i].getTime())) {
          return true;
        }
      }

      return false;
    },

    lt(value, filter): boolean {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      if (value.getTime && filter.getTime)
        return value.getTime() < filter.getTime();
      else
        return value < filter;
    },

    lte(value, filter): boolean {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      if (value.getTime && filter.getTime)
        return value.getTime() <= filter.getTime();
      else
        return value <= filter;
    },

    gt(value, filter): boolean {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      if (value.getTime && filter.getTime)
        return value.getTime() > filter.getTime();
      else
        return value > filter;
    },

    gte(value, filter): boolean {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      if (value.getTime && filter.getTime)
        return value.getTime() >= filter.getTime();
      else
        return value >= filter;
    }
  }

  createLazyLoadMetadata(): any {
    return {
      first: this.first,
      rows: this.virtualScroll ? this.rows * 2: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: this.filters,
      globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
      multiSortMeta: this.multiSortMeta
    };
  }

  public reset() {
    this._sortField = null;
    this._sortOrder = 1;
    this._multiSortMeta = null;
    this.tableService.onSort(null);

    this.filteredValue = null;
    this.filters = {};

    this.first = 0;

    if(this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    else {
      this.totalRecords = (this._value ? this._value.length : 0);
    }
  }

  public exportCSV(options?: any) {
    let data = this.filteredValue || this.value;
    let csv = '\ufeff';

    if (options && options.selectionOnly) {
      data = this.selection || [];
    }

    //headers
    for (let i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      if (column.exportable !== false && column.field) {
        csv += '"' + (column.header || column.field) + '"';

        if (i < (this.columns.length - 1)) {
          csv += this.csvSeparator;
        }
      }
    }

    //body
    data.forEach((record, i) => {
      csv += '\n';
      for (let i = 0; i < this.columns.length; i++) {
        let column = this.columns[i];
        if (column.exportable !== false && column.field) {
          let cellData = this.objectUtils.resolveFieldData(record, column.field);

          if (cellData != null) {
            if (this.exportFunction) {
              cellData = this.exportFunction({
                data: cellData,
                field: column.field
              });
            }
            else
              cellData = String(cellData).replace(/"/g, '""');
          }
          else
            cellData = '';


          csv += '"' + cellData + '"';

          if (i < (this.columns.length - 1)) {
            csv += this.csvSeparator;
          }
        }
      }
    });

    let blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
    }
    else {
      let link = document.createElement("a");
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', this.exportFilename + '.csv');
        link.click();
      }
      else {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        window.open(encodeURI(csv));
      }
      document.body.removeChild(link);
    }
  }

  public closeCellEdit() {
    this.domHandler.removeClass(this.editingCell, 'ui-editing-cell');
    this.editingCell = null;
  }

  toggleRow(rowData: any, event?: Event) {
    if(!this.dataKey) {
      throw new Error('dataKey must be defined to use row expansion');
    }

    let dataKeyValue = String(this.objectUtils.resolveFieldData(rowData, this.dataKey));

    if (this.expandedRowKeys[dataKeyValue] != null) {
      delete this.expandedRowKeys[dataKeyValue];
      this.onRowCollapse.emit({
        originalEvent: event,
        data: rowData
      });
    }
    else {
      if (this.rowExpandMode === 'single') {
        this.expandedRowKeys = {};
      }

      this.expandedRowKeys[dataKeyValue] = 1;
      this.onRowExpand.emit({
        originalEvent: event,
        data: rowData
      });
    }

    if (event) {
      event.preventDefault();
    }
  }

  isRowExpanded(rowData: any): boolean {
    return this.expandedRowKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] === 1;
  }

  isSingleSelectionMode() {
    return this.selectionMode === 'single';
  }

  isMultipleSelectionMode() {
    return this.selectionMode === 'multiple';
  }

  onColumnResizeBegin(event) {
    let containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
    this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
    event.preventDefault();
  }

  onColumnResize(event) {
    let containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
    this.domHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
    this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
    this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';

    this.resizeHelperViewChild.nativeElement.style.display = 'block';
  }

  onColumnResizeEnd(event, column) {
    let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
    let columnWidth = column.offsetWidth;
    let minWidth = parseInt(column.style.minWidth || 15);

    if (columnWidth + delta < minWidth) {
      delta = minWidth - columnWidth;
    }

    const newColumnWidth = columnWidth + delta;

    if (newColumnWidth >= minWidth) {
      if (this.columnResizeMode === 'fit') {
        let nextColumn = column.nextElementSibling;
        while (!nextColumn.offsetParent) {
          nextColumn = nextColumn.nextElementSibling;
        }

        if (nextColumn) {
          let nextColumnWidth = nextColumn.offsetWidth - delta;
          let nextColumnMinWidth = nextColumn.style.minWidth || 15;

          if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
            if (this.scrollable) {
              let scrollableView = this.findParentScrollableView(column);
              let scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
              let scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
              let scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
              let resizeColumnIndex = this.domHandler.index(column);

              this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
              this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
              this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            }
            else {
              column.style.width = newColumnWidth + 'px';
              if (nextColumn) {
                nextColumn.style.width = nextColumnWidth + 'px';
              }
            }
          }
        }
      }
      else if (this.columnResizeMode === 'expand') {
        if (this.scrollable) {
          let scrollableView = this.findParentScrollableView(column);
          let scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
          let scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
          let scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
          scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
          scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
          if(scrollableFooterTable) {
            scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
          }
          let resizeColumnIndex = this.domHandler.index(column);

          this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
          this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
          this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
        }
        else {
          this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
          column.style.width = newColumnWidth + 'px';
          let containerWidth = this.tableViewChild.nativeElement.style.width;
          this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
        }
      }

      this.onColResize.emit({
        element: column,
        delta: delta
      });
    }

    this.resizeHelperViewChild.nativeElement.style.display = 'none';
    this.domHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
  }

  findParentScrollableView(column) {
    if (column) {
      let parent = column.parentElement;
      while (parent && !this.domHandler.hasClass(parent, 'ui-table-scrollable-view')) {
        parent = parent.parentElement;
      }

      return parent;
    }
    else {
      return null;
    }
  }

  resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
    if(table) {
      let colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

      if(colGroup) {
        let col = colGroup.children[resizeColumnIndex];
        let nextCol = col.nextElementSibling;
        col.style.width = newColumnWidth + 'px';

        if (nextCol && nextColumnWidth) {
          nextCol.style.width = nextColumnWidth + 'px';
        }
      }
      else {
        throw "Scrollable tables require a colgroup to support resizable columns";
      }
    }
  }

  onColumnDragStart(event, columnElement) {
    this.reorderIconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
    this.reorderIconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
    this.draggedColumn = columnElement;
    event.dataTransfer.setData('text', 'b');    // For firefox
  }

  onColumnDragEnter(event, dropHeader) {
    if (this.reorderableColumns && this.draggedColumn && dropHeader) {
      event.preventDefault();
      let containerOffset = this.domHandler.getOffset(this.containerViewChild.nativeElement);
      let dropHeaderOffset = this.domHandler.getOffset(dropHeader);

      if (this.draggedColumn != dropHeader) {
        let targetLeft = dropHeaderOffset.left - containerOffset.left;
        let targetTop = containerOffset.top - dropHeaderOffset.top;
        let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

        this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
        this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

        if (event.pageX > columnCenter) {
          this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
          this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
          this.dropPosition = 1;
        }
        else {
          this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
          this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
          this.dropPosition = -1;
        }

        this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
        this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
      }
      else {
        event.dataTransfer.dropEffect = 'none';
      }
    }
  }

  onColumnDragLeave(event) {
    if (this.reorderableColumns && this.draggedColumn) {
      event.preventDefault();
      this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
      this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
    }
  }

  onColumnDrop(event, dropColumn) {
    event.preventDefault();
    if (this.draggedColumn) {
      let dragIndex = this.domHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
      let dropIndex = this.domHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
      let allowDrop = (dragIndex != dropIndex);
      if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
        allowDrop = false;
      }

      if (allowDrop) {
        this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);

        this.onColReorder.emit({
          dragIndex: dragIndex,
          dropIndex: dropIndex,
          columns: this.columns
        });
      }

      this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
      this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
      this.draggedColumn.draggable = false;
      this.draggedColumn = null;
      this.dropPosition = null;
    }
  }

  onRowDragStart(event, index) {
    this.rowDragging = true;
    this.draggedRowIndex = index;
    event.dataTransfer.setData('text', 'b');    // For firefox
  }

  onRowDragOver(event, index, rowElement) {
    if (this.rowDragging && this.draggedRowIndex !== index) {
      let rowY = this.domHandler.getOffset(rowElement).top + this.domHandler.getWindowScrollTop();
      let pageY = event.pageY;
      let rowMidY = rowY + this.domHandler.getOuterHeight(rowElement) / 2;
      let prevRowElement = rowElement.previousElementSibling;

      if (pageY < rowMidY) {
        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');

        this.droppedRowIndex = index;
        if (prevRowElement)
          this.domHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
        else
          this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
      }
      else {
        if (prevRowElement)
          this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        else
          this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');

        this.droppedRowIndex = index + 1;
        this.domHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
      }
    }
  }

  onRowDragLeave(event, rowElement) {
    let prevRowElement = rowElement.previousElementSibling;
    if (prevRowElement) {
      this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
    }

    this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
    this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
  }

  onRowDragEnd(event) {
    this.rowDragging = false;
    this.draggedRowIndex = null;
    this.droppedRowIndex = null;
  }

  onRowDrop(event, rowElement) {
    if (this.droppedRowIndex != null) {
      let dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
      this.objectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);

      this.onRowReorder.emit({
        dragIndex: this.draggedRowIndex,
        dropIndex: this.droppedRowIndex
      });
    }
    //cleanup
    this.onRowDragLeave(event, rowElement);
    this.onRowDragEnd(event);
  }

  handleVirtualScroll(event) {
    this.first = (event.page - 1) * this.rows;
    this.virtualScrollCallback = event.callback;

    this.zone.run(() => {
      if(this.virtualScrollTimer) {
        clearTimeout(this.virtualScrollTimer);
      }

      this.virtualScrollTimer = setTimeout(() => {
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
      }, this.virtualScrollDelay);
    });
  }

  isEmpty() {
    let data = this.filteredValue||this.value;
    return data == null || data.length == 0;
  }

  getBlockableElement(): HTMLElement {
    //return this.el.nativeElement.children[0];
    return null;
  }

  ngOnDestroy() {
    this.editingCell = null;
    this.initialized = null;
  }
}

