import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component, ContentChild, ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {TableQueryComponent} from './table-query/table-query.component';
import {TableBodyComponent} from './table-body/table-body.component';
import {PageTitleComponent} from '../page-title/page-title.component';


export interface QueryConfig {
  label: string;
  type: string;
  id: string;
  value?: any;
  placeholder?: string;
  option?: any[];
  span?: number;
  labelSpan?: number;
  controlSpan?: number;
  change?: any;

}

export interface TableConfig {
  title?: any;
  query?: any;
  column: any[];
  pageSizeChange: any;
  currentPageIndexChange: any;
}

@Component({
  selector: 'app-mvw-table2',
  templateUrl: './mvw-table.component.html',
  styleUrls: ['./mvw-table.component.css']
})
export class MvwTableComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, AfterContentChecked {
  @Input() config: TableConfig;
  @Input() modelData: any;
  @ViewChild('tableContainer', {static: true}) tableContainer: ElementRef;
  @ViewChild('tableQuery', {static: true}) tableQuery: TableQueryComponent;
  @ViewChild('tableBody', {static: true}) tableBody: TableBodyComponent;
  @ContentChild(PageTitleComponent, {static: true}) content: PageTitleComponent;
  scrollHeight: number;
  parentComponent: any;

  constructor(
    private rd2: Renderer2
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentChecked() {

  }

  setQuery(fieldId, option) {
    this.tableQuery.setQueryOption(fieldId, option);
  }

  private getScrollHeight() {
    const container = this.tableContainer.nativeElement;
    const form = this.tableQuery.form;
    let formHeight = '0px';
    let pageTitleHeight = '0px';
    const pageTitle = this.content.pageContainer;
    if (pageTitle) {
      const pageTitleEl = pageTitle.nativeElement;
      const pageTitleStyle = window.getComputedStyle(pageTitleEl);
      pageTitleHeight = pageTitleStyle.getPropertyValue('height');
    }
    if (form) {
      const formStyle = window.getComputedStyle(form.nativeElement);
      formHeight = formStyle.getPropertyValue('height');
    }
    const containerStyle = window.getComputedStyle(container);
    const containerHeight = containerStyle.getPropertyValue('height');
    const scrollHeight = Number.parseFloat(containerHeight) - Number.parseFloat(formHeight) - Number.parseFloat(pageTitleHeight);
    return scrollHeight;

  }

  ngAfterViewChecked(): void {
    this.bindTable();
    setTimeout(() => {
      this.scrollHeight = this.getScrollHeight();
    }, 0);
  }

  bindTable() {
    if (!this.tableQuery.parentComponent) {
      this.tableQuery.parentComponent = this;
    }
    if (!this.tableBody.parentComponent) {
      this.tableBody.parentComponent = this;
    }
  }


}
