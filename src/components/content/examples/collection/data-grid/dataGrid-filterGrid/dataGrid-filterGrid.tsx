import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/population.json';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojslider';
import 'ojs/ojselectsingle';
import "css!./demo.css";
type SelectSingleChangedEvent = Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0];
type RangeSliderTransientChangedEvent = Parameters<NonNullable<ComponentProps<'oj-range-slider'>['ontransientValueChanged']>>[0];
type RangeSliderValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-range-slider'>['onvalueChanged']>>[0];
type HeaderContext = ojDataGrid.HeaderContext<string, string>;
type CellContext = ojDataGrid.CellContext<string, string>;
type CellTemplateContext = {
    item: {
        columnIndex: number;
        data: {
            data: string | number;
        };
    };
};
const jsonData = JSON.parse(jsonDataText as string) as States[];
interface States {
    states: string;
    [propName: string]: number | string;
}
interface RangeValue {
    start: number;
    end: number;
}
interface NullableRangeValue {
    start: number | null;
    end: number | null;
}
const VISIBLE_COLUMNS = ['states', '2015', '2016', '2017', '2018', '2019', '2020'] as const;
export const DataGridFilterGrid = () => {
    const [filterColumn, setFilterColumn] = useState<string>('2020');
    const [sliderVal, setSliderVal] = useState<RangeValue>({ start: 100000, end: 8000000 });
    const [transientValue, setTransientValue] = useState<RangeValue>({ start: 100000, end: 8000000 });
    const filterColumnOptions = useMemo(() => VISIBLE_COLUMNS.filter((column) => column !== 'states').map((column) => ({
        value: column,
        label: column
    })), []);
    const filteredRows = useMemo(() => jsonData.filter((item) => {
        const value = Number(item[filterColumn] ?? 0);
        return value >= sliderVal.start && value <= sliderVal.end;
    }), [filterColumn, sliderVal]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, States>(filteredRows, {
        keyAttributes: 'states'
    }), [filteredRows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, States>(rowDataProvider, {
        columns: {
            rowHeader: ['states'],
            databody: VISIBLE_COLUMNS.filter((column) => column !== 'states')
        },
        columnHeaders: {
            column: VISIBLE_COLUMNS.filter((column) => column !== 'states')
        },
        headerLabels: {
            row: ['States']
        }
    }), [rowDataProvider]);
    const columnDataProvider = useMemo(() => new ArrayDataProvider<string, {
        value: string;
        label: string;
    }>(filterColumnOptions, {
        keyAttributes: 'value'
    }), [filterColumnOptions]);
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: true }), []);
    const getColumnHeaderStyle = (headerContext: HeaderContext) => {
        if (headerContext.index === 0) {
            return 'width: 165px;';
        }
        return 'width: 120px;';
    };
    const getColumnHeaderHorizontalAlignment = (headerContext: HeaderContext) => {
        return headerContext.index === 0 ? 'start' : 'right';
    };
    const getCellHorizontalAlignment = (cellContext: CellContext) => {
        return cellContext.indexes.column === 0 ? 'start' : 'right';
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return cell.item.columnIndex === 0 ? cell.item.data.data : numberConverter.format(cell.item.data.data as number);
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            column: {
                style: getColumnHeaderStyle,
                alignment: {
                    horizontal: getColumnHeaderHorizontalAlignment
                }
            },
            row: {
                style: 'width:165px;'
            }
        }, cell: {
            alignment: {
                horizontal: getCellHorizontalAlignment
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <div class="oj-flex oj-sm-gap-4 oj-sm-align-items-center">
                              <oj-select-single id="filterColumn" labelHint="Filter Year" data={columnDataProvider} value={filterColumn} onvalueChanged={(event: SelectSingleChangedEvent) => setFilterColumn(event.detail.value ?? '2020')}/>
                              <div class="oj-flex-item">
                                          <div class="oj-typography-body-sm oj-sm-margin-2x-bottom">{filterColumn} range: {numberConverter.format(transientValue.start)} to {numberConverter.format(transientValue.end)}</div>
                                          <oj-range-slider min={100000} max={8000000} step={50000} userAssistanceDensity="compact" ontransientValueChanged={(event: RangeSliderTransientChangedEvent) => setTransientValue({ start: event.detail.value.start ?? sliderVal.start, end: event.detail.value.end ?? sliderVal.end })} transientValue={transientValue} value={sliderVal} onvalueChanged={(event: RangeSliderValueChangedEvent) => setSliderVal({ start: event.detail.value.start ?? sliderVal.start, end: event.detail.value.end ?? sliderVal.end })}/>
                                      </div>
                          </div>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid filtering demo" data={dataGridProvider} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridFilterGrid;
