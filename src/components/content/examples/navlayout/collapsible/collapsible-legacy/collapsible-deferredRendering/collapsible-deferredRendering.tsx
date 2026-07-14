import 'ojs/ojcollapsible';
import 'ojs/ojdefer';
import 'ojs/ojtable';
import * as preact from 'preact';
import { type ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
};

const deptArray: Department[] = [
  { DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300 },
  { DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300 }
];

const columns: ComponentProps<'oj-table'>['columns'] = [
  { headerText: 'Department Id', field: 'DepartmentId', sortable: 'disabled' },
  { headerText: 'Department Name', field: 'DepartmentName', sortable: 'disabled' },
  { headerText: 'Location Id', field: 'LocationId', sortable: 'disabled' },
  { headerText: 'Manager Id', field: 'ManagerId', sortable: 'disabled' }
];

export const CollapsibleDeferredRendering = () => {
  const dataProvider = useMemo(
    () => new ArrayDataProvider<Department['DepartmentId'], Department>(deptArray, { keyAttributes: 'DepartmentId' }),
    []
  );

  return (
      <oj-collapsible id="defer">
            <h4 id="hd" slot="header">Deferred Content</h4>
            {preact.h('oj-defer', null, (
                    <oj-table id="table" aria-label="Departments Table" data={dataProvider} columns={columns} />
                ))}
        </oj-collapsible>
    );
};

export default CollapsibleDeferredRendering;
