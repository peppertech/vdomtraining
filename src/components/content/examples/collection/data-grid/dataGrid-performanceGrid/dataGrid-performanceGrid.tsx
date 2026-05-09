import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import type { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojoption';
import "css!./demo.css";
interface PerformanceRow {
    rowLabel: string;
    [key: string]: string | number;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<PerformanceRow>;
const buildRows = (rowCount: number, columnCount: number) => {
    return Array.from({ length: rowCount }, (_unused, rowIndex) => {
        const row: PerformanceRow = {
            rowLabel: `Row ${rowIndex + 1}`
        };
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            row[`c${columnIndex + 1}`] = (rowIndex + 1) * (columnIndex + 1);
        }
        return row;
    });
};
export const DataGridPerformanceGrid = () => {
    const [rowCount, setRowCount] = useState<number>(100);
    const [columnCount, setColumnCount] = useState<number>(30);
    const [scrollPolicyValue, setScrollPolicyValue] = useState<'loadMoreOnScroll' | 'scroll'>('loadMoreOnScroll');
    const [renderTime, setRenderTime] = useState<string>('');
    const [version, setVersion] = useState<number>(0);
    const rows = useMemo(() => buildRows(rowCount, columnCount), [columnCount, rowCount, version]);
    const columns = useMemo(() => Array.from({ length: columnCount }, (_unused, index) => `c${index + 1}`), [columnCount]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, PerformanceRow>(rows, {
        keyAttributes: 'rowLabel'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, PerformanceRow>(rowDataProvider, {
        columns: {
            rowHeader: ['rowLabel'],
            databody: columns
        },
        columnHeaders: {
            column: columns.map((_column, index) => `Column ${index + 1}`)
        },
        headerLabels: {
            row: ['Rows']
        }
    }), [columns, rowDataProvider]);
    const updateData = () => {
        const start = performance.now();
        setVersion((current) => current + 1);
        setTimeout(() => {
            setRenderTime(`Time: ${Math.round(performance.now() - start)}ms`);
        }, 0);
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
                style: 'width:110px;'
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30">
                    <oj-form-layout labelEdge="inside" maxColumns={2} direction="row" userAssistanceDensity="compact">
                              <oj-input-number labelHint="Rows" id="inputnumber-rowLevels" min={1} max={1000} step={1} onvalueChanged={(event: JetElementCustomEvent<number | null>) => setRowCount(Math.max(1, event.detail.value ?? 1))} value={rowCount} class="demo-data-grid-input"/>
                              <oj-input-number labelHint="Columns" id="inputnumber-columnLevels" min={1} max={200} step={1} onvalueChanged={(event: JetElementCustomEvent<number | null>) => setColumnCount(Math.max(1, event.detail.value ?? 1))} value={columnCount} class="oj-sm-only-float-start"/>
                          </oj-form-layout>
                    <oj-form-layout maxColumns={2} direction="row" userAssistanceDensity="compact" colspanWrap="wrap">
                              <div>
                                          <oj-buttonset-one class="oj-sm-only-float-start oj-buttonset-width-auto" id="policyButtonSet" aria-label="Choose only one setting." aria-controls="datagrid" onvalueChanged={(event: JetElementCustomEvent<'loadMoreOnScroll' | 'scroll'>) => setScrollPolicyValue(event.detail.value)} value={scrollPolicyValue}>
                                                        <oj-option value="loadMoreOnScroll">High-Water Mark Scrolling</oj-option>
                                                        <oj-option value="scroll">Virtual Scrolling</oj-option>
                                                    </oj-buttonset-one>
                                      </div>
                              <div>
                                          <oj-button id="updateButton" onojAction={updateData}>Rerender Grid</oj-button>
                                          <p id="timerText">{renderTime}</p>
                                      </div>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid performance demo" data={dataGridProvider} scrollPolicy={scrollPolicyValue} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
            <br />
            <div class="oj-sm-margin-5x-bottom">
                    <p class="oj-sm-padding-1x">Total Rows: <span>{rowCount}</span> Total Columns: <span>{columnCount}</span> Total Cells: <span>{rowCount * columnCount}</span></p>
                </div>
        </div>);
};
export default DataGridPerformanceGrid;
