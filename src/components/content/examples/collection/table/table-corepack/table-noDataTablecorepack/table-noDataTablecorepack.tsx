import 'css!./demo.css';
import 'oj-c/table';
import 'ojs/ojbutton';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface Task {
  id: string;
  name: string;
  region: string;
  billingAddress: string;
  balance: string;
  date: string;
  status: string;
}

export default function TableNoDataTablecorepack() {
  const [data, setData] = useState<Task[]>([]);
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
    name: { headerText: 'Name', field: 'name', minWidth: 128 },
    region: { headerText: 'Region', field: 'region' },
    billingAddress: { headerText: 'Billing Address', field: 'billingAddress', weight: 2 },
    balance: { headerText: 'Balance', field: 'balance' },
    date: { headerText: 'Date', field: 'date' },
    status: { headerText: 'Status', field: 'status' },
    action: { headerText: 'Action', template: 'actionTemplate' }
  }), []);
  const dataProvider = useMemo(() => new ArrayDataProvider<Task['id'], Task>(data, {
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

  const removeCustomer = (id: Task['id']) => {
    setData((current) => current.filter((row) => row.id !== id));
  };

  return (
    <oj-c-table
      id="table"
      aria-label="Task Table"
      data={dataProvider}
      layout="fixed"
      columns={columns}
      row={{ accessibleRowHeader: 'name' }}
      selectionMode={{ row: 'multiple' }}
      class="demo-table-container"
    >
      <template slot="actionTemplate" render={(cell) => (
        <oj-button
          onojAction={() => removeCustomer(cell.item.data.id)}
          class="oj-button-sm"
          display="icons"
          chroming="borderless"
          aria-label={`Remove ${cell.item.data.name}`}
          data-oj-clickthrough="disabled"
        >
          <span slot="startIcon" class="oj-ux-ico-delete-circle" />
        </oj-button>
      )} />
      <template slot="noData" render={() => (
        <div class="oj-flex oj-sm-flex-direction-column oj-sm-width-full">
          <span class="oj-sm-padding-2x oj-typography-body-xl">Add a customer for this account.</span>
          <oj-button onojAction={addNewTask} class="oj-sm-padding-2x oj-sm-align-self-flex-start oj-button-sm" data-oj-clickthrough="disabled">
            Add Customer
          </oj-button>
        </div>
      )} />
    </oj-c-table>
  );
}

export { TableNoDataTablecorepack };
