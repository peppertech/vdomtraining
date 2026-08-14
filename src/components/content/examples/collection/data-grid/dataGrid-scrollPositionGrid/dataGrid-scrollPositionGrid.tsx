import "css!./demo.css";
import type { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojoption';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface DataDetails {
    rowHeader: string;
    [propName: string]: string;
}
interface ScrollPositionValue {
    x?: number;
    y?: number;
    rowIndex?: number;
    columnIndex?: number;
    offsetX?: number;
    offsetY?: number;
}
const createRows = (rowCount: number, columnCount: number) => {
    return Array.from({ length: rowCount }, (_unused, rowIndex) => {
        const row: DataDetails = {
            rowHeader: `Row ${rowIndex}`
        };
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            row[`c${columnIndex}`] = `${rowIndex},${columnIndex}`;
        }
        return row;
    });
};
export default function DataGridScrollPositionGrid() {
    const [scrollPolicyValue, setScrollPolicyValue] = useState<'loadMoreOnScroll' | 'scroll'>('loadMoreOnScroll');
    const [scrollPosValue, setScrollPosValue] = useState<ScrollPositionValue>({});
    const data = useMemo(() => createRows(200, 60), []);
    const columns = useMemo(() => Array.from({ length: 60 }, (_unused, index) => `c${index}`), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, DataDetails>(data, {
        keyAttributes: 'rowHeader'
    }), [data]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, DataDetails>(rowDataProvider, {
        columns: {
            rowHeader: ['rowHeader'],
            databody: columns
        },
        columnHeaders: {
            column: columns
        }
    }), [columns, rowDataProvider]);
    const updatePosition = (partial: Partial<ScrollPositionValue>) => {
        setScrollPosValue((current) => ({
            ...current,
            ...partial
        }));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                sortable: 'disable',
                style: 'width:110px;'
            },
            column: {
                sortable: 'disable',
                style: 'width:90px;'
            }
        } };
    return (<div id="datagridContainer">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 class="oj-typography-subheading-sm">Datagrid scroll position attributes:</h2>
                    <oj-form-layout labelEdge="inside" maxColumns={2} direction="row" userAssistanceDensity="compact">
                              <oj-input-number labelHint="Row Pixel" id="row-position" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => updatePosition({ y: event.detail.value ?? 0 })} value={scrollPosValue.y}/>
                              <oj-input-number labelHint="Column Pixel" id="column-position" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => updatePosition({ x: event.detail.value ?? 0 })} value={scrollPosValue.x}/>
                              <oj-input-number labelHint="Row Index" id="row-index" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => updatePosition({ rowIndex: event.detail.value ?? 0 })} value={scrollPosValue.rowIndex}/>
                              <oj-input-number labelHint="Column Index" id="column-index" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => updatePosition({ columnIndex: event.detail.value ?? 0 })} value={scrollPosValue.columnIndex}/>
                              <oj-input-number labelHint="Row Offset" id="row-offset" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => updatePosition({ offsetY: event.detail.value ?? 0 })} value={scrollPosValue.offsetY}/>
                              <oj-input-number labelHint="Column Offset" id="column-offset" min={0} onvalueChanged={(event: JetElementCustomEvent<number | null>) => updatePosition({ offsetX: event.detail.value ?? 0 })} value={scrollPosValue.offsetX}/>
                              <oj-buttonset-one class="oj-buttonset-width-auto" aria-controls="datagrid" onvalueChanged={(event: JetElementCustomEvent<'loadMoreOnScroll' | 'scroll'>) => setScrollPolicyValue(event.detail.value)} value={scrollPolicyValue}>
                                          <oj-option value="loadMoreOnScroll">High-Watermark Scrolling</oj-option>
                                          <oj-option value="scroll">Virtual Scrolling</oj-option>
                                      </oj-buttonset-one>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid scroll position demo" data={dataGridProvider} onscrollPositionChanged={(event: JetElementCustomEvent<ScrollPositionValue>) => setScrollPosValue(event.detail.value ?? {})} scrollPosition={scrollPosValue} scrollPolicy={scrollPolicyValue} {...ojDataGridProps}/>
        </div>);
};
