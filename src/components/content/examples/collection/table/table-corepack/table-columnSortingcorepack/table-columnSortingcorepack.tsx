import 'css!./demo.css';
import 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as departmentDataText from 'text!./departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Department = {
    DepartmentId: number;
    DepartmentName: string;
    StartDate: string;
};

type SortColumn = 'DepartmentId' | 'DepartmentName' | 'StartDate';
type SortDirection = 'ascending' | 'descending';

const columnLabels: Record<SortColumn, string> = {
    DepartmentId: 'Department Id',
    DepartmentName: 'Department Name',
    StartDate: 'Date'
};

const compareDates = (left: string, right: string): number =>
    new Date(left).getTime() - new Date(right).getTime();

export default function TableColumnSortingcorepack() {
    const [sortColumn, setSortColumn] = useState<SortColumn>('DepartmentId');
    const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');
    const departments = useMemo(() => JSON.parse(departmentDataText as string) as Department[], []);
    const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
        departmentId: { headerText: 'Department Id', field: 'DepartmentId' },
        departmentName: { headerText: 'Department Name', field: 'DepartmentName' },
        startDate: { headerText: 'Date', field: 'StartDate' }
    }), []);
    const sortedDepartments = useMemo(() => [...departments].sort((left, right) => {
        let comparison: number;
        if (sortColumn === 'DepartmentId') {
            comparison = left.DepartmentId - right.DepartmentId;
        } else if (sortColumn === 'StartDate') {
            comparison = compareDates(left.StartDate, right.StartDate);
        } else {
            comparison = left.DepartmentName.localeCompare(right.DepartmentName);
        }
        return sortDirection === 'ascending' ? comparison : -comparison;
    }), [departments, sortColumn, sortDirection]);
    const dataProvider = useMemo(() => new ArrayDataProvider<number, Department>(sortedDepartments, {
        keyAttributes: 'DepartmentId'
    }), [sortedDepartments]);

    return (
        <div class="demo-column-sorting-container">
            <section
                class="demo-column-sorting-details-panel"
                aria-labelledby="current-sorting-details-heading">
                <div class="demo-column-sorting-controls">
                    <label for="sortColumn">Sort by</label>
                    <select
                        id="sortColumn"
                        value={sortColumn}
                        onChange={(event) => setSortColumn(event.currentTarget.value as SortColumn)}>
                        <option value="DepartmentId">Department Id</option>
                        <option value="DepartmentName">Department Name</option>
                        <option value="StartDate">Date</option>
                    </select>
                    <label for="sortDirection">Direction</label>
                    <select
                        id="sortDirection"
                        value={sortDirection}
                        onChange={(event) => setSortDirection(event.currentTarget.value as SortDirection)}>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
                <div class="demo-column-sorting-details-card" aria-live="polite">
                    <h2 id="current-sorting-details-heading">Current Sorting Details</h2>
                    <dl class="demo-column-sorting-details-list">
                        <div>
                            <dt>Column</dt>
                            <dd>{columnLabels[sortColumn]}</dd>
                        </div>
                        <div>
                            <dt>Direction</dt>
                            <dd>{sortDirection === 'ascending' ? 'Ascending' : 'Descending'}</dd>
                        </div>
                    </dl>
                </div>
            </section>
            <oj-c-table
                id="table"
                aria-label="Departments Table"
                data={dataProvider}
                layout="fixed"
                columns={columns}
                columnOrder={['departmentId', 'departmentName', 'startDate']}
                row={{ accessibleRowHeader: 'departmentName' }}
                class="demo-column-sorting-table" />
        </div>
    );
}

export { TableColumnSortingcorepack };
