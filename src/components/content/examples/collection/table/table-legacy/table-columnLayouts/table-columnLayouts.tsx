import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojTable } from 'ojs/ojtable';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojtable';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojradioset';
import 'ojs/ojinputtext';

interface Employee {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type TableLayout = 'contents' | 'fixed';
type ColumnSizeValue = string | null;
type ColumnWeightValue = number | null;

export const TableColumnLayouts = () => {
  const [selectedLayout, setSelectedLayout] = useState<TableLayout>('contents');
  const [col1Width, setCol1Width] = useState<ColumnSizeValue>(null);
  const [col1MinWidth, setCol1MinWidth] = useState<ColumnSizeValue>('auto');
  const [col1MaxWidth, setCol1MaxWidth] = useState<ColumnSizeValue>(null);
  const [col1Weight, setCol1Weight] = useState<ColumnWeightValue>(1);
  const [col2Width, setCol2Width] = useState<ColumnSizeValue>(null);
  const [col2MinWidth, setCol2MinWidth] = useState<ColumnSizeValue>('auto');
  const [col2MaxWidth, setCol2MaxWidth] = useState<ColumnSizeValue>(null);
  const [col2Weight, setCol2Weight] = useState<ColumnWeightValue>(1);
  const [col3Width, setCol3Width] = useState<ColumnSizeValue>(null);
  const [col3MinWidth, setCol3MinWidth] = useState<ColumnSizeValue>('auto');
  const [col3MaxWidth, setCol3MaxWidth] = useState<ColumnSizeValue>(null);
  const [col3Weight, setCol3Weight] = useState<ColumnWeightValue>(1);
  const [col4Width, setCol4Width] = useState<ColumnSizeValue>(null);
  const [col4MinWidth, setCol4MinWidth] = useState<ColumnSizeValue>('auto');
  const [col4MaxWidth, setCol4MaxWidth] = useState<ColumnSizeValue>(null);
  const [col4Weight, setCol4Weight] = useState<ColumnWeightValue>(1);

  const deptArray: Employee[] = JSON.parse(deptData as string) as Employee[];
  const dataprovider = useMemo(() => new ArrayDataProvider<Employee['DepartmentId'], Employee>(deptArray, {
      keyAttributes: 'DepartmentId'
  }), [deptArray]);
  const layoutValues = useMemo(() => [
      { value: 'contents', label: 'contents' },
      { value: 'fixed', label: 'fixed' }
  ], []);
  const selectedLayoutDP = useMemo(() => new ArrayDataProvider(layoutValues, {
      keyAttributes: 'value'
  }), [layoutValues]);
  const tableColumns = useMemo(() => [
      {
          headerText: 'Department Id',
          field: 'DepartmentId',
          id: 'depId',
          width: col1Width,
          minWidth: col1MinWidth,
          maxWidth: col1MaxWidth,
          weight: col1Weight
      },
      {
          headerText: 'Department Name',
          field: 'DepartmentName',
          id: 'depName',
          width: col2Width,
          minWidth: col2MinWidth,
          maxWidth: col2MaxWidth,
          weight: col2Weight
      },
      {
          headerText: 'Location Id',
          field: 'LocationId',
          id: 'locId',
          width: col3Width,
          minWidth: col3MinWidth,
          maxWidth: col3MaxWidth,
          weight: col3Weight
      },
      {
          headerText: 'Manager Id',
          field: 'ManagerId',
          id: 'manId',
          width: col4Width,
          minWidth: col4MinWidth,
          maxWidth: col4MaxWidth,
          weight: col4Weight
      }
  ], [
      col1MaxWidth,
      col1MinWidth,
      col1Weight,
      col1Width,
      col2MaxWidth,
      col2MinWidth,
      col2Weight,
      col2Width,
      col3MaxWidth,
      col3MinWidth,
      col3Weight,
      col3Width,
      col4MaxWidth,
      col4MinWidth,
      col4Weight,
      col4Width
  ]);

  const handleSelectedLayoutValueChanged = (event: PropertyChangedEvent<TableLayout>) => {
    setSelectedLayout(event.detail.value ?? 'contents');
  };

  const updateTable = () => {
      (document.getElementById('table') as ojTable<Employee['DepartmentId'], Employee>).refresh();
  };

  return (
      <div id="container">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Table Below</h2>
                    <oj-form-layout max-columns="1" direction="row" class="oj-formlayout-full-width">
                              <oj-form-layout user-assistance-density="compact">
                                          <oj-label id="layoutLabel">Table layout:</oj-label>
                                          <oj-radioset id="radiosetBasicDemoId" labelled-by="layoutLabel" onvalueChanged={handleSelectedLayoutValueChanged} value={selectedLayout} options={selectedLayoutDP} />
                                      </oj-form-layout>
                              <oj-label-value label-edge="top">
                                          <oj-label slot="label">Column 1:</oj-label>
                                          <oj-form-layout slot="value" max-columns="4" direction="row" user-assistance-density="compact">
                                                        <oj-input-text label-hint="width" id="width1" value={col1Width} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="minWidth" id="minWidth1" value={col1MinWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="maxWidth" id="maxWidth1" value={col1MaxWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="weight" id="weight1" value={col1Weight} onvalueChanged={updateTable} />
                                                    </oj-form-layout>
                                      </oj-label-value>
                              <oj-label-value label-edge="top">
                                          <oj-label slot="label">Column 2:</oj-label>
                                          <oj-form-layout slot="value" max-columns="4" direction="row" user-assistance-density="compact">
                                                        <oj-input-text label-hint="width" id="width2" value={col2Width} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="minWidth" id="minWidth2" value={col2MinWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="maxWidth" id="maxWidth2" value={col2MaxWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="weight" id="weight2" value={col2Weight} onvalueChanged={updateTable} />
                                                    </oj-form-layout>
                                      </oj-label-value>
                              <oj-label-value label-edge="top">
                                          <oj-label slot="label">Column 3:</oj-label>
                                          <oj-form-layout slot="value" max-columns="4" direction="row" user-assistance-density="compact">
                                                        <oj-input-text label-hint="width" id="width3" value={col3Width} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="minWidth" id="minWidth3" value={col3MinWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="maxWidth" id="maxWidth3" value={col3MaxWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="weight" id="weight3" value={col3Weight} onvalueChanged={updateTable} />
                                                    </oj-form-layout>
                                      </oj-label-value>
                              <oj-label-value label-edge="top">
                                          <oj-label slot="label">Column 4:</oj-label>
                                          <oj-form-layout slot="value" max-columns="4" direction="row" user-assistance-density="compact">
                                                        <oj-input-text label-hint="width" id="width4" value={col4Width} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="minWidth" id="minWidth4" value={col4MinWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="maxWidth" id="maxWidth4" value={col4MaxWidth} onvalueChanged={updateTable} />
                                                        <oj-input-text label-hint="weight" id="weight4" value={col4Weight} onvalueChanged={updateTable} />
                                                    </oj-form-layout>
                                      </oj-label-value>
                          </oj-form-layout>
                </div>
            <oj-table id="table" aria-label="Departments Table" class="demo-table-container" data={dataprovider} layout={selectedLayout} columns={tableColumns} {...{ 'accessibility.row-header': "depName" }} />
        </div>
    );
};

export default TableColumnLayouts;
