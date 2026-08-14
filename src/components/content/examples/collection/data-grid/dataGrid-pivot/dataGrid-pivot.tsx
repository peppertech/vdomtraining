import "css!./demo.css";
import 'ojs/ojbutton';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/stateRegions.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const jsonData = JSON.parse(jsonDataText as string);
interface PivotRow {
    label: string;
    [key: string]: string | number;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<PivotRow>;
const YEARS = ['2018', '2019', '2020'] as const;
const getRegions = () => Array.from(new Set((jsonData as Array<Record<string, string | number>>).map((item) => String(item.region))));
const buildRows = (pivotByYear: boolean) => {
    const regions = getRegions();
    if (pivotByYear) {
        return YEARS.map((year) => {
            const row: PivotRow = { label: year };
            regions.forEach((region) => {
                row[region] = (jsonData as Array<Record<string, string | number>>)
                    .filter((item) => String(item.region) === region)
                    .reduce((sum, item) => sum + Number(item[year] ?? 0), 0);
            });
            return row;
        });
    }
    return regions.map((region) => {
        const row: PivotRow = { label: region };
        YEARS.forEach((year) => {
            row[year] = (jsonData as Array<Record<string, string | number>>)
                .filter((item) => String(item.region) === region)
                .reduce((sum, item) => sum + Number(item[year] ?? 0), 0);
        });
        return row;
    });
};
export default function DataGridPivot() {
    const [pivotByYear, setPivotByYear] = useState<boolean>(false);
    const rows = useMemo(() => buildRows(pivotByYear), [pivotByYear]);
    const columns = useMemo(() => pivotByYear ? getRegions() : [...YEARS], [pivotByYear]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, PivotRow>(rows, {
        keyAttributes: 'label'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, PivotRow>(rowDataProvider, {
        columns: {
            rowHeader: ['label'],
            databody: columns
        },
        columnHeaders: {
            column: columns
        },
        headerLabels: {
            row: [pivotByYear ? 'Year' : 'Region']
        }
    }), [columns, pivotByYear, rowDataProvider]);
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: true }), []);
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return numberConverter.format(Number(cell.item.data.data));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                style: 'width:140px;',
                sortable: 'disable'
            },
            column: {
                style: 'width:160px;',
                sortable: 'disable'
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-button id="pivotToggle" onojAction={() => setPivotByYear((current) => !current)}>{pivotByYear ? 'Show Regions As Rows' : 'Pivot To Years'}</oj-button>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid pivot demo" data={dataGridProvider} scrollPolicy="loadMoreOnScroll" {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
