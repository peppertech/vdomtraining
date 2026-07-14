import "css!./demo.css";
import * as KeySet from 'ojs/ojkeyset';
import 'ojs/ojrowexpander';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../../../data/cookbook/dataCollections/table/shared/groupData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
interface OpportunityRow {
    probability: string;
    description: string;
    id: string;
    account: string;
    salesstage: string;
    amount: number;
    paymentdate: string;
}
interface OpportunityGroupRow {
    id: string;
    salesstage: string;
    count: number;
    amount: number;
    accText: string;
    children: OpportunityRow[];
}
type TableRow = OpportunityGroupRow | OpportunityRow;
type TableColumns = ComponentProps<'oj-table'>['columns'];
type TableRowSelectable = NonNullable<NonNullable<ComponentProps<'oj-table'>['row']>['selectable']>;
type TableRowSticky = NonNullable<NonNullable<ComponentProps<'oj-table'>['row']>['sticky']>;
type TableRowTemplateContext = ojTable.RowTemplateContext<string, TableRow>;
const data = JSON.parse(dataText as string) as OpportunityGroupRow[];
export const TableGroupTable = () => {
    const dataArray = data;
    const columns = useMemo<TableColumns>(() => ([
        { headerText: 'Probability', id: 'probability', field: 'probability' },
        { headerText: 'Description', id: 'description', field: 'description' },
        { headerText: 'Account', id: 'account', field: 'account' },
        { headerText: 'Sales Stage', id: 'salesStage', field: 'salesstage' },
        { headerText: 'Amount', headerClassName: 'oj-helper-text-align-end', className: 'oj-helper-text-align-end', id: 'amount', field: 'amount' },
        { headerText: 'Payment Date', headerClassName: 'oj-helper-text-align-end', className: 'oj-helper-text-align-end', id: 'paymentDate', field: 'paymentdate' }
    ]), []);
    const dataprovider = useMemo(() => new ArrayTreeDataProvider<string, TableRow>(dataArray, {
        keyAttributes: 'id'
    }), [dataArray]);
    const expanded = useMemo(() => new KeySet.KeySetImpl<string>(['4']), []);
    const flattenedTreeDataProviderView = useMemo(() => new FlattenedTreeDataProviderView(dataprovider, {
        expanded: expanded
    }), [dataprovider, expanded]);
    const rowItemTemplate = (row: TableRowTemplateContext) => {
        if (row.item.metadata.treeDepth === 0) {
            const rowData = row.item.data as OpportunityGroupRow;
            return (
                <tr class="demo-group-row">
                    <td colSpan={6} aria-label={rowData.accText} class="oj-sm-padding-0-start demo-group-cell">
                        <div class="oj-flex-bar oj-sm-align-items-center demo-group-content">
                            <div class="demo-group-expander">
                                <oj-row-expander context={row} data-oj-clickthrough="disabled"></oj-row-expander>
                            </div>
                            <div tabIndex={0} class="demo-group-title">
                                {rowData.salesstage}
                            </div>
                            <div class="oj-flex-bar-end oj-sm-text-align-end demo-group-summary">
                                <div tabIndex={0} class="demo-group-summary-item">
                                    <span class="demo-group-summary-label">Results</span>
                                    <div class="demo-group-summary-value">{rowData.count}</div>
                                </div>
                                <div tabIndex={0} class="demo-group-summary-item">
                                    <span class="demo-group-summary-label">Amount</span>
                                    <div class="demo-group-summary-value">{rowData.amount}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }

        const rowData = row.item.data as OpportunityRow;
        return (
            <tr>
                <td>{rowData.probability}</td>
                <td>{rowData.description}</td>
                <td>{rowData.account}</td>
                <td>{rowData.salesstage}</td>
                <td class="oj-helper-text-align-end">{rowData.amount}</td>
                <td class="oj-helper-text-align-end">{rowData.paymentdate}</td>
            </tr>
        );
    };
    const setRowSelectable: TableRowSelectable = (item) => {
        if (item.metadata.treeDepth === 0) {
            return 'off';
        }
        return 'on';
    };
    const setRowSticky: TableRowSticky = (item) => {
        if (item.metadata.treeDepth === 0) {
            return 'on';
        }
        return 'off';
    };
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = { accessibility: {
            rowHeader: "salesStage"
        }, selectionMode: {
            row: "multiple"
        }, row: {
            selectable: setRowSelectable,
            sticky: setRowSticky
        } };
    return (<oj-table id="table" class="demo-table-container" aria-label="Group By Data Demo" data={flattenedTreeDataProviderView} columns={columns} {...ojTableProps}>
        <template slot="rowTemplate" render={rowItemTemplate}></template>
    </oj-table>);
};
export default TableGroupTable;
