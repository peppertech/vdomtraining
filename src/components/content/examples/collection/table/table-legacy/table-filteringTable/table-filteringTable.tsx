import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ListDataProviderView = require('ojs/ojlistdataproviderview');
import { ojTable } from 'ojs/ojtable';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import { FilterFactory } from 'ojs/ojdataprovider';
import 'ojs/ojtable';
import 'ojs/ojinputtext';
import 'ojs/ojformlayout';

interface DepartmentSource {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

interface EmployeeData {
  DepartmentId: string;
  DepartmentName: string;
  LocationId: string;
  ManagerId: string;
}

type TableColumns = ComponentProps<'oj-table'>['columns'];
type FilterChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];

const baseDeptArray = JSON.parse(deptDataText as string) as DepartmentSource[];

const generateDeptArray = (num: number) => {
  const deptArray: Array<EmployeeData> = [];
  let count = 0;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < baseDeptArray.length; j++) {
      deptArray[count] = {
        DepartmentId: `${baseDeptArray[j].DepartmentId}${count}`,
        DepartmentName: `${baseDeptArray[j].DepartmentName}${count}`,
        LocationId: `${baseDeptArray[j].LocationId}`,
        ManagerId: `${baseDeptArray[j].ManagerId}`
      };
      count++;
    }
  }
  return deptArray;
};

export const TableFilteringTable = () => {
  const [filter, setFilter] = useState('');
  const [rowCount, setRowCount] = useState('');

  const deptArray = useMemo(() => generateDeptArray(1000), []);
  const arrayDataProvider = useMemo(
    () => new ArrayDataProvider<EmployeeData['DepartmentId'], EmployeeData>(deptArray, { keyAttributes: 'DepartmentId' }),
    [deptArray]
  );
  const dataprovider = useMemo(() => {
    const filterCriterion =
      filter !== ''
        ? FilterFactory.getFilter({
            filterDef: { text: filter }
          })
        : undefined;

    return new ListDataProviderView<string, EmployeeData, string, EmployeeData>(arrayDataProvider, {
      includeFilteredRowCount: 'enabled',
      filterCriterion
    });
  }, [arrayDataProvider, filter]);

  useEffect(() => {
    const observable = dataprovider.getTotalFilteredRowCountObservable();
    if (!observable) {
      setRowCount('');
      return;
    }
    const subscriber = observable.subscribe((value) => {
      if (value.type === 'exact') {
        setRowCount(value.count.toString());
      } else if (value.type === 'notFetched') {
        setRowCount('Not Fetched');
      } else {
        setRowCount('');
      }
    });

    return () => subscriber.unsubscribe?.();
  }, [dataprovider]);

  const highlightingCellRenderer = (context: ojTable.ColumnsRendererContext<EmployeeData['DepartmentId'], EmployeeData>) => {
    const fields: Array<keyof EmployeeData> = ['DepartmentId', 'DepartmentName', 'LocationId', 'ManagerId'];
    const field = fields[context.columnIndex] ?? 'DepartmentId';
    const data = String(context.row[field] ?? '');
    const filterString = filter;
    const spanNode = document.createElement('span');

    if (filterString.length > 0) {
      const index = data.toLowerCase().indexOf(filterString.toLowerCase());
      if (index > -1) {
        if (index !== 0) {
          spanNode.appendChild(document.createTextNode(data.slice(0, index)));
        }
        const bold = document.createElement('b');
        bold.appendChild(document.createTextNode(data.slice(index, index + filterString.length)));
        spanNode.appendChild(bold);
        if (index + filterString.length < data.length) {
          spanNode.appendChild(document.createTextNode(data.slice(index + filterString.length)));
        }
      } else {
        spanNode.appendChild(document.createTextNode(data));
      }
    } else {
      spanNode.appendChild(document.createTextNode(data));
    }

    context.parentElement?.appendChild(spanNode);
  };

  const columnArray = useMemo<TableColumns>(
    () => [
      { headerText: 'Department Id', renderer: highlightingCellRenderer, id: 'depId', field: 'DepartmentId' },
      { headerText: 'Department Name', renderer: highlightingCellRenderer, id: 'depName', field: 'DepartmentName' },
      { headerText: 'Location Id', renderer: highlightingCellRenderer, id: 'locId', field: 'LocationId' },
      { headerText: 'Manager Id', renderer: highlightingCellRenderer, id: 'manId', field: 'ManagerId' }
    ],
    [filter]
  );

  const handleFilterValueChanged = (event: FilterChangedEvent) => {
    setFilter(event.detail.value ?? '');
  };

  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'depName' },
    columnsDefault: { sortable: 'disabled' }
  };

  return (
    <div id="mainContent">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-text
          id="filter"
          class="oj-form-control-max-width-md"
          labelHint="Filter"
          labelEdge="inside"
          placeholder="Type to filter"
          onvalueChanged={handleFilterValueChanged}
          value={filter}
          clearIcon="always"
        />
        <span>
          Filtered Row Count:
          {rowCount}
        </span>
      </oj-form-layout>
      <oj-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        scrollPolicy="loadMoreOnScroll"
        columns={columnArray}
        class="demo-table-container"
        {...ojTableProps}
      />
    </div>
  );
};

export default TableFilteringTable;
