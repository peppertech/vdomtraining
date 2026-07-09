import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import type { ojTable } from 'ojs/ojtable';
import * as departmentDataText from 'text!./departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import 'css!./demo.css';

type Department = {
    DepartmentId: number;
    DepartmentName: string;
    StartDate: string;
};

type SortDetails = {
    header: string;
    direction: 'ascending' | 'descending';
};

const columnLabels: Record<string, string> = {
    DepartmentId: 'Department Id',
    depId: 'Department Id',
    DepartmentName: 'Department Name',
    depName: 'Department Name',
    StartDate: 'Date',
    start: 'Date'
};

const compareDates = (left: string, right: string): number => {
    if (left === right) {
        return 0;
    }
    return new Date(left).getTime() < new Date(right).getTime() ? -1 : 1;
};

export const TableColumnSortingcorepack = () => {
    const [sortDetails, setSortDetails] = useState<SortDetails | null>(null);
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

    const handleSort = (event: ojTable.ojSort) => {
        setSortDetails({
            header: event.detail.header,
            direction: event.detail.direction
        });
    };

    return (
        <div class="demo-column-sorting-container">
            <section
                class="demo-column-sorting-details-panel"
                aria-labelledby="current-sorting-details-heading">
                <div class="demo-column-sorting-details-card" aria-live="polite">
                    <h2 id="current-sorting-details-heading">Current Sorting Details</h2>
                    {sortDetails && (
                        <dl class="demo-column-sorting-details-list">
                            <div>
                                <dt>Column</dt>
                                <dd>{columnLabels[sortDetails.header] ?? sortDetails.header}</dd>
                            </div>
                            <div>
                                <dt>Direction</dt>
                                <dd>{sortDetails.direction === 'ascending' ? 'Ascending' : 'Descending'}</dd>
                            </div>
                        </dl>
                    )}
                </div>
            </section>
            <oj-table
                id="table"
                aria-label="Departments Table"
                data={dataProvider}
                layout="fixed"
                columnsDefault={columnsDefault}
                columns={columns}
                class="demo-column-sorting-table"
                onojSort={handleSort}
                {...ojTableProps}/>
        </div>
    );
};

export default TableColumnSortingcorepack;
