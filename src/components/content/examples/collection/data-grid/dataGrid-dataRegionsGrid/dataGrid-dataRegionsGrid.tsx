import { h } from 'preact';
import type { ComponentProps } from 'preact';
type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import type { JetElementCustomEvent } from 'ojs/index';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojswitch';
import "css!./demo.css";
interface RegionRow {
    rowLabel: string;
    rowEndLabel: string;
    [key: string]: string | number;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<RegionRow>;
const createRows = (rowCount: number, columnCount: number): RegionRow[] => {
    return Array.from({ length: rowCount }, (_unused, rowIndex) => {
        const row: RegionRow = {
            rowLabel: `Row ${rowIndex + 1}`,
            rowEndLabel: rowIndex % 2 === 0 ? 'Even' : 'Odd'
        };
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            row[`c${columnIndex + 1}`] = (rowIndex + 1) * (columnIndex + 2);
        }
        return row;
    });
};
export const DataGridDataRegionsGrid = () => {
    const [rowCount, setRowCount] = useState<number>(24);
    const [columnCount, setColumnCount] = useState<number>(8);
    const [rowHeaderVisible, setRowHeaderVisible] = useState<boolean>(true);
    const [rowEndHeaderVisible, setRowEndHeaderVisible] = useState<boolean>(true);
    const [columnHeaderVisible, setColumnHeaderVisible] = useState<boolean>(true);
    const [columnEndHeaderVisible, setColumnEndHeaderVisible] = useState<boolean>(false);
    const [rowHeaderLabelsVisible, setRowHeaderLabelsVisible] = useState<boolean>(true);
    const [rowEndHeaderLabelsVisible, setRowEndHeaderLabelsVisible] = useState<boolean>(true);
    const [columnHeaderLabelsVisible, setColumnHeaderLabelsVisible] = useState<boolean>(true);
    const [columnEndHeaderLabelsVisible, setColumnEndHeaderLabelsVisible] = useState<boolean>(false);
    const [fetchDelay, setFetchDelay] = useState<number>(0);
    const [scrollPolicyValue, setScrollPolicyValue] = useState<'loadMoreOnScroll' | 'scroll'>('loadMoreOnScroll');
    const rows = useMemo(() => createRows(rowCount, columnCount), [rowCount, columnCount]);
    const columnKeys = useMemo(() => Array.from({ length: columnCount }, (_unused, index) => `c${index + 1}`), [columnCount]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, RegionRow>(rows, {
        keyAttributes: 'rowLabel'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, RegionRow>(rowDataProvider, {
        columns: {
            rowHeader: rowHeaderVisible ? ['rowLabel'] : undefined,
            databody: columnKeys,
            rowEndHeader: rowEndHeaderVisible ? ['rowEndLabel'] : undefined
        },
        columnHeaders: {
            column: columnHeaderVisible ? columnKeys.map((_key, index) => `Column ${index + 1}`) : undefined,
            columnEnd: columnEndHeaderVisible ? columnKeys.map((key) => `${key} End`) : undefined
        },
        headerLabels: {
            row: rowHeaderLabelsVisible ? ['Rows'] : undefined,
            rowEnd: rowEndHeaderLabelsVisible ? ['Row End'] : undefined,
            column: columnHeaderLabelsVisible ? ['Columns'] : undefined,
            columnEnd: columnEndHeaderLabelsVisible ? ['Column End'] : undefined
        }
    }), [columnEndHeaderLabelsVisible, columnEndHeaderVisible, columnHeaderLabelsVisible, columnHeaderVisible, columnKeys, rowDataProvider, rowEndHeaderLabelsVisible, rowEndHeaderVisible, rowHeaderLabelsVisible, rowHeaderVisible]);
    const handleNumberChange = (setter: (value: number) => void, min = 1) => (event: ValueChangedEvent<number | null>) => {
        setter(Math.max(min, event.detail.value ?? min));
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return <span>{cell.item.data.data}</span>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                sortable: 'disable',
                style: 'width:110px;'
            },
            column: {
                sortable: 'disable',
                style: 'width:120px;'
            },
            rowEnd: {
                style: 'width:90px;'
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setRowHeaderVisible(Boolean(event.detail.value))} value={rowHeaderVisible} labelHint="Row Headers"/>
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setRowHeaderLabelsVisible(Boolean(event.detail.value))} value={rowHeaderLabelsVisible} labelHint="Row Header Labels"/>
                              <oj-input-number min={1} step={1} max={200} onvalueChanged={handleNumberChange(setRowCount)} value={rowCount} labelHint="Rows"/>
                              <oj-input-number min={1} step={1} max={50} onvalueChanged={handleNumberChange(setColumnCount)} value={columnCount} labelHint="Columns"/>
                          </oj-form-layout>
                    <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setColumnHeaderVisible(Boolean(event.detail.value))} value={columnHeaderVisible} labelHint="Column Headers"/>
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setColumnHeaderLabelsVisible(Boolean(event.detail.value))} value={columnHeaderLabelsVisible} labelHint="Column Header Labels"/>
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setRowEndHeaderVisible(Boolean(event.detail.value))} value={rowEndHeaderVisible} labelHint="Row End Headers"/>
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setRowEndHeaderLabelsVisible(Boolean(event.detail.value))} value={rowEndHeaderLabelsVisible} labelHint="Row End Header Labels"/>
                          </oj-form-layout>
                    <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setColumnEndHeaderVisible(Boolean(event.detail.value))} value={columnEndHeaderVisible} labelHint="Column End Headers"/>
                              <oj-switch onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => setColumnEndHeaderLabelsVisible(Boolean(event.detail.value))} value={columnEndHeaderLabelsVisible} labelHint="Column End Header Labels"/>
                              <oj-input-number id="fetchDelayInput" min={0} step={50} onvalueChanged={handleNumberChange(setFetchDelay, 0)} value={fetchDelay} labelHint="Simulate Fetch Delay (ms)"/>
                              <div>
                                          <oj-label id="scrollPolicy">Scroll Policy</oj-label>
                                          <oj-buttonset-one class="oj-buttonset-width-auto" id="scrollPolicyButtonSet" onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>>[0]) => setScrollPolicyValue(event.detail.value)} value={scrollPolicyValue} labelledBy="scrollPolicy">
                                                        <oj-option value="loadMoreOnScroll">High-Water Mark</oj-option>
                                                        <oj-option value="scroll">Virtual</oj-option>
                                                    </oj-buttonset-one>
                                      </div>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid data regions demo" data={dataGridProvider} scrollPolicy={scrollPolicyValue} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
            <p class="oj-sm-margin-2x-top">Fetch delay is displayed for parity with the original demo, but this local replacement keeps all data in memory.</p>
        </div>);
};
export default DataGridDataRegionsGrid;
