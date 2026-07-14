import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

type TableColumns = NonNullable<ComponentProps<'oj-table'>['columns']>;
type ColumnKey = 'locationId' | 'managerId';

const departments = JSON.parse(deptDataText as string) as DepartmentData[];

const baseColumns: TableColumns = [
  { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
  { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' }
];

const optionalColumns: Record<ColumnKey, TableColumns[number]> = {
  locationId: { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
  managerId: { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
};

export const TableColumnAdditionTable = () => {
  const [columns, setColumns] = useState<TableColumns>(baseColumns);

  const dataprovider = useMemo(
    () =>
      new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(departments, {
        keyAttributes: 'DepartmentId'
      }),
    []
  );

  const hiddenColumns = useMemo(
    () =>
      new Set<ColumnKey>(
        (Object.keys(optionalColumns) as ColumnKey[]).filter((key) =>
          columns.some((column) => column.id === optionalColumns[key].id)
        )
      ),
    [columns]
  );

  const handleDragStartAddition = (event: DragEvent) => {
    if (!event.dataTransfer) {
      return;
    }
    event.dataTransfer.setData('text/plain', (event.target as Element).id);
  };

  const handleDropColumn = (event: DragEvent, context: ojTable.DropColumnContext) => {
    event.preventDefault();
    if (!event.dataTransfer) {
      return;
    }

    const columnId = event.dataTransfer.getData('text/plain') as ColumnKey;
    if (!(columnId in optionalColumns)) {
      return;
    }

    setColumns((currentColumns) => {
      if (currentColumns.some((column) => column.id === optionalColumns[columnId].id)) {
        return currentColumns;
      }

      const nextColumns = [...currentColumns];
      nextColumns.splice(context.columnIndex, 0, optionalColumns[columnId]);
      return nextColumns;
    });
  };

  const handleDragOverColumn = (event: DragEvent, _context: ojTable.DropColumnContext) => {
    event.preventDefault();
  };

  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'depName' },
    columnsDefault: { sortable: 'disabled' },
    dnd: {
      drop: {
        columns: {
          dataTypes: 'text/plain',
          drop: handleDropColumn,
          dragOver: handleDragOverColumn
        }
      }
    }
  };

  return (
    <div id="demo-container">
      <h3>Available Columns</h3>
      <p />
      <table class="demo-table">
        <tbody>
          <tr>
            <td class="oj-sm-padding-2x">
              {!hiddenColumns.has('locationId') ? (
                <span
                  id="locationId"
                  class="demo-draggable-element"
                  draggable={true}
                  onDragStart={handleDragStartAddition}
                >
                  <b>Location Id</b>
                </span>
              ) : null}
            </td>
            <td class="oj-sm-padding-2x">
              {!hiddenColumns.has('managerId') ? (
                <span
                  id="managerId"
                  class="demo-draggable-element"
                  draggable={true}
                  onDragStart={handleDragStartAddition}
                >
                  <b>Manager Id</b>
                </span>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
      <p />
      <oj-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        class="demo-table-container"
        columns={columns}
        {...ojTableProps}
      />
    </div>
  );
};

export default TableColumnAdditionTable;
