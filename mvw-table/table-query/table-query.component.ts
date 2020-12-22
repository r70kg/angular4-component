import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QueryConfig} from '../mvw-table.component';

@Component({
  selector: 'app-table-query',
  templateUrl: './table-query.component.html',
  styleUrls: ['./table-query.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableQueryComponent implements OnInit, OnChanges {
  @Input() config: any;
  @ViewChild('form', {static: true}) form: ElementRef;
  validateForm: FormGroup;
  parentComponent: any;

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    const filter = this.getFilterIds(this.config[0]);
    this.validateForm = this.fb.group(filter);
  }

  /*
  * 从config 中 获取查询参数
  * */
  private getFilterIds(query): any {
    return query.filter((field) => {
      return field.type !== 'button';
    }).map((field) => {
      const {
        id,
        value
      } = field;
      return {id, value};
    }).reduce((current, next) => {
      const {
        value,
        id
      } = next;
      return {...current, [id]: [value]};
    }, {});
  }

  setQueryOption(fieldId, option) {
    const field = this.config[0].find((field: QueryConfig) => {
      return fieldId === field.id;
    });
  }

  /*
  *获取查询参数
  * */
  getFilter() {
    return this.validateForm.value;
  }

  /*
  * 重置查询参数
  * */
  resetPage() {
    this.validateForm.reset();
  }

  onModelChange(field, query, value) {
    if (field.change) {
      field.change(query, value);
    }
  }

  onButtonClick(callBack) {
    return (form, buttons, index) => {
      return callBack(form, buttons[index]);
    };
  }

}
