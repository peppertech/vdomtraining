import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as deptData from 'text!../../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    StartDate: string;
}

export const TableCustomSortableTable = () => {
  const deptArray: DepartmentData[] = JSON.parse(deptData as string) as DepartmentData[];
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId', minWidth: '10rem' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName', minWidth: '10rem' },
      { headerText: 'Date', field: 'StartDate', id: 'start' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' },
      columnsDefault: { sortable: 'enabled' }
  };
  const dataprovider = useMemo(() => new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(deptArray, {
      keyAttributes: 'DepartmentId',
      sortComparators: {
          comparators: new Map().set('StartDate', comparator)
      }
  }), [deptArray]);

  const comparator = (a: string, b: string) => {
      if (a === b) {
          return 0;
      }
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      return dateA < dateB ? -1 : 1;
  };

  return (
      <oj-table id="table" aria-label="Departments Table" data={dataprovider} layout="fixed" columns={columns} class="demo-table-container" {...ojTableProps} />
    );
};

export default TableCustomSortableTable;
