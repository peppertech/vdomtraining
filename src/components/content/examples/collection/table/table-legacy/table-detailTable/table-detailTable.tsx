import "css!./demo.css";
import 'ojs/ojchart';
import 'ojs/ojrowexpander';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataStrText from 'text!../../../data/cookbook/dataCollections/table/detailTable/projectData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');

type ProjectRow = {
    attr: {
        id: string;
        name?: string;
        resource?: string;
        start?: string;
        end?: string;
        detail?: string;
        complete?: string;
        incomplete?: string;
    };
    children?: ProjectRow[];
};

type ProjectRowContext = ojTable.RowTemplateContext<ProjectRow['attr']['id'], ProjectRow>;

const jsonDataStr = JSON.parse(jsonDataStrText as string) as ProjectRow[];

export const TableDetailTable = () => {
    const columns = useMemo(() => ([
        { headerText: 'Task Name', sortProperty: 'attr.name', weight: 2, id: 'name', minWidth: '8rem' },
        { headerText: 'Resource', sortProperty: 'attr.resource', id: 'resource', minWidth: '9rem' },
        { headerText: 'Start Date', sortProperty: 'attr.start', id: 'start', minWidth: '7rem' },
        { headerText: 'End Date', sortProperty: 'attr.end', id: 'end' }
    ]), []);
    const arrayTreeDataProvider = useMemo(() => new ArrayTreeDataProvider<ProjectRow['attr']['id'], ProjectRow>(jsonDataStr, {
        keyAttributes: 'attr.id'
    }), []);
    const dataProvider = useMemo(() => new FlattenedTreeDataProviderView(arrayTreeDataProvider), [arrayTreeDataProvider]);
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = { accessibility: {
            rowHeader: "name"
        } };
    const rowTemplateRenderer = (row: ProjectRowContext) => {
        const rowData = row.item.data.attr;
        if (row.item.metadata.treeDepth === 0) {
            return (
                <tr>
                    <td>
                        <oj-row-expander context={row} data-oj-clickthrough="disabled" />
                        <span>{rowData.name}</span>
                    </td>
                    <td>{rowData.resource}</td>
                    <td>{rowData.start}</td>
                    <td>{rowData.end}</td>
                </tr>
            );
        }

        const complete = Number(rowData.complete ?? 0);
        const incomplete = Number(rowData.incomplete ?? 0);
        const detail = rowData.detail ?? '';

        return (
            <tr>
                <td colSpan={2} class="demo-table-detail-text">
                    {detail}
                </td>
                <td colSpan={2}>
                    <oj-chart
                        aria-label={`${detail} completion chart`}
                        type="pie"
                        class="demo-table-chart"
                        animationOnDisplay="auto"
                        animationOnDataChange="auto"
                        legend={{ rendered: 'off' }}
                    >
                        <oj-chart-item value={complete} groupId={['Progress']} seriesId="Complete" />
                        <oj-chart-item value={incomplete} groupId={['Progress']} seriesId="Incomplete" />
                    </oj-chart>
                </td>
            </tr>
        );
    };

    return (
        <oj-table id="table" aria-label="Tasks Table" data={dataProvider} class="demo-table-container" layout="fixed" columns={columns} {...ojTableProps}>
            <template slot="rowTemplate" render={rowTemplateRenderer} />
        </oj-table>
    );
};
export default TableDetailTable;
