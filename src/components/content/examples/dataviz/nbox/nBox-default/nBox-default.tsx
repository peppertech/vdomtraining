import 'ojs/ojnbox';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Employee = {
  name: string;
  position: string;
  potential: string;
  performance: string;
  image?: string;
  initials?: string;
  background?: string;
};

type NodeTemplateContext = {
  data: Employee;
};

const employees = JSON.parse(jsonDataText as string) as Employee[];

export const NBoxDefault = () => {
  const rows = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
  const columns = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
  const cells = useMemo(() => [
      {
          row: '0',
          column: '0',
          shortDesc: 'Low Potential, Poor Performance'
      },
      {
          row: '0',
          column: '1',
          shortDesc: 'Low Potential, Fair Performance'
      },
      {
          row: '0',
          column: '2',
          shortDesc: 'Low Potential, Good Performance'
      },
      {
          row: '1',
          column: '0',
          shortDesc: 'Medium Potential, Poor Performance'
      },
      {
          row: '1',
          column: '1',
          shortDesc: 'Medium Potential, Fair Performance'
      },
      {
          row: '1',
          column: '2',
          shortDesc: 'Medium Potential, Good Performance'
      },
      {
          row: '2',
          column: '0',
          shortDesc: 'High Potential, Poor Performance'
      },
      {
          row: '2',
          column: '1',
          shortDesc: 'High Potential, Fair Performance'
      },
      {
          row: '2',
          column: '2',
          shortDesc: 'High Potential, Good Performance'
      }
  ], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<Employee['name'], Employee>(employees, { keyAttributes: 'name' }),
    []
  );

  const nodeTemplateRenderer = (current: NodeTemplateContext) => {
    const employee = current.data;

    return (
      <oj-n-box-node
        label={employee.name}
        secondaryLabel={employee.position}
        row={employee.potential}
        column={employee.performance}
        shortDesc={`${employee.name} - ${employee.position}`}
        icon={{
          source: employee.image ? `images/hcm/placeholder-${employee.image}.png` : '',
          initials: employee.initials,
          background: employee.background
        }}
      />
    );
  };

  return (
      <oj-n-box
        id="nbox-container"
        animationOnDataChange="auto"
        data={dataProvider}
        rows={rows}
        columns={columns}
        cells={cells}
        rowsTitle="Potential"
        columnsTitle="Performance"
        aria-label="NBox showing employees grouped by potential and performance."
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-n-box>
    );
};

export default NBoxDefault;
