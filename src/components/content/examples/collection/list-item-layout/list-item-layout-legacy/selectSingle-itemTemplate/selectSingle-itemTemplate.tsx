import 'css!./demo.css';
import 'ojs/ojavatar';
import 'ojs/ojhighlighttext';
import 'ojs/ojlistitemlayout';
import 'ojs/ojselectsingle';
import type { ojSelectSingle } from 'ojs/ojselectsingle';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as employeeDataText from 'text!../../../data/cookbook/formControls/selectSingle/itemTemplate/employeeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Employee = {
  EMPLOYEE_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  TITLE: string;
  PHONE_NUMBER: string;
  IMAGE: string;
};
type SelectSingleItemTemplateContext = ojSelectSingle.ItemTemplateContext<
  Employee['EMPLOYEE_ID'],
  Employee
>;
type SelectSingleValueChangedEvent = ojSelectSingle.valueChanged<
  Employee['EMPLOYEE_ID'],
  Employee
>;
type SelectSingleProps = ComponentProps<'oj-select-single'>;
type SelectSingleItemText = Extract<SelectSingleProps['itemText'], (itemContext: never) => string>;
type SelectSingleItemTextContext = Parameters<SelectSingleItemText>[0];

const employeeData = (JSON.parse(employeeDataText as string) as Employee[]).map((employee) => ({
  ...employee,
  IMAGE: `/styles/images/listItemImages/${employee.IMAGE.split('/').pop()}`
}));

export const SelectSingleItemTemplate = () => {
  const [selectVal, setSelectVal] = useState<number | null>(null);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(employeeData, {
        keyAttributes: 'EMPLOYEE_ID',
        textFilterAttributes: ['FIRST_NAME', 'LAST_NAME', 'TITLE', 'PHONE_NUMBER']
      }),
    []
  );

  const getItemText = (itemContext: SelectSingleItemTextContext) =>
    `${itemContext.data.FIRST_NAME} ${itemContext.data.LAST_NAME}`;

  const handleSelectValChanged = (event: SelectSingleValueChangedEvent) => {
    setSelectVal(event.detail.value ?? null);
  };

  const renderItemTemplate = (item: SelectSingleItemTemplateContext) => (
    <oj-list-item-layout class="oj-listitemlayout-padding-off">
      <span class="oj-typography-body-md oj-text-color-primary">
        <oj-highlight-text
          text={`${item.data.FIRST_NAME} ${item.data.LAST_NAME}`}
          matchText={item.searchText ?? undefined}
        />
      </span>
      <oj-avatar
        slot="leading"
        role="img"
        size="xs"
        src={item.data.IMAGE}
        aria-label={`Avatar of ${item.data.FIRST_NAME}`}
        title={`Avatar of ${item.data.FIRST_NAME}`}
      />
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        <oj-highlight-text text={item.data.TITLE} matchText={item.searchText ?? undefined} />
      </span>
      <span slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
        <oj-highlight-text
          text={item.data.PHONE_NUMBER}
          matchText={item.searchText ?? undefined}
        />
      </span>
    </oj-list-item-layout>
  );

  return (
    <div id="containerDiv">
      <oj-select-single
        id="select1"
        labelHint="Select Single"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={dataProvider}
        value={selectVal}
        onvalueChanged={handleSelectValChanged}
        itemText={getItemText}
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-select-single>
      <div class="oj-sm-margin-4x-top">
        <div>Current selected value</div>
        <span id="selectedval">{JSON.stringify(selectVal)}</span>
      </div>
    </div>
  );
};

export default SelectSingleItemTemplate;
