import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as departmentDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import 'css!./demo.css';
type Department = {
    DepartmentId: number;
    DepartmentName: string;
    StartDate: string;
};
const compareDates = (left: string, right: string): number => {
    if (left === right) {
        return 0;
    }
    return new Date(left).getTime() < new Date(right).getTime() ? -1 : 1;
};
export const TableCustomSortableTable = () => {
    const departments = useMemo(() => JSON.parse(departmentDataText as string) as Department[], []);
    const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
        { headerText: 'Department Id', field: 'DepartmentId', id: 'depId', minWidth: '10rem' },
        { headerText: 'Department Name', field: 'DepartmentName', id: 'depName', minWidth: '10rem' },
        { headerText: 'Date', field: 'StartDate', id: 'start' }
    ], []);
    const columnsDefault = useMemo<ComponentProps<'oj-table'>['columnsDefault']>(() => ({ sortable: 'enabled' }), []);
    const dataProvider = useMemo(() => new ArrayDataProvider<number, Department>(departments, {
        keyAttributes: 'DepartmentId',
        sortComparators: {
            comparators: new Map().set('StartDate', compareDates)
        }
    }), [departments]);
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
        accessibility: {
            rowHeader: 'depName'
        }
    };
    return (<oj-table id="table" aria-label="Departments Table" data={dataProvider} layout="fixed" columnsDefault={columnsDefault} columns={columns} class="demo-table-container" {...ojTableProps}/>);
};
export default TableCustomSortableTable;
