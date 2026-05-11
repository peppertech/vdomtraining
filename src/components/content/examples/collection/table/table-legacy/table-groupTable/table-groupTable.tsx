import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import * as dataText from 'text!../../../data/cookbook/dataCollections/table/shared/groupData.json';
import * as KeySet from 'ojs/ojkeyset';
import 'ojs/ojtable';
import 'ojs/ojrowexpander';
import "css!./demo.css";
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
    const expanded = useMemo(() => new KeySet.AllKeySetImpl(), []);
    const flattenedTreeDataProviderView = useMemo(() => new FlattenedTreeDataProviderView(dataprovider, {
        expanded: expanded
    }), [dataprovider, expanded]);
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
    return (<oj-table id="table" class="demo-table-container" aria-label="Group By Data Demo" data={flattenedTreeDataProviderView} columns={columns} {...ojTableProps}/>);
};
export default TableGroupTable;
