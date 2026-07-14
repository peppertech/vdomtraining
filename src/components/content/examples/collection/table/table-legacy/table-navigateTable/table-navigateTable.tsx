import 'ojs/ojbutton';
import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
};

type View = 'table' | 'content';
type TableProps = ComponentProps<'oj-table'>;
type CurrentRow = NonNullable<TableProps['currentRow']>;
type ScrollPosition = TableProps['scrollPosition'];
type CurrentRowChangedEvent = Parameters<NonNullable<TableProps['oncurrentRowChanged']>>[0];
type ScrollPositionChangedEvent = Parameters<NonNullable<TableProps['onscrollPositionChanged']>>[0];

export const TableNavigateTable = () => {
  const [view, setView] = useState<View>('table');
  const [currentRow, setCurrentRow] = useState<CurrentRow>({ rowKey: 10 });
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ rowKey: 10 });

  const departments = useMemo<Department[]>(() => JSON.parse(deptData), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Department['DepartmentId'], Department>(departments, {
        keyAttributes: 'DepartmentId'
      }),
    [departments]
  );
  const columns = useMemo<TableProps['columns']>(
    () => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'DepartmentId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'DepartmentName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'LocationId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'ManagerId' }
    ],
    []
  );

  const selectedDepartment =
    departments.find((department) => department.DepartmentId === currentRow.rowKey) ?? departments[0];

  const handleCurrentRowChanged = (event: CurrentRowChangedEvent) => {
    setCurrentRow(event.detail.value as CurrentRow);
  };

  const handleScrollPositionChanged = (event: ScrollPositionChangedEvent) => {
    setScrollPosition(event.detail.value);
  };

  return (
    <div class="demo-module">
      {view === 'table' ? (
        <div class="demo-page">
          <div class="oj-sm-margin-2x-bottom">
            <oj-button onojAction={() => setView('content')}>View current row detail</oj-button>
          </div>
          <oj-table
            id="tableNavigateTable"
            aria-label="Departments Table"
            class="demo-table-container"
            data={dataProvider}
            columns={columns}
            currentRow={currentRow}
            scrollPosition={scrollPosition}
            oncurrentRowChanged={handleCurrentRowChanged}
            onscrollPositionChanged={handleScrollPositionChanged}
          />
        </div>
      ) : (
        <div class="demo-page oj-sm-padding-4x">
          <oj-button onojAction={() => setView('table')}>Back to table</oj-button>
          <div class="oj-panel oj-sm-margin-4x-top">
            <h4>{selectedDepartment.DepartmentName}</h4>
            <p>Department Id: {selectedDepartment.DepartmentId}</p>
            <p>Location Id: {selectedDepartment.LocationId}</p>
            <p>Manager Id: {selectedDepartment.ManagerId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableNavigateTable;
