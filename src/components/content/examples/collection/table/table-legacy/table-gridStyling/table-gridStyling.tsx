import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import 'ojs/ojradioset';
import 'ojs/ojformlayout';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojoption';

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

type DisplayOption = 'list' | 'grid';
type GridVisibleOption = 'auto' | 'disabled' | 'enabled';
type RadioChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

export const TableGridStyling = () => {
  const [currentDisplayOption, setCurrentDisplayOption] = useState<DisplayOption>('list');
  const [currentHorizontalGridVisible, setCurrentHorizontalGridVisible] = useState<GridVisibleOption>('auto');
  const [currentVerticalGridVisible, setCurrentVerticalGridVisible] = useState<GridVisibleOption>('auto');
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(
    () => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
    ],
    []
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'depName' },
    columnsDefault: { sortable: 'enabled' }
  };

  const departments = JSON.parse(deptDataText as string) as DepartmentData[];
  const dataprovider = useMemo(
    () => new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(departments, { keyAttributes: 'DepartmentId' }),
    []
  );

  const handleCurrentDisplayOptionValueChanged = (event: RadioChangedEvent) => {
    setCurrentDisplayOption((event.detail.value ?? 'list') as DisplayOption);
  };

  const handleCurrentHorizontalGridVisibleValueChanged = (event: RadioChangedEvent) => {
    setCurrentHorizontalGridVisible((event.detail.value ?? 'auto') as GridVisibleOption);
  };

  const handleCurrentVerticalGridVisibleValueChanged = (event: RadioChangedEvent) => {
    setCurrentVerticalGridVisible((event.detail.value ?? 'auto') as GridVisibleOption);
  };

  return (
    <div id="demoContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-form-layout id="formLayoutOptions" maxColumns={4} direction="row">
          <oj-radioset
            onvalueChanged={handleCurrentDisplayOptionValueChanged}
            value={currentDisplayOption}
            labelHint="Display Option"
            aria-controls="table"
          >
            <oj-option value="list">List</oj-option>
            <oj-option value="grid">Grid</oj-option>
          </oj-radioset>
          <oj-radioset
            onvalueChanged={handleCurrentHorizontalGridVisibleValueChanged}
            value={currentHorizontalGridVisible}
            labelHint="Horizontal Grid Visible"
            aria-controls="table"
          >
            <oj-option value="auto">Auto</oj-option>
            <oj-option value="disabled">Disabled</oj-option>
            <oj-option value="enabled">Enabled</oj-option>
          </oj-radioset>
          <oj-radioset
            onvalueChanged={handleCurrentVerticalGridVisibleValueChanged}
            value={currentVerticalGridVisible}
            labelHint="Vertical Grid Visible"
            aria-controls="table"
          >
            <oj-option value="auto">Auto</oj-option>
            <oj-option value="disabled">Disabled</oj-option>
            <oj-option value="enabled">Enabled</oj-option>
          </oj-radioset>
        </oj-form-layout>
      </div>
      <oj-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        display={currentDisplayOption}
        horizontalGridVisible={currentHorizontalGridVisible}
        class="demo-table-container"
        verticalGridVisible={currentVerticalGridVisible}
        columns={columns}
        {...ojTableProps}
      />
    </div>
  );
};

export default TableGridStyling;
