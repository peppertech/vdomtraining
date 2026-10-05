import 'css!./demo.css';
import 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

export default function TableCustomContextMenuTablecorepack() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('None selected yet');
  const [launchedFrom, setLaunchedFrom] = useState('None launched yet');
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
    depId: { headerText: 'Department Id', field: 'DepartmentId' },
    depName: { headerText: 'Department Name', field: 'DepartmentName' },
    locId: { headerText: 'Location Id', field: 'LocationId' },
    manId: { headerText: 'Manager Id', field: 'ManagerId' }
  }), []);
  const departments = useMemo<DepartmentData[]>(() => JSON.parse(deptData as string) as DepartmentData[], []);
  const dataProvider = useMemo(() => new ArrayDataProvider<number, DepartmentData>(departments, {
    keyAttributes: 'DepartmentId'
  }), [departments]);
  const contextMenuConfig: NonNullable<ComponentProps<'oj-c-table'>['contextMenuConfig']> = {
    accessibleLabel: 'Departments actions',
    items: (context) => {
      setLaunchedFrom(context.type === 'data'
        ? `Cell: [${context.rowKey}, ${context.columnKey}]`
        : `Header: [${context.columnKey}]`);
      return [
        { label: 'My First Item', key: 'first', onAction: () => setSelectedMenuItem('My First Item') },
        ...(context.hasDefaultMenuItems ? [
          { type: 'separator' as const },
          'defaultMenuItems' as const,
          { type: 'separator' as const }
        ] : [{ type: 'separator' as const }]),
        { label: 'My Other Item', key: 'other', onAction: () => setSelectedMenuItem('My Other Item') }
      ];
    }
  };

  return (
    <div id="tableWrapper">
      <oj-c-table
        id="table"
        aria-label="Departments Table"
        data={dataProvider}
        columns={columns}
        row={{ accessibleRowHeader: 'depName' }}
        contextMenuConfig={contextMenuConfig}
        class="demo-table-container"
      />
      <p class="bold">
        Last selected menu item: <span id="results1">{selectedMenuItem}</span>
      </p>
      <p class="bold">
        Launched from: <span id="results">{launchedFrom}</span>
      </p>
    </div>
  );
}

export { TableCustomContextMenuTablecorepack };
