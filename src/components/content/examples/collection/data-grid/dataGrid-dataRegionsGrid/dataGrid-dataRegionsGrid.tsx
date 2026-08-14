import "css!./demo.css";
import type { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import type {
  DataGridProvider,
  FetchByOffsetGridParameters,
  FetchByOffsetGridResults,
  GridBodyItem,
  GridHeaderItem,
  GridItem
} from 'ojs/ojdatagridprovider';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojswitch';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];
type HeaderAxis = 'row' | 'column' | 'rowEnd' | 'columnEnd';
type AxisMap<TValue> = Record<HeaderAxis, TValue>;
type FetchRegion = FetchByOffsetGridParameters.FetchRegionValues;
type DataAvailability = 'allData' | 'headersOnly';

interface GridCellData {
    data: string;
}

interface DataGridCounts {
    row: number;
    column: number;
}

type GridResults = FetchByOffsetGridResults<GridCellData>['results'];
type CellTemplateContext = DataGridElement.CellTemplateContext<GridCellData>;

const HEADER_FETCH_REGIONS: AxisMap<FetchRegion> = {
    row: 'rowHeader',
    column: 'columnHeader',
    rowEnd: 'rowEndHeader',
    columnEnd: 'columnEndHeader'
};

const HEADER_LABEL_FETCH_REGIONS: AxisMap<FetchRegion> = {
    row: 'rowHeaderLabel',
    column: 'columnHeaderLabel',
    rowEnd: 'rowEndHeaderLabel',
    columnEnd: 'columnEndHeaderLabel'
};

const HEADER_PREFIXES: AxisMap<string> = {
    row: 'RH',
    column: 'CH',
    rowEnd: 'REH',
    columnEnd: 'CEH'
};

const HEADERS_PER_LEVEL: AxisMap<number> = {
    row: 2,
    column: 2,
    rowEnd: 2,
    columnEnd: 2
};

class DemoAdjustableDataGridProvider implements DataGridProvider<GridCellData> {
    private readonly eventTarget = new EventTarget();
    private readonly version = 0;

    constructor(
        private readonly counts: DataGridCounts,
        private readonly headers: AxisMap<boolean>,
        private readonly headerLevels: AxisMap<number>,
        private readonly headerLabels: AxisMap<boolean>,
        private readonly dataAvailability: DataAvailability,
        private readonly fetchDelay: number
    ) { }

    addEventListener(eventType: string, listener: EventListener): void {
        this.eventTarget.addEventListener(eventType, listener);
    }

    removeEventListener(eventType: string, listener: EventListener): void {
        this.eventTarget.removeEventListener(eventType, listener);
    }

    getCapability(capabilityName: string): 'monotonicallyIncreasing' | null {
        if (capabilityName === 'version') {
            return 'monotonicallyIncreasing';
        }
        return null;
    }

    isEmpty(): 'yes' | 'no' | 'unknown' {
        return this.counts.row <= 0 || this.counts.column <= 0 ? 'yes' : 'no';
    }

    fetchByOffset(parameters: FetchByOffsetGridParameters): Promise<FetchByOffsetGridResults<GridCellData>> {
        const rowOffset = Math.max(parameters.rowOffset, 0);
        const columnOffset = Math.max(parameters.columnOffset, 0);
        const rowCount = this.getRequestedCount(parameters.rowCount, this.counts.row, rowOffset);
        const columnCount = this.getRequestedCount(parameters.columnCount, this.counts.column, columnOffset);
        const rowDone = rowOffset + rowCount >= this.counts.row;
        const columnDone = columnOffset + columnCount >= this.counts.column;
        const databody = rowCount > 0 && columnCount > 0
            ? this.getDatabodyResults(parameters, rowOffset, columnOffset, rowCount, columnCount)
            : undefined;
        const headerResults: GridResults = {
            rowHeader: this.getHeaderResults(parameters, 'row', rowOffset, rowCount),
            columnHeader: this.getHeaderResults(parameters, 'column', columnOffset, columnCount),
            rowEndHeader: this.getHeaderResults(parameters, 'rowEnd', rowOffset, rowCount),
            columnEndHeader: this.getHeaderResults(parameters, 'columnEnd', columnOffset, columnCount),
            rowHeaderLabel: this.getHeaderLabelResults(parameters, 'row'),
            columnHeaderLabel: this.getHeaderLabelResults(parameters, 'column'),
            rowEndHeaderLabel: this.getHeaderLabelResults(parameters, 'rowEnd'),
            columnEndHeaderLabel: this.getHeaderLabelResults(parameters, 'columnEnd')
        };

        if (this.dataAvailability === 'headersOnly') {
            const next = this.resolveAfterDelay(this.createFetchResults(parameters, rowOffset, columnOffset, rowCount, columnCount, rowDone, columnDone, {
                databody
            }));
            return Promise.resolve(this.createFetchResults(parameters, rowOffset, columnOffset, rowCount, columnCount, rowDone, columnDone, headerResults, next));
        }

        return this.resolveAfterDelay(this.createFetchResults(parameters, rowOffset, columnOffset, rowCount, columnCount, rowDone, columnDone, {
            databody,
            ...headerResults
        }));
    }

    private getRequestedCount(requestedCount: number, totalCount: number, offset: number): number {
        const availableCount = Math.max(totalCount - offset, 0);
        if (requestedCount < 0) {
            return availableCount;
        }
        return Math.min(Math.max(requestedCount, 0), availableCount);
    }

    private createFetchResults(
        parameters: FetchByOffsetGridParameters,
        rowOffset: number,
        columnOffset: number,
        rowCount: number,
        columnCount: number,
        rowDone: boolean,
        columnDone: boolean,
        results: GridResults,
        next?: Promise<FetchByOffsetGridResults<GridCellData>>
    ): FetchByOffsetGridResults<GridCellData> {
        return {
            fetchParameters: parameters,
            rowDone,
            columnDone,
            rowOffset,
            columnOffset,
            rowCount,
            columnCount,
            totalRowCount: this.counts.row,
            totalColumnCount: this.counts.column,
            results,
            version: this.version,
            next
        };
    }

    private resolveAfterDelay(results: FetchByOffsetGridResults<GridCellData>): Promise<FetchByOffsetGridResults<GridCellData>> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(results), this.fetchDelay);
        });
    }

    private getDatabodyResults(
        parameters: FetchByOffsetGridParameters,
        rowOffset: number,
        columnOffset: number,
        rowCount: number,
        columnCount: number
    ): Array<GridBodyItem<GridCellData>> | undefined {
        if (!this.shouldFetchRegion(parameters, 'databody')) {
            return undefined;
        }

        const results: Array<GridBodyItem<GridCellData>> = [];
        for (let rowIndex = rowOffset; rowIndex < rowOffset + rowCount; rowIndex++) {
            for (let columnIndex = columnOffset; columnIndex < columnOffset + columnCount; columnIndex++) {
                results.push({
                    rowExtent: 1,
                    columnExtent: 1,
                    rowIndex,
                    columnIndex,
                    metadata: {},
                    data: { data: `${rowIndex},${columnIndex}` }
                });
            }
        }
        return results;
    }

    private getHeaderResults(
        parameters: FetchByOffsetGridParameters,
        axis: HeaderAxis,
        offset: number,
        count: number
    ): Array<GridHeaderItem<GridCellData>> | undefined {
        if (!this.headers[axis] || !this.shouldFetchRegion(parameters, HEADER_FETCH_REGIONS[axis])) {
            return undefined;
        }

        const results: Array<GridHeaderItem<GridCellData>> = [];
        const headerLevels = this.headerLevels[axis];
        const headersPerLevel = HEADERS_PER_LEVEL[axis];
        for (let level = 0; level < headerLevels; level++) {
            const extentAtLevel = Math.max(Math.pow(headersPerLevel, headerLevels - level - 1), 1);
            for (let index = offset - (offset % extentAtLevel); index < count + offset; index += extentAtLevel) {
                results.push({
                    index,
                    extent: extentAtLevel,
                    level,
                    depth: 1,
                    metadata: {},
                    data: { data: `${HEADER_PREFIXES[axis]}${index}L${level}` }
                });
            }
        }
        return results;
    }

    private getHeaderLabelResults(
        parameters: FetchByOffsetGridParameters,
        axis: HeaderAxis
    ): Array<GridItem<GridCellData>> | undefined {
        if (!this.headerLabels[axis] || !this.shouldFetchRegion(parameters, HEADER_LABEL_FETCH_REGIONS[axis])) {
            return undefined;
        }

        const results: Array<GridItem<GridCellData>> = [];
        for (let level = 0; level < this.headerLevels[axis]; level++) {
            results.push({
                metadata: {},
                data: { data: `${HEADER_PREFIXES[axis]}LabelL${level}` }
            });
        }
        return results;
    }

    private shouldFetchRegion(parameters: FetchByOffsetGridParameters, region: FetchRegion): boolean {
        const fetchRegions = parameters.fetchRegions;
        return !fetchRegions || fetchRegions.has('all') || fetchRegions.has(region);
    }
}

export default function DataGridDataRegionsGrid() {
    const [rowCount, setRowCount] = useState<number>(24);
    const [columnCount, setColumnCount] = useState<number>(8);
    const [rowHeaderVisible, setRowHeaderVisible] = useState<boolean>(true);
    const [rowEndHeaderVisible, setRowEndHeaderVisible] = useState<boolean>(true);
    const [columnHeaderVisible, setColumnHeaderVisible] = useState<boolean>(true);
    const [columnEndHeaderVisible, setColumnEndHeaderVisible] = useState<boolean>(true);
    const [rowHeaderLabelsVisible, setRowHeaderLabelsVisible] = useState<boolean>(true);
    const [rowEndHeaderLabelsVisible, setRowEndHeaderLabelsVisible] = useState<boolean>(true);
    const [columnHeaderLabelsVisible, setColumnHeaderLabelsVisible] = useState<boolean>(true);
    const [columnEndHeaderLabelsVisible, setColumnEndHeaderLabelsVisible] = useState<boolean>(true);
    const [rowHeaderLevels, setRowHeaderLevels] = useState<number>(2);
    const [columnHeaderLevels, setColumnHeaderLevels] = useState<number>(2);
    const [rowEndHeaderLevels, setRowEndHeaderLevels] = useState<number>(2);
    const [columnEndHeaderLevels, setColumnEndHeaderLevels] = useState<number>(2);
    const [fetchDelay, setFetchDelay] = useState<number>(0);
    const [dataAvailability, setDataAvailability] = useState<DataAvailability>('allData');
    const [scrollPolicyValue, setScrollPolicyValue] = useState<'loadMoreOnScroll' | 'scroll'>('loadMoreOnScroll');

    const dataGridProvider = useMemo(() => new DemoAdjustableDataGridProvider(
        { row: rowCount, column: columnCount },
        {
            row: rowHeaderVisible,
            column: columnHeaderVisible,
            rowEnd: rowEndHeaderVisible,
            columnEnd: columnEndHeaderVisible
        },
        {
            row: rowHeaderLevels,
            column: columnHeaderLevels,
            rowEnd: rowEndHeaderLevels,
            columnEnd: columnEndHeaderLevels
        },
        {
            row: rowHeaderLabelsVisible,
            column: columnHeaderLabelsVisible,
            rowEnd: rowEndHeaderLabelsVisible,
            columnEnd: columnEndHeaderLabelsVisible
        },
        dataAvailability,
        fetchDelay
    ), [
        columnCount,
        columnEndHeaderLabelsVisible,
        columnEndHeaderLevels,
        columnEndHeaderVisible,
        columnHeaderLabelsVisible,
        columnHeaderLevels,
        columnHeaderVisible,
        dataAvailability,
        fetchDelay,
        rowCount,
        rowEndHeaderLabelsVisible,
        rowEndHeaderLevels,
        rowEndHeaderVisible,
        rowHeaderLabelsVisible,
        rowHeaderLevels,
        rowHeaderVisible
    ]);

    const handleNumberChange = (setter: (value: number) => void, min: number, max: number) => (event: ValueChangedEvent<number | null>) => {
        const value = event.detail.value ?? min;
        setter(Math.min(Math.max(Math.trunc(value), min), max));
    };

    const handleSwitchChange = (setter: (value: boolean) => void) => (event: SwitchValueChangedEvent) => {
        setter(Boolean(event.detail.value));
    };

    const handleScrollPolicyChange = (event: ValueChangedEvent<string>) => {
        if (event.detail.value === 'loadMoreOnScroll' || event.detail.value === 'scroll') {
            setScrollPolicyValue(event.detail.value);
        }
    };

    const handleDataAvailabilityChange = (event: ValueChangedEvent<string>) => {
        if (event.detail.value === 'allData' || event.detail.value === 'headersOnly') {
            setDataAvailability(event.detail.value);
        }
    };

    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return <span>{cell.item.data.data}</span>;
    };

    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        header: {
            row: {
                sortable: 'disable',
                style: 'width:110px;'
            },
            column: {
                sortable: 'disable',
                style: 'width:120px;'
            },
            rowEnd: {
                style: 'width:110px;'
            },
            columnEnd: {
                style: 'width:120px;'
            }
        }
    };

    return (
        <div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                    <oj-input-number min={1} step={1} max={200} onvalueChanged={handleNumberChange(setRowCount, 1, 200)} value={rowCount} labelHint="Rows" />
                    <oj-input-number min={1} step={1} max={50} onvalueChanged={handleNumberChange(setColumnCount, 1, 50)} value={columnCount} labelHint="Columns" />
                    <oj-input-number min={0} step={1} max={4} onvalueChanged={handleNumberChange(setRowHeaderLevels, 0, 4)} value={rowHeaderLevels} labelHint="Row Header Levels" />
                    <oj-input-number min={0} step={1} max={4} onvalueChanged={handleNumberChange(setColumnHeaderLevels, 0, 4)} value={columnHeaderLevels} labelHint="Column Header Levels" />
                </oj-form-layout>
                <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                    <oj-input-number min={0} step={1} max={4} onvalueChanged={handleNumberChange(setRowEndHeaderLevels, 0, 4)} value={rowEndHeaderLevels} labelHint="Row End Header Levels" />
                    <oj-input-number min={0} step={1} max={4} onvalueChanged={handleNumberChange(setColumnEndHeaderLevels, 0, 4)} value={columnEndHeaderLevels} labelHint="Column End Header Levels" />
                    <oj-input-number id="fetchDelayInput" min={0} step={50} max={5000} onvalueChanged={handleNumberChange(setFetchDelay, 0, 5000)} value={fetchDelay} labelHint="Simulate Fetch Delay (ms)" />
                    <div>
                        <oj-label id="dataAvailabilityLabel">Data Availability</oj-label>
                        <oj-buttonset-one class="oj-buttonset-width-auto" id="dataAvailabilityButtonSet" onvalueChanged={handleDataAvailabilityChange} value={dataAvailability} labelledBy="dataAvailabilityLabel">
                            <oj-option value="allData">All Data</oj-option>
                            <oj-option value="headersOnly">Headers First</oj-option>
                        </oj-buttonset-one>
                    </div>
                </oj-form-layout>
                <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                    <oj-switch onvalueChanged={handleSwitchChange(setRowHeaderVisible)} value={rowHeaderVisible} labelHint="Row Headers" />
                    <oj-switch onvalueChanged={handleSwitchChange(setColumnHeaderVisible)} value={columnHeaderVisible} labelHint="Column Headers" />
                    <oj-switch onvalueChanged={handleSwitchChange(setRowEndHeaderVisible)} value={rowEndHeaderVisible} labelHint="Row End Headers" />
                    <oj-switch onvalueChanged={handleSwitchChange(setColumnEndHeaderVisible)} value={columnEndHeaderVisible} labelHint="Column End Headers" />
                </oj-form-layout>
                <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                    <oj-switch onvalueChanged={handleSwitchChange(setRowHeaderLabelsVisible)} value={rowHeaderLabelsVisible} labelHint="Row Header Labels" />
                    <oj-switch onvalueChanged={handleSwitchChange(setColumnHeaderLabelsVisible)} value={columnHeaderLabelsVisible} labelHint="Column Header Labels" />
                    <oj-switch onvalueChanged={handleSwitchChange(setRowEndHeaderLabelsVisible)} value={rowEndHeaderLabelsVisible} labelHint="Row End Header Labels" />
                    <oj-switch onvalueChanged={handleSwitchChange(setColumnEndHeaderLabelsVisible)} value={columnEndHeaderLabelsVisible} labelHint="Column End Header Labels" />
                </oj-form-layout>
                <oj-form-layout maxColumns={4} direction="row" userAssistanceDensity="compact">
                    <div>
                        <oj-label id="scrollPolicy">Scroll Policy</oj-label>
                        <oj-buttonset-one class="oj-buttonset-width-auto" id="scrollPolicyButtonSet" onvalueChanged={handleScrollPolicyChange} value={scrollPolicyValue} labelledBy="scrollPolicy">
                            <oj-option value="loadMoreOnScroll">High-Water Mark</oj-option>
                            <oj-option value="scroll">Virtual</oj-option>
                        </oj-buttonset-one>
                    </div>
                </oj-form-layout>
            </div>
            <oj-data-grid
                id="datagrid"
                class="demo-data-grid"
                aria-label="Data Grid data regions demo"
                data={dataGridProvider}
                scrollPolicy={scrollPolicyValue}
                {...ojDataGridProps}>
                <template slot="cellTemplate" render={cellTemplateRenderer} />
            </oj-data-grid>
        </div>
    );
};
