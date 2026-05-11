/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojTable } from 'ojs/ojtable';
import 'ojs/ojtable';
import 'ojs/ojbutton';

interface Task {
    id: string;
    name: string;
    region: string;
    billingAddress: string;
    balance: string;
    date: string;
    status: string;
}

export const TableNoDataTable = () => {
  const [data, setData] = useState<Task[]>([]);
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Name', id: 'name', sortable: 'enabled', minWidth: '8rem' },
      { headerText: 'Region', id: 'region' },
      { headerText: 'Billing Address', id: 'billingAddress', weight: 2 },
      { headerText: 'Balance', id: 'balance', headerClassName: 'oj-helper-text-align-end', className: 'oj-helper-text-align-end' },
      { headerText: 'Date', id: 'date' },
      { headerText: 'Status', id: 'status' },
      { headerText: 'Action', headerClassName: 'oj-helper-text-align-end', className: 'oj-helper-text-align-end oj-sm-padding-0-vertical', id: 'action' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'name' },
      selectionMode: { row: 'multiple' },
      columnsDefault: { sortable: 'disabled' }
  };

  const dataprovider = useMemo(() => new ArrayDataProvider<Task['id'], Task>(data, {
      keyAttributes: 'id'
  }), [data]);

  const addNewTask = () => {
      setData((current) => [...current, {
          id: `${current.length + 1}`,
          name: 'Andrew Sky',
          region: 'North',
          billingAddress: '1942 Sun Peak Drive, Park City, UT 84060',
          balance: '$525.12',
          date: '02-06-2021',
          status: 'Paid'
      }]);
  };

  const removeCustomer = (event: Event, context: ojTable.RowTemplateContext<Task['id'], Task>) => {
      setData((current) => current.filter((row) => row.id !== context.item.data.id));
  };

  return (
      <oj-table id="table" aria-label="Task Table" data={dataprovider} layout="fixed" columns={columns} class="demo-table-container" {...ojTableProps}>
            <template slot="rowTemplate" render={(row) => (
                  <>
                      <tr>
                                  <td>{row.data.name}</td>
                                  <td>{row.data.region}</td>
                                  <td>{row.data.billingAddress}</td>
                                  <td>{row.data.balance}</td>
                                  <td>{row.data.date}</td>
                                  <td>{row.data.status}</td>
                                  <td>
                                                <oj-button onojAction={(event) => removeCustomer(event, row)} class="oj-button-sm" display="icons" chroming="borderless" data-oj-clickthrough="disabled"><span slot="startIcon" class="oj-ux-ico-delete-circle" /></oj-button>
                                            </td>
                              </tr>
                  </>
                )} />
            <template slot="noData" render={($current) => (
                  <>
                      <div class="oj-flex oj-sm-flex-direction-column oj-sm-width-full">
                                  <span class="oj-sm-padding-2x oj-typography-body-xl">Add a customer for this account.</span>
                                  <oj-button onojAction={addNewTask} class="oj-sm-padding-2x oj-sm-align-self-flex-start oj-button-sm" data-oj-clickthrough="disabled">Add Customer</oj-button>
                              </div>
                  </>
                )} />
        </oj-table>
    );
};

export default TableNoDataTable;
