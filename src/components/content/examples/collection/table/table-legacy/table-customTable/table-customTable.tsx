import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import type { ojTable } from 'ojs/ojtable';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import * as empDataText from 'text!../../../data/cookbook/dataCollections/table/customTable/employeeData.json';
import 'ojs/ojtable';
import 'ojs/ojavatar';
import 'ojs/ojgauge';
import 'ojs/ojgauge';
import "css!./demo.css";

type EmployeeData = {
  EmployeeId: number;
  Photo: string;
  FirstName: string;
  LastName: string;
  Revenue: number;
  Rating: number;
  TargetComplete: number;
  TargetIncomplete: number;
};

type TableColumns = ComponentProps<'oj-table'>['columns'];
type EmployeeCellContext = ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>;

export const TableCustomTable = () => {
  const employees = useMemo<EmployeeData[]>(() => JSON.parse(empDataText as string) as EmployeeData[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(employees, { keyAttributes: 'EmployeeId' }),
    [employees]
  );
  const thresholdValues = useMemo(() => [{ max: 33 }, { max: 67 }, {}], []);
  const revenueConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      }),
    []
  );
  const totalRevenue = useMemo(
    () => employees.reduce((sum, employee) => sum + employee.Revenue, 0),
    [employees]
  );
  const columns = useMemo<TableColumns>(
    () => [
      {
        template: 'photoTemplate',
        footerTemplate: 'revenueTotalLabelTemplate',
        sortable: 'disabled',
        id: 'photo'
      },
      {
        headerText: 'Employee Name',
        sortable: 'enabled',
        template: 'nameTemplate',
        sortProperty: 'FirstName',
        id: 'name'
      },
      {
        headerText: 'Sales Revenue',
        template: 'revenueTemplate',
        footerTemplate: 'revenueTotalTemplate',
        sortProperty: 'Revenue',
        id: 'revenue'
      },
      {
        headerText: 'Rating',
        field: 'Rating',
        template: 'ratingTemplate',
        id: 'rating'
      },
      {
        headerText: 'Sales Target Achievement',
        sortable: 'disabled',
        template: 'targetTemplate',
        id: 'target'
      }
    ],
    []
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'name' }
  };

  const photoTemplateRenderer = (cell: EmployeeCellContext) => (
    <oj-avatar
      role="img"
      src={cell.item.data.Photo}
      size="xs"
      aria-label={`Avatar of ${cell.item.data.FirstName} ${cell.item.data.LastName}`}
      title={`Avatar of ${cell.item.data.FirstName} ${cell.item.data.LastName}`}
    />
  );

  const nameTemplateRenderer = (cell: EmployeeCellContext) => (
    <span>{`${cell.item.data.FirstName} ${cell.item.data.LastName}`}</span>
  );

  const revenueTemplateRenderer = (cell: EmployeeCellContext) => (
    <span>{revenueConverter.format(cell.item.data.Revenue)}</span>
  );

  const revenueTotalLabelTemplateRenderer = () => (
    <span class="oj-typography-body-md oj-typography-bold">Total Revenue</span>
  );

  const revenueTotalTemplateRenderer = () => (
    <span>{revenueConverter.format(totalRevenue)}</span>
  );

  const ratingTemplateRenderer = (cell: EmployeeCellContext) => (
    <oj-rating-gauge
      value={cell.item.data.Rating}
      readonly
      class="demo-table-rating-gauge"
      aria-label="Rating gauge"
    />
  );

  const targetTemplateRenderer = (cell: EmployeeCellContext) => (
    <div class="oj-flex">
      <oj-status-meter-gauge
        min={0}
        max={100}
        value={cell.item.data.TargetComplete}
        thresholds={thresholdValues}
        readonly
        class="demo-table-status-gauge"
        aria-label="Status meter gauge showing completed target"
      />
      <span>{cell.item.data.TargetComplete}</span>
    </div>
  );

  return (
    <oj-table
      id="table"
      aria-label="Sales Representative Table"
      data={dataProvider}
      columns={columns}
      class="demo-table-container"
      {...ojTableProps}
    >
      <template slot="photoTemplate" render={photoTemplateRenderer} />
      <template slot="nameTemplate" render={nameTemplateRenderer} />
      <template slot="revenueTemplate" render={revenueTemplateRenderer} />
      <template slot="revenueTotalLabelTemplate" render={revenueTotalLabelTemplateRenderer} />
      <template slot="revenueTotalTemplate" render={revenueTotalTemplateRenderer} />
      <template slot="ratingTemplate" render={ratingTemplateRenderer} />
      <template slot="targetTemplate" render={targetTemplateRenderer} />
    </oj-table>
  );
};

export default TableCustomTable;
