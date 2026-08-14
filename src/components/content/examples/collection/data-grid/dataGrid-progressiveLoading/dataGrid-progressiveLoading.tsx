import "css!./demo.css";
import type { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface LoadingRow {
    rowLabel: string;
    [key: string]: string | number;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<LoadingRow>;
const buildRows = (headersOnly: boolean) => Array.from({ length: 60 }, (_unused, rowIndex) => {
    const row: LoadingRow = { rowLabel: `Row ${rowIndex + 1}` };
    for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
        row[`c${columnIndex + 1}`] = headersOnly ? '' : (rowIndex + 1) * (columnIndex + 1);
    }
    return row;
});
export default function DataGridProgressiveLoading() {
    const [fetchDelay, setFetchDelay] = useState<number>(2000);
    const [dataAvailabilityValue, setDataAvailabilityValue] = useState<'all' | 'headersOnly'>('all');
    const [scrollPolicyValue, setScrollPolicyValue] = useState<'loadMoreOnScroll' | 'scroll'>('loadMoreOnScroll');
    const rows = useMemo(() => buildRows(dataAvailabilityValue === 'headersOnly'), [dataAvailabilityValue]);
    const columns = useMemo(() => Array.from({ length: 8 }, (_unused, index) => `c${index + 1}`), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, LoadingRow>(rows, {
        keyAttributes: 'rowLabel'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, LoadingRow>(rowDataProvider, {
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
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout maxColumns={3} direction="row" userAssistanceDensity="compact">
                              <oj-label id="fetchDelay" for="fetchDelayInput">Fetch Delay (ms)</oj-label>
                              <oj-input-number id="fetchDelayInput" min={0} step={100} onvalueChanged={(event: JetElementCustomEvent<number | null>) => setFetchDelay(Math.max(0, event.detail.value ?? 0))} value={fetchDelay}/>
                              <div>
                                          <oj-label id="scrollPolicy">Scroll Policy</oj-label>
                                          <oj-buttonset-one class="oj-buttonset-width-auto" id="scrollPolicyButtonSet" onvalueChanged={(event: JetElementCustomEvent<'loadMoreOnScroll' | 'scroll'>) => setScrollPolicyValue(event.detail.value)} value={scrollPolicyValue} labelledBy="scrollPolicy">
                                                        <oj-option value="loadMoreOnScroll">High-Water Mark Scrolling</oj-option>
                                                        <oj-option value="scroll">Virtual Scrolling</oj-option>
                                                    </oj-buttonset-one>
                                      </div>
                              <div>
                                          <oj-label id="dataAvailability">Data Available</oj-label>
                                          <oj-buttonset-one class="oj-buttonset-width-auto" id="dataAvailabilityButtonSet" onvalueChanged={(event: JetElementCustomEvent<'all' | 'headersOnly'>) => setDataAvailabilityValue(event.detail.value)} value={dataAvailabilityValue} labelledBy="dataAvailability">
                                                        <oj-option value="all">All</oj-option>
                                                        <oj-option value="headersOnly">Headers Only</oj-option>
                                                    </oj-buttonset-one>
                                      </div>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid progressive loading demo" data={dataGridProvider} scrollPolicy={scrollPolicyValue} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
            <p class="oj-sm-margin-2x-top">The original demo simulated delayed fetches; this local replacement keeps data in memory and exposes the same controls for consistency.</p>
        </div>);
};
