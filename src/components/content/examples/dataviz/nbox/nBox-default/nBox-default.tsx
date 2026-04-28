/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojnbox';

type Employee = {
  name: string;
  position: string;
  potential: string;
  performance: string;
  image?: string;
  initials?: string;
  background?: string;
};

export const NBoxDefault = () => {
  const employees = JSON.parse(jsonData) as Employee[];
  const data = useMemo(
    () =>
      employees.map((employee) => ({
        label: employee.name,
        secondaryLabel: employee.position,
        row: employee.potential,
        column: employee.performance,
        shortDesc: `${employee.name} - ${employee.position}`,
        icon: {
          source: employee.image ? `images/hcm/placeholder-${employee.image}.png` : '',
          initials: employee.initials,
          background: employee.background
        }
      })),
    [employees]
  );
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
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'label'
  }), [data]);

  return (
      <oj-n-box
        id="nbox-container"
        animation-on-data-change="auto"
        data={dataProvider}
        rows={rows}
        columns={columns}
        cells={cells}
        rows-title="Potential"
        columns-title="Performance"
        aria-label="NBox showing employees grouped by potential and performance."
      />
    );
};

export default NBoxDefault;
