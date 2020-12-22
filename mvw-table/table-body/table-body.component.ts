import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {config, Observable} from 'rxjs';

interface ModelData {
  listOfAllData: any[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
}

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent implements OnInit, OnChanges {
  @Input() config: any;
  @Input() modelData: ModelData;
  @Input() pageSizeOptions = [10, 20, 30, 40, 50];
  @Input() scrollHeight: number = 300;
  currentPage: number;
  nzTotal: number;
  loading = true;
  loadingDelay = 500;
  showSizeChanger = true;
  bordered = true;
  frontPagination = false;
  showPagination = true;
  tableBodyConfig: any;

  parentComponent: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      modelData
    } = changes;
    if (modelData) {
      const {
        firstChange
      } = modelData;
      if (!firstChange) {
        this.loading = false;
      }
    }
  }

  ngOnInit() {
    this.tableBodyConfig = this.getTableBodyFields(this.config.column);
  }

  onPageSizeChange(pageSize: number) {
    this.loading = true;
    this.config.pageSizeChange(pageSize);
  }

  onCurrentPageIndexChange(pageNum: number) {
    this.loading = true;
    this.config.currentPageIndexChange(pageNum);
  }

  trackFunc(item) {
    return item.id;
  }

  private isArray(columnItem) {
    return Array.isArray(columnItem);
  }

  private getTableBodyFields(columnConfig): any {
    if (columnConfig && columnConfig.length > 0) {
      return columnConfig.reduce((current, next, index) => {
        return [...current, ...next];
      }, []).filter((item) => {
        if (!item.colspan) {
          return item;
        }
        return item.colspan == 1;
      }).sort((a, b) => a.index - b.index);
    }
    return [];
  }

  get widthConfig() {
    return this.tableBodyConfig.map((field) => {
      const {
        width
      } = field;
      return width;
    });
  }

  get scrollWidth() {
    return this.tableBodyConfig.map((field) => {
      const {
        width
      } = field;
      return Number.parseInt(width, 10);
    }).reduce((current, next) => {
      return current + next;
    }, 0);
  }

  get scrollConfig() {
    return {
      x: `${this.scrollWidth}px`,
      y: `${this.scrollHeight}px`,
    };
  }


}
