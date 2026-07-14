import "css!./demo.css";
import type { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojdatagrid';
import type {
  DataGridProvider,
  FetchByOffsetGridParameters,
  FetchByOffsetGridResults,
  GridBodyItem,
  GridHeaderItem,
  GridItem
} from 'ojs/ojdatagridprovider';
import 'ojs/ojformlayout';
import 'ojs/ojselectsingle';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
type RegionKey = 'cell' | 'columnHeader' | 'rowHeader' | 'columnEndHeader' | 'rowEndHeader' | 'columnHeaderLabel' | 'rowHeaderLabel' | 'columnEndHeaderLabel' | 'rowEndHeaderLabel';
type HorizontalAlignmentValue = 'auto' | 'start' | 'center' | 'end' | 'left' | 'right';
type VerticalAlignmentValue = 'auto' | 'top' | 'center' | 'bottom';
type AlignmentValue = HorizontalAlignmentValue | VerticalAlignmentValue;
type HeaderAxis = 'row' | 'column' | 'rowEnd' | 'columnEnd';
type AxisMap<TValue> = Record<HeaderAxis, TValue>;
type FetchRegion = FetchByOffsetGridParameters.FetchRegionValues;
type GridResults = FetchByOffsetGridResults<GridCellData>['results'];

interface AlignmentSetting {
    horizontal: HorizontalAlignmentValue;
    vertical: VerticalAlignmentValue;
}

interface GridCellData {
    data: string;
}

interface DataGridCounts {
    row: number;
    column: number;
}

interface SelectOption<TValue extends string> {
    value: TValue;
    label: string;
}

const DEFAULT_ALIGNMENT: AlignmentSetting = {
    horizontal: 'auto',
    vertical: 'auto'
};

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

class DemoAdjustableDataGridProvider implements DataGridProvider<GridCellData> {
    private readonly eventTarget = new EventTarget();
    private readonly version = 0;

    constructor(
        private readonly counts: DataGridCounts,
        private readonly headers: AxisMap<boolean>,
        private readonly headerLevels: AxisMap<number>,
        private readonly headersPerLevel: AxisMap<number>,
        private readonly headerLabels: AxisMap<boolean>,
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
        const results: GridResults = {
            databody: rowCount > 0 && columnCount > 0
                ? this.getDatabodyResults(parameters, rowOffset, columnOffset, rowCount, columnCount)
                : undefined,
            rowHeader: this.getHeaderResults(parameters, 'row', rowOffset, rowCount),
            columnHeader: this.getHeaderResults(parameters, 'column', columnOffset, columnCount),
            rowEndHeader: this.getHeaderResults(parameters, 'rowEnd', rowOffset, rowCount),
            columnEndHeader: this.getHeaderResults(parameters, 'columnEnd', columnOffset, columnCount),
            rowHeaderLabel: this.getHeaderLabelResults(parameters, 'row'),
            columnHeaderLabel: this.getHeaderLabelResults(parameters, 'column'),
            rowEndHeaderLabel: this.getHeaderLabelResults(parameters, 'rowEnd'),
            columnEndHeaderLabel: this.getHeaderLabelResults(parameters, 'columnEnd')
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
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
                    version: this.version
                });
            }, this.fetchDelay);
        });
    }

    private getRequestedCount(requestedCount: number, totalCount: number, offset: number): number {
        const availableCount = Math.max(totalCount - offset, 0);
        if (requestedCount < 0) {
            return availableCount;
        }
        return Math.min(Math.max(requestedCount, 0), availableCount);
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
        const headersPerLevel = this.headersPerLevel[axis];
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

export const DataGridAlignment = () => {
    const [regionVal, setRegionVal] = useState<RegionKey>('columnHeader');
    const [alignments, setAlignments] = useState<Record<RegionKey, AlignmentSetting>>(() => createAlignmentState());
    const dataRegions = useMemo<Array<SelectOption<RegionKey>>>(() => [
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
    const horizontalAlignments = useMemo<Array<SelectOption<HorizontalAlignmentValue>>>(() => [
        { value: 'auto', label: 'auto' },
        { value: 'start', label: 'start' },
        { value: 'center', label: 'center' },
        { value: 'end', label: 'end' },
        { value: 'left', label: 'left' },
        { value: 'right', label: 'right' }
    ], []);
    const verticalAlignments = useMemo<Array<SelectOption<VerticalAlignmentValue>>>(() => [
        { value: 'auto', label: 'auto' },
        { value: 'top', label: 'top' },
        { value: 'center', label: 'center' },
        { value: 'bottom', label: 'bottom' }
    ], []);
    const dataGridProvider = useMemo(() => new DemoAdjustableDataGridProvider(
        { row: 50, column: 50 },
        {
            row: true,
            column: true,
            rowEnd: true,
            columnEnd: true
        },
        {
            row: 2,
            column: 2,
            rowEnd: 2,
            columnEnd: 2
        },
        {
            row: 2,
            column: 2,
            rowEnd: 2,
            columnEnd: 2
        },
        {
            row: true,
            column: true,
            rowEnd: true,
            columnEnd: true
        },
        0
    ), []);
    const dataRegionsDP = useMemo(() => new ArrayDataProvider<RegionKey, SelectOption<RegionKey>>(dataRegions, {
        keyAttributes: 'value'
    }), [dataRegions]);
    const horizontalAlignmentsDP = useMemo(() => new ArrayDataProvider<HorizontalAlignmentValue, SelectOption<HorizontalAlignmentValue>>(horizontalAlignments, {
        keyAttributes: 'value'
    }), [horizontalAlignments]);
    const verticalAlignmentsDP = useMemo(() => new ArrayDataProvider<VerticalAlignmentValue, SelectOption<VerticalAlignmentValue>>(verticalAlignments, {
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
    const regionChangeListener = (event: ValueChangedEvent<RegionKey | null>) => {
        const value = event.detail.value;
        if (value) {
            setRegionVal(value);
        }
    };
    const alignmentChangeListener = (axis: 'horizontal' | 'vertical') => (event: ValueChangedEvent<AlignmentValue | null>) => {
        const value = event.detail.value;
        if (value) {
            updateRegionAlignment({ [axis]: value });
        }
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        header: {
            column: {
                alignment: alignments.columnHeader,
                label: {
                    alignment: alignments.columnHeaderLabel
                },
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                sortable: 'disable'
            },
            row: {
                alignment: alignments.rowHeader,
                label: {
                    alignment: alignments.rowHeaderLabel
                },
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                sortable: 'disable'
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
                }
            }
        },
        cell: {
            alignment: alignments.cell
        }
    };
    return (
        <div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                <oj-form-layout maxColumns={3} direction="row" userAssistanceDensity="compact">
                    <oj-select-single id="select1" labelHint="Select Region" labelEdge="inside" class="oj-form-control-max-width-md" data={dataRegionsDP} value={regionVal} onvalueChanged={regionChangeListener} />
                    <oj-select-single id="select2" labelHint="Select Horizontal Alignment" labelEdge="inside" class="oj-form-control-max-width-md" data={horizontalAlignmentsDP} value={alignments[regionVal].horizontal} onvalueChanged={alignmentChangeListener('horizontal')} />
                    <oj-select-single id="select3" labelHint="Select Vertical Alignment" labelEdge="inside" class="oj-form-control-max-width-md" data={verticalAlignmentsDP} value={alignments[regionVal].vertical} onvalueChanged={alignmentChangeListener('vertical')} />
                </oj-form-layout>
            </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid Cell Based Grid Demo" data={dataGridProvider} scrollPolicy="loadMoreOnScroll" {...ojDataGridProps} />
        </div>
    );
};

export default DataGridAlignment;
