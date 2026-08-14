import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type {
  DataGridProvider,
  FetchByOffsetGridParameters,
  FetchByOffsetGridResults,
  GridBodyItem,
  GridHeaderItem
} from 'ojs/ojdatagridprovider';
import 'preact';
import type { ComponentChildren,ComponentProps } from 'preact';
import { render } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/dataGrid/shared/hierarchicalPopulation.json';

type GridData = string | number;

interface PopulationRow {
    states: string;
    children?: Array<PopulationRow>;
    [year: string]: string | number | Array<PopulationRow> | undefined;
}

interface VisibleRow {
    key: string;
    label: string;
    data: PopulationRow;
    treeDepth: number;
    expanded?: 'expanded' | 'collapsed';
}

interface VisibleColumn {
    key: string;
    label: string;
    years: string[];
    decade: string;
    treeDepth: number;
    expanded?: 'expanded' | 'collapsed';
}

type DataGridRendererContext = {
    data?: GridData;
    metadata?: {
        expanded?: 'expanded' | 'collapsed';
        treeDepth?: number;
    };
    [property: string]: unknown;
};

type AxisHeaderItem = GridHeaderItem<GridData> & {
    axis: 'row' | 'column';
};

const REGION_ORDER = ['South', 'West', 'North East', 'Mid West'];
const rawData = JSON.parse(jsonDataStr as string) as PopulationRow[];
const regionRows = [...rawData].sort((left, right) => REGION_ORDER.indexOf(left.states) - REGION_ORDER.indexOf(right.states));
const YEARS = Object.keys(rawData[0] ?? {})
    .filter((key) => !isNaN(Number(key)))
    .sort((left, right) => Number(left) - Number(right));
const DECADE_GROUPS = [
    { label: '2000s', years: YEARS.filter((year) => Number(year) >= 2000 && Number(year) <= 2009) },
    { label: '2010s', years: YEARS.filter((year) => Number(year) >= 2010 && Number(year) <= 2019) },
    { label: '2020s', years: YEARS.filter((year) => Number(year) >= 2020 && Number(year) <= 2029) }
].filter((group) => group.years.length > 0);

const createRenderer =
    (factory: (context: DataGridRendererContext) => ComponentChildren) =>
    (context: DataGridRendererContext) => {
        const container = document.createElement('div');
        container.className = 'demo-rowexpander-dataprovider-renderer-content';
        render(factory(context), container);
        return { insert: container };
    };

const getRequestedCount = (requestedCount: number, totalCount: number, offset: number) => {
    const availableCount = Math.max(totalCount - offset, 0);
    if (requestedCount < 0) {
        return availableCount;
    }
    return Math.min(Math.max(requestedCount, 0), availableCount);
};

const rangesIntersect = (start: number, extent: number, offset: number, count: number) =>
    start < offset + count && start + extent > offset;

const getPopulationValue = (row: PopulationRow, years: string[]) =>
    years.reduce((total, year) => total + Number(row[year] ?? 0), 0);

const formatCellValue = (value: GridData | undefined) =>
    typeof value === 'number' ? value.toLocaleString('en-US') : String(value ?? '');

const buildVisibleRows = (expandedRows: Set<string>) => {
    const rows: VisibleRow[] = [];
    regionRows.forEach((region) => {
        const expanded = expandedRows.has(region.states);
        rows.push({
            key: region.states,
            label: region.states,
            data: region,
            treeDepth: 0,
            expanded: expanded ? 'expanded' : 'collapsed'
        });
        if (expanded) {
            (region.children ?? []).forEach((state) => {
                rows.push({
                    key: `${region.states}:${state.states}`,
                    label: state.states,
                    data: state,
                    treeDepth: 1
                });
            });
        }
    });
    return rows;
};

const buildVisibleColumns = (expandedDecades: Set<string>) => {
    const columns: VisibleColumn[] = [];
    DECADE_GROUPS.forEach((group) => {
        const expanded = expandedDecades.has(group.label);
        if (expanded) {
            group.years.forEach((year) => {
                columns.push({
                    key: year,
                    label: year,
                    years: [year],
                    decade: group.label,
                    treeDepth: 1
                });
            });
        } else {
            columns.push({
                key: group.label,
                label: group.label,
                years: group.years,
                decade: group.label,
                treeDepth: 0,
                expanded: 'collapsed'
            });
        }
    });
    return columns;
};

class RegionStateDataGridProvider implements DataGridProvider<GridData> {
    private readonly eventTarget = new EventTarget();
    private readonly version = 0;

    constructor(
        private readonly visibleRows: VisibleRow[],
        private readonly visibleColumns: VisibleColumn[],
        private readonly expandedDecades: Set<string>,
        private readonly pivoted: boolean
    ) { }

    addEventListener(eventType: string, listener: EventListener): void {
        this.eventTarget.addEventListener(eventType, listener);
    }

    removeEventListener(eventType: string, listener: EventListener): void {
        this.eventTarget.removeEventListener(eventType, listener);
    }

    getCapability(capabilityName: string): 'monotonicallyIncreasing' | null {
        return capabilityName === 'version' ? 'monotonicallyIncreasing' : null;
    }

    isEmpty(): 'yes' | 'no' {
        return this.visibleRows.length === 0 || this.visibleColumns.length === 0 ? 'yes' : 'no';
    }

    fetchByOffset(parameters: FetchByOffsetGridParameters): Promise<FetchByOffsetGridResults<GridData>> {
        const totalRowCount = this.pivoted ? this.visibleColumns.length : this.visibleRows.length;
        const totalColumnCount = this.pivoted ? this.visibleRows.length : this.visibleColumns.length;
        const rowOffset = Math.max(parameters.rowOffset, 0);
        const columnOffset = Math.max(parameters.columnOffset, 0);
        const rowCount = getRequestedCount(parameters.rowCount, totalRowCount, rowOffset);
        const columnCount = getRequestedCount(parameters.columnCount, totalColumnCount, columnOffset);
        const rowDone = rowOffset + rowCount >= totalRowCount;
        const columnDone = columnOffset + columnCount >= totalColumnCount;

        return Promise.resolve({
            fetchParameters: parameters,
            rowDone,
            columnDone,
            rowOffset,
            columnOffset,
            rowCount,
            columnCount,
            totalRowCount,
            totalColumnCount,
            results: {
                databody: this.getDatabodyResults(rowOffset, columnOffset, rowCount, columnCount),
                rowHeader: this.pivoted
                    ? this.getDecadeHeaderResults(rowOffset, rowCount, 'row')
                    : this.getRegionHeaderResults(rowOffset, rowCount, 'row'),
                columnHeader: this.pivoted
                    ? this.getRegionHeaderResults(columnOffset, columnCount, 'column')
                    : this.getDecadeHeaderResults(columnOffset, columnCount, 'column'),
                rowHeaderLabel: this.pivoted
                    ? [
                        { metadata: {}, data: 'Decade' },
                        { metadata: {}, data: 'Year' }
                    ]
                    : [{ metadata: {}, data: 'Region / State' }],
                columnHeaderLabel: this.pivoted
                    ? [{ metadata: {}, data: 'Region / State' }]
                    : [
                        { metadata: {}, data: 'Decade' },
                        { metadata: {}, data: 'Year' }
                    ]
            },
            version: this.version
        });
    }

    private getDatabodyResults(
        rowOffset: number,
        columnOffset: number,
        rowCount: number,
        columnCount: number
    ): Array<GridBodyItem<GridData>> {
        const results: Array<GridBodyItem<GridData>> = [];
        for (let rowIndex = rowOffset; rowIndex < rowOffset + rowCount; rowIndex++) {
            for (let columnIndex = columnOffset; columnIndex < columnOffset + columnCount; columnIndex++) {
                const row = this.pivoted ? this.visibleRows[columnIndex] : this.visibleRows[rowIndex];
                const column = this.pivoted ? this.visibleColumns[rowIndex] : this.visibleColumns[columnIndex];
                results.push({
                    rowExtent: 1,
                    columnExtent: 1,
                    rowIndex,
                    columnIndex,
                    metadata: {},
                    data: getPopulationValue(row.data, column.years)
                });
            }
        }
        return results;
    }

    private getRegionHeaderResults(offset: number, count: number, axis: 'row' | 'column'): Array<AxisHeaderItem> {
        const results: Array<AxisHeaderItem> = [];
        for (let index = offset; index < offset + count; index++) {
            const row = this.visibleRows[index];
            results.push({
                index,
                extent: 1,
                level: 0,
                depth: 1,
                metadata: {
                    key: row.key,
                    expanded: row.expanded,
                    state: row.expanded ?? 'leaf',
                    treeDepth: row.treeDepth
                },
                data: row.label,
                axis
            });
        }
        return results;
    }

    private getDecadeHeaderResults(offset: number, count: number, axis: 'row' | 'column'): Array<AxisHeaderItem> {
        const results: Array<AxisHeaderItem> = [];
        let index = 0;
        DECADE_GROUPS.forEach((group) => {
            const expanded = this.expandedDecades.has(group.label);
            if (expanded) {
                const extent = group.years.length;
                if (rangesIntersect(index, extent, offset, count)) {
                    results.push({
                        index,
                        extent,
                        level: 0,
                        depth: 1,
                        metadata: {
                            key: group.label,
                            expanded: 'expanded',
                            state: 'expanded',
                            treeDepth: 0
                        },
                        data: group.label,
                        axis
                    });
                }
                group.years.forEach((year, yearIndex) => {
                    const yearIndexValue = index + yearIndex;
                    if (rangesIntersect(yearIndexValue, 1, offset, count)) {
                        results.push({
                            index: yearIndexValue,
                            extent: 1,
                            level: 1,
                            depth: 1,
                            metadata: {
                                key: year,
                                state: 'leaf',
                                treeDepth: 1
                            },
                            data: year,
                            axis
                        });
                    }
                });
                index += extent;
            } else {
                if (rangesIntersect(index, 1, offset, count)) {
                    results.push({
                        index,
                        extent: 1,
                        level: 0,
                        depth: 2,
                        metadata: {
                            key: group.label,
                            expanded: 'collapsed',
                            state: 'collapsed',
                            treeDepth: 0
                        },
                        data: group.label,
                        axis
                    });
                }
                index += 1;
            }
        });
        return results;
    }
}

export default function RowExpanderDataGridDataGridRowExpanderDataProvider() {
    const [expandedRows, setExpandedRows] = useState(() => new Set(REGION_ORDER));
    const [expandedDecades, setExpandedDecades] = useState(() => new Set(DECADE_GROUPS.map((group) => group.label)));
    const [isPivoted, setIsPivoted] = useState(false);
    const visibleRows = useMemo(() => buildVisibleRows(expandedRows), [expandedRows]);
    const visibleColumns = useMemo(() => buildVisibleColumns(expandedDecades), [expandedDecades]);
    const dataSource = useMemo(
        () => new RegionStateDataGridProvider(visibleRows, visibleColumns, expandedDecades, isPivoted),
        [visibleRows, visibleColumns, expandedDecades, isPivoted]
    );

    const expand = (axis: 'row' | 'column', value: string) => {
        const shouldExpandRegion = isPivoted ? axis === 'column' : axis === 'row';
        if (shouldExpandRegion) {
            setExpandedRows((current) => new Set(current).add(value));
        } else {
            setExpandedDecades((current) => new Set(current).add(value));
        }
    };

    const collapse = (axis: 'row' | 'column', value: string) => {
        const shouldCollapseRegion = isPivoted ? axis === 'column' : axis === 'row';
        if (shouldCollapseRegion) {
            setExpandedRows((current) => {
                const next = new Set(current);
                next.delete(value);
                return next;
            });
        } else {
            setExpandedDecades((current) => {
                const next = new Set(current);
                next.delete(value);
                return next;
            });
        }
    };

    const handleExpandRequest: NonNullable<ComponentProps<'oj-data-grid'>['onojExpandRequest']> = (event) => {
        expand(event.detail.axis, String(event.detail.item.data));
    };

    const handleCollapseRequest: NonNullable<ComponentProps<'oj-data-grid'>['onojCollapseRequest']> = (event) => {
        collapse(event.detail.axis, String(event.detail.item.data));
    };

    const headerRenderer = createRenderer((context) => (
        <span class="demo-rowexpander-dataprovider-header-cell">
            <span>{formatCellValue(context.data)}</span>
        </span>
    ));

    const cellRenderer = createRenderer((context) => <span>{formatCellValue(context.data)}</span>);

    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        selectionMode: {
            cell: 'single'
        },
        header: {
            row: {
                renderer: headerRenderer,
                style: isPivoted ? 'width:125px;' : 'width:220px;',
                resizable: {
                    width: 'enable'
                }
            },
            column: {
                renderer: headerRenderer,
                style: isPivoted ? 'width:180px;' : 'width:125px;',
                resizable: {
                    width: 'enable'
                }
            }
        },
        cell: {
            className: 'oj-sm-justify-content-flex-end',
            renderer: cellRenderer
        }
    };

    return (
        <div class="demo-rowexpander-dataprovider-container">
            <div class="demo-rowexpander-dataprovider-toolbar">
                <oj-button
                    id="pivotButton"
                    aria-label={isPivoted ? 'Restore original data grid layout' : 'Pivot data grid'}
                    onojAction={() => setIsPivoted((current) => !current)}
                >
                    Pivot
                </oj-button>
            </div>
            <oj-data-grid
                id="datagrid"
                class="demo-rowexpander-dataprovider"
                aria-label="Data Grid with Row Expander"
                data={dataSource}
                onojCollapseRequest={handleCollapseRequest}
                onojExpandRequest={handleExpandRequest}
                {...ojDataGridProps}
            />
        </div>
    );
};
