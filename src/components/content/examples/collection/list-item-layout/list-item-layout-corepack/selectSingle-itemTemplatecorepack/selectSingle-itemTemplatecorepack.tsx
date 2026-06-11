// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as employeeDataText from 'text!./employeeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import type { CSelectSingleElement } from 'oj-c/select-single';
import 'oj-c/select-single';
import 'oj-c/highlight-text';
import 'oj-c/list-item-layout';
import 'oj-c/avatar';
import 'css!./demo.css';

type Employee = {
  EMPLOYEE_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  TITLE: string;
  PHONE_NUMBER: string;
  IMAGE: string;
};
type SelectSingleItemTemplateContext = CSelectSingleElement.ItemTemplateContext<
  Employee['EMPLOYEE_ID'],
  Employee
>;
type SelectSingleValueChangedEvent = CSelectSingleElement.valueChanged<
  Employee['EMPLOYEE_ID'],
  Employee
>;

const employeeData = (JSON.parse(employeeDataText as string) as Employee[]).map((employee) => ({
  ...employee,
  IMAGE: `/styles/images/listItemImages/${employee.IMAGE.split('/').pop()}`
}));

export const SelectSingleItemTemplatecorepack = () => {
  const [selectVal, setSelectVal] = useState<number | null>(null);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(employeeData, {
        keyAttributes: 'EMPLOYEE_ID',
        textFilterAttributes: ['FIRST_NAME', 'LAST_NAME', 'TITLE', 'PHONE_NUMBER']
      }),
    []
  );

  const getItemText = (itemContext: SelectSingleItemTemplateContext) =>
    `${itemContext.data.FIRST_NAME} ${itemContext.data.LAST_NAME}`;

  const handleSelectValChanged = (event: SelectSingleValueChangedEvent) => {
    setSelectVal(event.detail.value ?? null);
  };

  const renderItemTemplate = (item: SelectSingleItemTemplateContext) => (
    <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
      <span class="oj-typography-body-md oj-text-color-primary">
        <oj-c-highlight-text
          text={`${item.item.data.FIRST_NAME} ${item.item.data.LAST_NAME}`}
          matchText={item.searchText ?? undefined}
        />
      </span>
      <oj-c-avatar
        slot="leading"
        role="img"
        size="xs"
        src={item.item.data.IMAGE}
        aria-label={`Avatar of ${item.item.data.FIRST_NAME}`}
        title={`Avatar of ${item.item.data.FIRST_NAME}`}
      />
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        <oj-c-highlight-text text={item.item.data.TITLE} matchText={item.searchText ?? undefined} />
      </span>
      <span slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
        <oj-c-highlight-text
          text={item.item.data.PHONE_NUMBER}
          matchText={item.searchText ?? undefined}
        />
      </span>
    </oj-c-list-item-layout>
  );

  return (
    <div id="containerDiv">
      <oj-c-select-single
        id="select1"
        labelHint="Select Single"
        labelEdge="inside"
        maxWidth="md"
        data={dataProvider}
        value={selectVal}
        onvalueChanged={handleSelectValChanged}
        itemText={getItemText}
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-c-select-single>
      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
};

export default SelectSingleItemTemplatecorepack;
