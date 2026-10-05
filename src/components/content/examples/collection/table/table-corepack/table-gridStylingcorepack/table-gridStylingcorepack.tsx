import 'ojs/ojformlayout';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'oj-c/table';
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

type GridVisibleOption = 'disabled' | 'enabled';
type RadioChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

export default function TableGridStylingcorepack() {
  const [currentHorizontalGridVisible, setCurrentHorizontalGridVisible] = useState<GridVisibleOption>('disabled');
  const [currentVerticalGridVisible, setCurrentVerticalGridVisible] = useState<GridVisibleOption>('disabled');
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(
    () => ({
      depId: { headerText: 'Department Id', field: 'DepartmentId' },
      depName: { headerText: 'Department Name', field: 'DepartmentName' },
      locId: { headerText: 'Location Id', field: 'LocationId' },
      manId: { headerText: 'Manager Id', field: 'ManagerId' }
    }),
    []
  );

  const departments = JSON.parse(deptDataText as string) as DepartmentData[];
  const dataprovider = useMemo(
    () => new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(departments, { keyAttributes: 'DepartmentId' }),
    []
  );

  const handleCurrentHorizontalGridVisibleValueChanged = (event: RadioChangedEvent) => {
    setCurrentHorizontalGridVisible((event.detail.value ?? 'disabled') as GridVisibleOption);
  };

  const handleCurrentVerticalGridVisibleValueChanged = (event: RadioChangedEvent) => {
    setCurrentVerticalGridVisible((event.detail.value ?? 'disabled') as GridVisibleOption);
  };

  return (
    <div id="demoContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-form-layout id="formLayoutOptions" maxColumns={4} direction="row">
          <oj-radioset
            onvalueChanged={handleCurrentHorizontalGridVisibleValueChanged}
            value={currentHorizontalGridVisible}
            labelHint="Horizontal Grid Visible"
            aria-controls="table"
          >
            <oj-option value="disabled">Disabled</oj-option>
            <oj-option value="enabled">Enabled</oj-option>
          </oj-radioset>
          <oj-radioset
            onvalueChanged={handleCurrentVerticalGridVisibleValueChanged}
            value={currentVerticalGridVisible}
            labelHint="Vertical Grid Visible"
            aria-controls="table"
          >
            <oj-option value="disabled">Disabled</oj-option>
            <oj-option value="enabled">Enabled</oj-option>
          </oj-radioset>
        </oj-form-layout>
      </div>
      <oj-c-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        horizontalGridVisible={currentHorizontalGridVisible}
        class="demo-table-container"
        verticalGridVisible={currentVerticalGridVisible}
        columns={columns}
        row={{ accessibleRowHeader: 'depName' }}
      />
    </div>
  );
}

export { TableGridStylingcorepack };
