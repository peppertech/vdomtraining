import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/stateRegions.json';
import "css!./demo.css";
const jsonData = JSON.parse(jsonDataText as string);
interface RegionSummaryRow {
    label: string;
    [key: string]: string | number;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<RegionSummaryRow>;
const YEARS = ['2018', '2019', '2020'] as const;
const buildRegionRows = (expanded: boolean): RegionSummaryRow[] => {
    const totals = new Map<string, number[]>();
    (jsonData as Array<Record<string, string | number>>).forEach((item) => {
        const region = String(item.region);
        const values = YEARS.map((year) => Number(item[year] ?? 0));
        const current = totals.get(region) ?? [0, 0, 0];
        totals.set(region, current.map((value, index) => value + values[index]));
    });
    return Array.from(totals.entries()).map(([region, values]) => {
        const row: RegionSummaryRow = {
            label: region,
            total: values.reduce((sum, value) => sum + value, 0)
        };
        if (expanded) {
            YEARS.forEach((year, index) => {
                row[year] = values[index];
            });
        }
        return row;
    });
};
const buildPivotRows = (expanded: boolean): RegionSummaryRow[] => {
    const regions = Array.from(new Set((jsonData as Array<Record<string, string | number>>).map((item) => String(item.region))));
    return YEARS.map((year) => {
        const row: RegionSummaryRow = {
            label: year
        };
        regions.forEach((region) => {
            const total = (jsonData as Array<Record<string, string | number>>)
                .filter((item) => String(item.region) === region)
                .reduce((sum, item) => sum + Number(item[year] ?? 0), 0);
            row[region] = total;
        });
        row.total = regions.reduce((sum, region) => sum + Number(row[region] ?? 0), 0);
        if (!expanded) {
            return { label: year, total: row.total };
        }
        return row;
    });
};
export const DataGridExpandHeaders = () => {
    const [pivot, setPivot] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(true);
    const rows = useMemo(() => pivot ? buildPivotRows(expanded) : buildRegionRows(expanded), [expanded, pivot]);
    const columns = useMemo(() => {
        if (!expanded) {
            return ['total'];
        }
        if (pivot) {
            const regions = Array.from(new Set((jsonData as Array<Record<string, string | number>>).map((item) => String(item.region))));
            return [...regions, 'total'];
        }
        return [...YEARS, 'total'];
    }, [expanded, pivot]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, RegionSummaryRow>(rows, {
        keyAttributes: 'label'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, RegionSummaryRow>(rowDataProvider, {
        columns: {
            rowHeader: ['label'],
            databody: columns
        },
        columnHeaders: {
            column: columns.map((column) => column === 'total' ? 'Total' : column)
        },
        headerLabels: {
            row: [pivot ? 'Year' : 'Region']
        }
    }), [columns, pivot, rowDataProvider]);
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: true }), []);
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return numberConverter.format(Number(cell.item.data.data));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                style: pivot ? 'width:120px;' : 'width:170px;',
                sortable: 'disable'
            },
            column: {
                style: 'width:150px;',
                sortable: 'disable'
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-button id="toggleExpand" onojAction={() => setExpanded((current) => !current)}>{expanded ? 'Collapse Detail Columns' : 'Expand Detail Columns'}</oj-button>
                    <oj-button id="pivot" onojAction={() => setPivot((current) => !current)}>{pivot ? 'Show Regions As Rows' : 'Pivot To Years'}</oj-button>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid expandable headers demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridExpandHeaders;
