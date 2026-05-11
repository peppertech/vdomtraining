import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import * as empDataText from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';
import 'ojs/ojtable';
import 'ojs/ojgauge';
import 'ojs/ojinputtext';
import 'ojs/ojgauge';
import 'ojs/ojgauge';

interface EmployeeData {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Revenue: number;
  Rating: number;
  TargetComplete: number;
  TargetIncomplete: number;
}

type TableColumns = ComponentProps<'oj-table'>['columns'];
type GaugeThresholds = ComponentProps<'oj-status-meter-gauge'>['thresholds'];
type RowTemplateContext = {
  data: EmployeeData;
};

export const TableRowTemplate = () => {
  const employees = useMemo<EmployeeData[]>(() => JSON.parse(empDataText as string) as EmployeeData[], []);
  const totalRevenue = useMemo(
    () => employees.reduce((sum, employee) => sum + employee.Revenue, 0),
    [employees]
  );

  const dataprovider = useMemo(
    () => new ArrayDataProvider<number, EmployeeData>(employees, { keyAttributes: 'EmployeeId' }),
    [employees]
  );
  const thresholdValues = useMemo<GaugeThresholds>(() => [{ max: 33 }, { max: 67 }, {}], []);
  const revenueConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      }),
    []
  );
  const columnArray = useMemo<TableColumns>(
    () => [
      {
        headerText: 'Employee Id',
        footerTemplate: 'revenueLabelTemplate',
        sortable: 'enabled',
        sortProperty: 'EmployeeId',
        id: 'id'
      },
      {
        headerText: 'Employee Name',
        sortable: 'enabled',
        sortProperty: 'FirstName',
        id: 'name'
      },
      {
        headerText: 'Sales Revenue',
        footerTemplate: 'revenueTotalTemplate',
        sortProperty: 'Revenue',
        id: 'revenue'
      },
      { headerText: 'Rating', sortable: 'disabled', id: 'rating' },
      { headerText: 'Sales Target Achievement', sortable: 'disabled', id: 'target' }
    ],
    []
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'name' }
  };

  return (
    <oj-table
      id="table"
      aria-label="Sales Representative Table"
      data={dataprovider}
      columns={columnArray}
      class="demo-table-container"
      {...ojTableProps}
    >
      <template
        slot="rowTemplate"
        render={(row: RowTemplateContext) => (
          <tr>
            <td>{row.data.EmployeeId}</td>
            <td>{`${row.data.FirstName} ${row.data.LastName}`}</td>
            <td>{revenueConverter.format(row.data.Revenue)}</td>
            <td>
              <oj-rating-gauge value={row.data.Rating} readonly aria-label="Rating gauge showing employees rating" />
            </td>
            <td class="oj-flex demo-gauge-row">
              <oj-status-meter-gauge
                min={0}
                max={100}
                value={row.data.TargetComplete}
                thresholds={thresholdValues}
                class="demo-meter-gauge"
                readonly
                aria-label="Status meter gauge showing achieved sales"
              />
              <div>{row.data.TargetComplete}</div>
            </td>
          </tr>
        )}
      />
      <template
        slot="revenueLabelTemplate"
        render={() => (
          <span class="oj-typography-subheading-xs">Total Revenue</span>
        )}
      />
      <template
        slot="revenueTotalTemplate"
        render={() => (
          <>{revenueConverter.format(totalRevenue)}</>
        )}
      />
    </oj-table>
  );
};

export default TableRowTemplate;
