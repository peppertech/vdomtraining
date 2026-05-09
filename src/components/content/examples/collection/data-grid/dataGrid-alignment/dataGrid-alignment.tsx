// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
import { useMemo, useState } from 'preact/hooks';
import type { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojselectsingle';
import "css!./demo.css";
type RegionKey = 'cell' | 'columnHeader' | 'rowHeader' | 'columnEndHeader' | 'rowEndHeader' | 'columnHeaderLabel' | 'rowHeaderLabel' | 'columnEndHeaderLabel' | 'rowEndHeaderLabel';
type AlignmentValue = 'auto' | 'start' | 'center' | 'end' | 'left' | 'right' | 'top' | 'bottom';
interface AlignmentSetting {
    horizontal: AlignmentValue;
    vertical: AlignmentValue;
}
interface GridRow {
    department: string;
    q1: number;
    q2: number;
    q3: number;
    status: string;
}
const DEFAULT_ALIGNMENT: AlignmentSetting = {
    horizontal: 'auto',
    vertical: 'auto'
};
const createAlignmentState = (): Record<RegionKey, AlignmentSetting> => ({
    cell: { ...DEFAULT_ALIGNMENT },
    columnHeader: { ...DEFAULT_ALIGNMENT },
    rowHeader: { ...DEFAULT_ALIGNMENT },
    columnEndHeader: { ...DEFAULT_ALIGNMENT },
    rowEndHeader: { ...DEFAULT_ALIGNMENT },
    columnHeaderLabel: { ...DEFAULT_ALIGNMENT },
    rowHeaderLabel: { ...DEFAULT_ALIGNMENT },
    columnEndHeaderLabel: { ...DEFAULT_ALIGNMENT },
    rowEndHeaderLabel: { ...DEFAULT_ALIGNMENT }
});
export const DataGridAlignment = () => {
    const [regionVal, setRegionVal] = useState<RegionKey>('columnHeader');
    const [alignments, setAlignments] = useState<Record<RegionKey, AlignmentSetting>>(() => createAlignmentState());
    const rows = useMemo<GridRow[]>(() => [
        { department: 'North', q1: 132000, q2: 154000, q3: 149000, status: 'On Track' },
        { department: 'South', q1: 98000, q2: 107000, q3: 112000, status: 'Watch' },
        { department: 'West', q1: 171000, q2: 168000, q3: 176000, status: 'On Track' },
        { department: 'Central', q1: 86000, q2: 91000, q3: 94000, status: 'Recovery' }
    ], []);
    const dataRegions = useMemo(() => [
        { value: 'cell', label: 'Cell' },
        { value: 'columnHeader', label: 'Column Header' },
        { value: 'rowHeader', label: 'Row Header' },
        { value: 'columnEndHeader', label: 'Column End Header' },
        { value: 'rowEndHeader', label: 'Row End Header' },
        { value: 'columnHeaderLabel', label: 'Column Header Label' },
        { value: 'rowHeaderLabel', label: 'Row Header Label' },
        { value: 'columnEndHeaderLabel', label: 'Column End Header Label' },
        { value: 'rowEndHeaderLabel', label: 'Row End Header Label' }
    ], []);
    const horizontalAlignments = useMemo(() => [
        { value: 'auto', label: 'auto' },
        { value: 'start', label: 'start' },
        { value: 'center', label: 'center' },
        { value: 'end', label: 'end' },
        { value: 'left', label: 'left' },
        { value: 'right', label: 'right' }
    ], []);
    const verticalAlignments = useMemo(() => [
        { value: 'auto', label: 'auto' },
        { value: 'top', label: 'top' },
        { value: 'center', label: 'center' },
        { value: 'bottom', label: 'bottom' }
    ], []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, GridRow>(rows, {
        keyAttributes: 'department'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, GridRow>(rowDataProvider, {
        columns: {
            rowHeader: ['department'],
            databody: ['q1', 'q2', 'q3'],
            rowEndHeader: ['status']
        },
        columnHeaders: {
            column: [
                { data: 'Q1 Revenue' },
                { data: 'Q2 Revenue' },
                { data: 'Q3 Revenue' }
            ]
        },
        headerLabels: {
            row: ['Department'],
            rowEnd: ['Status']
        }
    }), [rowDataProvider]);
    const dataRegionsDP = useMemo(() => new ArrayDataProvider<string, {
        value: string;
        label: string;
    }>(dataRegions, {
        keyAttributes: 'value'
    }), [dataRegions]);
    const horizontalAlignmentsDP = useMemo(() => new ArrayDataProvider<string, {
        value: string;
        label: string;
    }>(horizontalAlignments, {
        keyAttributes: 'value'
    }), [horizontalAlignments]);
    const verticalAlignmentsDP = useMemo(() => new ArrayDataProvider<string, {
        value: string;
        label: string;
    }>(verticalAlignments, {
        keyAttributes: 'value'
    }), [verticalAlignments]);
    const updateRegionAlignment = (partial: Partial<AlignmentSetting>) => {
        setAlignments((current) => ({
            ...current,
            [regionVal]: {
                ...current[regionVal],
                ...partial
            }
        }));
    };
    const regionChangeListener = (event: ValueChangedEvent<RegionKey>) => {
        setRegionVal(event.detail.value);
    };
    const alignmentChangeListener = (axis: 'horizontal' | 'vertical') => (event: ValueChangedEvent<AlignmentValue>) => {
        updateRegionAlignment({ [axis]: event.detail.value });
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            column: {
                alignment: alignments.columnHeader,
                label: {
                    alignment: alignments.columnHeaderLabel
                },
                style: 'width:150px;'
            },
            row: {
                alignment: alignments.rowHeader,
                label: {
                    alignment: alignments.rowHeaderLabel
                },
                style: 'width:150px;'
            },
            columnEnd: {
                alignment: alignments.columnEndHeader,
                label: {
                    alignment: alignments.columnEndHeaderLabel
                }
            },
            rowEnd: {
                alignment: alignments.rowEndHeader,
                label: {
                    alignment: alignments.rowEndHeaderLabel
                },
                style: 'width:120px;'
            }
        }, cell: {
            alignment: alignments.cell
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout maxColumns={3} direction="row" userAssistanceDensity="compact">
                              <oj-select-single id="select1" labelHint="Select Region" labelEdge="inside" class="oj-form-control-max-width-md" data={dataRegionsDP} value={regionVal} onvalueChanged={regionChangeListener}/>
                              <oj-select-single id="select2" labelHint="Horizontal Alignment" labelEdge="inside" class="oj-form-control-max-width-md" data={horizontalAlignmentsDP} value={alignments[regionVal].horizontal} onvalueChanged={alignmentChangeListener('horizontal')}/>
                              <oj-select-single id="select3" labelHint="Vertical Alignment" labelEdge="inside" class="oj-form-control-max-width-md" data={verticalAlignmentsDP} value={alignments[regionVal].vertical} onvalueChanged={alignmentChangeListener('vertical')}/>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid alignment demo" data={dataGridProvider} scrollPolicy="loadMoreOnScroll" {...ojDataGridProps}/>
        </div>);
};
export default DataGridAlignment;
