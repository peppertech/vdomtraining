import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import type { JetElementCustomEvent } from 'ojs/index';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/population.json';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import "css!./demo.css";
const jsonData = JSON.parse(jsonDataText as string);
interface States {
    states: string;
    [propName: string]: number | string;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<States>;
const populationRows = jsonData as States[];
const DATA_COLUMNS = Object.keys(populationRows[0] ?? {})
    .filter((key) => key !== 'states')
    .sort((left, right) => Number(left) - Number(right));
export const DataGridFreezeGrid = () => {
    const [frozenRowCount, setFrozenRowCount] = useState<number>(2);
    const [frozenColumnCount, setFrozenColumnCount] = useState<number>(2);
    const [scrollPolicyValue, setScrollPolicyValue] = useState<'loadMoreOnScroll' | 'scroll'>('loadMoreOnScroll');
    const rows = useMemo(() => populationRows, []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, States>(rows, {
        keyAttributes: 'states',
        implicitSort: [{ attribute: 'states', direction: 'ascending' }]
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, States>(rowDataProvider, {
        columns: {
            rowHeader: ['states'],
            databody: DATA_COLUMNS
        },
        columnHeaders: {
            column: DATA_COLUMNS
        },
        headerLabels: {
            row: ['States']
        }
    }), [rowDataProvider]);
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: true }), []);
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return numberConverter.format(Number(cell.item.data.data));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { selectionMode: {
            cell: 'multiple'
        }, header: {
            row: {
                style: 'width:165px;',
                sortable: 'disable',
                freezable: 'enable'
            },
            column: {
                sortable: 'disable',
                freezable: 'enable'
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <h2 class="oj-typography-subheading-sm">Datagrid freeze option:</h2>
                    <oj-form-layout labelEdge="inside" maxColumns={2} direction="row" userAssistanceDensity="compact">
                              <oj-input-number labelHint="Row Frozen Count" id="frozen-row-count" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => setFrozenRowCount(Math.max(0, event.detail.value ?? 0))} value={frozenRowCount}/>
                              <oj-input-number labelHint="Column Frozen Count" id="frozen-column-count" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => setFrozenColumnCount(Math.max(0, event.detail.value ?? 0))} value={frozenColumnCount}/>
                              <div>
                                          <oj-label id="scrollPolicy">Scroll Policy</oj-label>
                                          <oj-buttonset-one class="oj-buttonset-width-auto" id="scrollPolicyButtonSet" onvalueChanged={(event: JetElementCustomEvent<'loadMoreOnScroll' | 'scroll'>) => setScrollPolicyValue(event.detail.value)} value={scrollPolicyValue} labelledBy="scrollPolicy">
                                                        <oj-option value="loadMoreOnScroll">High-Water Mark Scrolling</oj-option>
                                                        <oj-option value="scroll">Virtual Scrolling</oj-option>
                                                    </oj-buttonset-one>
                                      </div>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid freeze demo" data={dataGridProvider} frozenColumnCount={frozenColumnCount} frozenRowCount={frozenRowCount} scrollPolicy={scrollPolicyValue} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridFreezeGrid;
