import { h, ComponentProps } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import * as peopleData from "text!../data/peopleData.json";
import * as employeeData from "text!../data/employeeData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ItemContext } from "ojs/ojcommontypes";
import "ojs/ojknockout";
import "ojs/ojhighlighttext";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";
import { ojSelectSingle } from "ojs/ojselectsingle";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import "oj-c/select-single";
import "oj-c/list-item-layout";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "oj-c/form-layout";
import "oj-c/avatar";
import "oj-c/highlight-text";
import { CSelectSingleElement } from "oj-c/select-single";
import "oj-c/list-view";
import { CListViewElement } from "oj-c/list-view";
import "ojs/ojtable";
import 'oj-c/table';
import { ojTable } from "ojs/ojtable";


//  data types
type Person = {
  id: number;
  value: string;
  label: string;
};

type Employee = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

type OracleEmployee = {
  EMPLOYEE_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  PHONE_NUMBER: string;
  HIRE_DATE: string;
  SALARY: number;
  DEPARTMENT_ID: number;
  TITLE: string;
  IMAGE: string;
};

const browsers = [
  { value: 'IE', label: 'Internet Explorer' },
  { value: 'FF', label: 'Firefox' },
  { value: 'CH', label: 'Chrome' },
  { value: 'OP', label: 'Opera' },
  { value: 'SA', label: 'Safari' },
];

const browsersDP = new ArrayDataProvider(browsers, {
  keyAttributes: 'value',
});

// basic select single data
const employeesData: Array<Person> = [];

JSON.parse(peopleData).map((item: Employee) => {
  employeesData.push({ id: item.id, value: item.name, label: item.name });
});

const employeeDataProvider = new MutableArrayDataProvider<
  Person["value"],
  Person
>(employeesData, {
  keyAttributes: "value",
});

// item text data
const oracleEmployeeDataProvider = new MutableArrayDataProvider(
  JSON.parse(employeeData),
  {
    keyAttributes: "EMPLOYEE_ID",
    textFilterAttributes: ["FIRST_NAME", "LAST_NAME", "EMAIL"],
  }
);

type FormLayoutProps = ComponentProps<"oj-form-layout">;
type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const INIT_SELECTEDITEMS = new KeySetImpl([]) as KeySet<
  OracleEmployee["EMPLOYEE_ID"]
>;

 const tableColumns = [
      { headerText: 'First Name', field: 'FIRST_NAME', template: 'cellTemplate', id: 'first' },
      { headerText: 'Last Name', field: 'LAST_NAME', template: 'cellTemplate', id: 'last' },
      {
        headerText: 'Department',
        field: 'DEPARTMENT_ID',
        template: 'cellTemplate',
        id: 'depId'
      },
      { headerText: 'Salary', field: 'SALARY', template: 'cellTemplate', id: 'salary' }
 ];

const SelectSingleCorePack = () => {

  const [selectSingleData, setSelectSingleValue] = useState({
    selectedValue: "Chris Black",
  });

  const [selectedOracleEmployee, setOracleEmployeeSelectSingle] = useState<any>(
    { selectedValue: 102 }
  );

  const [selectedListViewItem, setListViewItem] = useState<any>({
    selectedValue: 103,
  });

   const [selectedCollTemplateItem, setCollectionTemplateValue] = useState<any>({
    selectedValue: 101,
  });

  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onBasicSelectSingleChange = (event: any) => {
    setSelectSingleValue({
      selectedValue: event.detail.value,
    });
  };

  const onItemTextSelectionChange = (event: any) => {
    setOracleEmployeeSelectSingle({
      selectedValue: event.detail.value,
    });
  };

   const onColTemplateValueChange = (event: any) => {
    setCollectionTemplateValue({
      selectedValue: event.detail.value,
    });
  };

  const getItemText = (
    itemContext: ItemContext<string, Record<string, string | number>>
  ) => {
    return `${itemContext.data.FIRST_NAME} ${itemContext.data.LAST_NAME}`;
  };
  

  const itemTemplateRenderer = (
      itemCtx: CSelectSingleElement.ItemTemplateContext<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee>
  ) => {
      return (
        <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
          <span className="oj-typography-body-md oj-text-color-primary">
            <oj-c-highlight-text
              text={itemCtx.item.data.FIRST_NAME +  " " + itemCtx.item.data.LAST_NAME }
              matchText={itemCtx.searchText}
            ></oj-c-highlight-text>
          </span>
          <oj-c-avatar
            slot="leading"
            role="img"
            size="xs"
            shape="circle"
            src={itemCtx.item.data.IMAGE}
            title={"Avatar of " + itemCtx.item.data.FIRST_NAME}
          ></oj-c-avatar>
          <span
            slot="secondary"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-c-highlight-text
              text={itemCtx.item.data.TITLE}
              matchText={itemCtx.searchText}
            ></oj-c-highlight-text>
          </span>
          <span
            slot="metadata"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-c-highlight-text
              text={itemCtx.item.data.PHONE_NUMBER}
              matchText={itemCtx.searchText}
            ></oj-c-highlight-text>
          </span>
        </oj-c-list-item-layout>
      );
  };
 

  const collectionTemplateRendererForListView = (
    collection: CSelectSingleElement.CollectionTemplateContext< 
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >
  ) => {
    const itemRenderer = (
      itemCtx: CSelectSingleElement.ItemTemplateContext<
        OracleEmployee["EMPLOYEE_ID"],
        OracleEmployee
      >
    ) => {
      return (
        <oj-c-list-item-layout class="oj-listitemlayout-padding-off">
          <span className="oj-typography-body-md oj-text-color-primary">
            <oj-highlight-text
              text={itemCtx.item.data.FIRST_NAME + " " + itemCtx.item.data.LAST_NAME}
              matchText={collection.searchText}
            ></oj-highlight-text>
          </span>
          <oj-avatar
            slot="leading"
            role="img"
            size="xs"
            shape="circle"
            src={itemCtx.item.data.IMAGE}
            title={"Avatar of " + itemCtx.item.data.FIRST_NAME}
          ></oj-avatar>
          <span
            slot="secondary"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-highlight-text
              text={itemCtx.item.data.TITLE}
              matchText={collection.searchText}
            ></oj-highlight-text>
          </span>
          <span
            slot="metadata"
            className="oj-typography-body-sm oj-text-color-secondary"
          >
            <oj-highlight-text
              text={itemCtx.item.data.PHONE_NUMBER}
              matchText={collection.searchText}
            ></oj-highlight-text>
          </span>
        </oj-c-list-item-layout>
      );
    };

    const handleRowAction = (
      event: CListViewElement.currentItemChanged<
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee>
      ) => {
      collection.onCurrentRowChanged({
        rowKey: event.detail.value 
      });
      setListViewItem({
        selectedValue: event.detail.value
      });
     };

    return (
      <oj-c-list-view
        id="listview"
        aria-label="list of employees"
        data={collection.data}
        selectionMode={"single"}
        selected={collection.selected} 
        currentItemOverride={collection.currentRowOverride}
        oncurrentItemChanged={handleRowAction}
        //oncurrentItemChanged={event => event.detail.value && collection.onCurrentRowChanged({ rowKey: event.detail.value })}
        onojItemAction={ event => collection.onRowAction({ item: event.detail.context.item }) }
        class="oj-select-results oj-group-header-sm"
      >
        <template
          slot="itemTemplate"
          render={itemRenderer}
        ></template>
      </oj-c-list-view>
    );
  };

  const collectionTemplateRendererForTabularView = (
    colCtx: CSelectSingleElement.CollectionTemplateContext< 
      OracleEmployee["EMPLOYEE_ID"],
      OracleEmployee
    >
  ) => {
   
    const cellRenderer =(cellCtx: ojTable.CellTemplateContext<any, any>) =>{
    return (
       <oj-c-highlight-text 
                text={String(cellCtx.data)}
                matchText={colCtx.searchText}
       ></oj-c-highlight-text> 
     );
    };

    const handleTableCurrentCellChanged = (event: any) => {
      const currentCell = event.detail.value as
        | { type?: string; rowKey?: OracleEmployee["EMPLOYEE_ID"] }
        | undefined;

      colCtx.onCurrentRowChanged({
        rowKey:
          currentCell && currentCell.type === "data"
            ? currentCell.rowKey
            : undefined,
      });
    };

    const handleTableRowAction = (event: any) => {
      colCtx.onRowAction({ item: event.detail.context.item });
    };

    return ( 
            <oj-c-table
                  aria-label='select results'
                  horizontal-grid-visible="disabled"
                  verticalGridVisible="disabled"
                  selectAllControl="hidden"
                  selectionMode ={{row: "single"}}
                  columns={tableColumns as any}
                  data={colCtx.data as any}
                  selected={{ row: colCtx.selected}}
                  currentCellOverride={colCtx.currentRowOverride}
                  oncurrentCellChanged={handleTableCurrentCellChanged}
                  onojRowAction={handleTableRowAction}
                  >
                <template
                  slot="cellTemplate"
                  render={cellRenderer}>
                </template>
             </oj-c-table>
           );
  };


  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-form-layout
        userAssistanceDensity={density}
        labelEdge="inside"
        columns={1}
        class="oj-md-margin-4x-horizontal"
        direction="row"
        maxColumns={3}
      >
        <h6 class="oj-typography-heading-sm">
          {" "}
          Select Single - Core Pack (Basic) 
        </h6>
         <oj-c-select-single
                data={browsersDP}
                itemText="label"
                labelHint="Select Single enabled with no value"></oj-c-select-single>

        <oj-c-select-single
          id="employeeSelector"
          labelHint="Select Single with ArrayDataProvider"
          labelEdge="inside"
          class="oj-form-control-max-width-md"
          data={employeeDataProvider}
          value={selectSingleData.selectedValue}
          onvalueChanged={onBasicSelectSingleChange}
          itemText="label"
        ></oj-c-select-single>

        <span>The selected values are: {selectSingleData.selectedValue} </span>

        <h6 class="oj-typography-heading-sm">
          {" "}
          Select Single Core pack (Item Text)
        </h6>  
        <oj-c-select-single
          id="itemTextSelector"
          labelHint="Select Single - Item text"
          data={oracleEmployeeDataProvider}
          value={selectedOracleEmployee.selectedValue}
          onvalueChanged={onItemTextSelectionChange}
          itemText={getItemText}
        ></oj-c-select-single>
        <span>
          The selected value is: {selectedOracleEmployee.selectedValue}{" "}
        </span>

        <h6 class="oj-typography-heading-sm"> Select Single (Item Template)</h6>

        <oj-c-select-single
          id="itemTemplateSelector"
          labelHint="Select single - Item Template"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedOracleEmployee.selectedValue}
          onvalueChanged={onItemTextSelectionChange}
          itemText={getItemText}
        >
          <template
            slot="itemTemplate"
            render={itemTemplateRenderer}
          ></template>
        </oj-c-select-single>
       <span>
          The selected value is: {selectedOracleEmployee.selectedValue}{" "}
        </span>

        <h4 class="oj-typography-heading-sm">
          Select Single (Collection Template - List View)
        </h4>
        <oj-c-select-single
          id="collectionTemplateSelector"
          labelHint="Select Single Collection Template for List View"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedListViewItem.selectedValue}
          itemText={getItemText}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplateRendererForListView}
          ></template>
        </oj-c-select-single>
         <span>The selected value is: {selectedListViewItem.selectedValue}</span> 


         <h6 class="oj-typography-heading-sm">
          Select Single (Collection Template - Tabular View)
        </h6>
        <oj-c-select-single
          id="tableCollectionTemplateSelector"
          labelHint="Select Single Collection Template for Tabular View"
          labelEdge="inside"
          data={oracleEmployeeDataProvider}
          value={selectedCollTemplateItem.selectedValue}
          itemText={getItemText}
          onvalueChanged={onColTemplateValueChange}
        >
          <template
            slot="collectionTemplate"
            render={collectionTemplateRendererForTabularView}
          ></template>
        </oj-c-select-single>
         <span>The selected value is: {selectedCollTemplateItem.selectedValue}</span> 
       
      </oj-form-layout>
  
    </div>
  );
};

export default SelectSingleCorePack;
