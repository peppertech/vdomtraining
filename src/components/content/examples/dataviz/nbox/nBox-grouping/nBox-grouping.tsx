// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojnbox';
import 'ojs/ojformlayout';
import '../../../../../jet-composites/demo-radioset-enum/loader';

type PropertyChangedEvent<T> = CustomEvent<{
  value: T;
}>;

type Employee = {
  name: string;
  position: string;
  department: string;
  role: string;
  performance: string;
  potential: string;
};

const rows = [{ id: '0' }, { id: '1' }, { id: '2' }];
const columns = [{ id: '0' }, { id: '1' }, { id: '2' }];
const cells = [
  { row: '0', column: '0', shortDesc: 'Low Potential, Poor Performance' },
  { row: '0', column: '1', shortDesc: 'Low Potential, Fair Performance' },
  { row: '0', column: '2', shortDesc: 'Low Potential, Good Performance' },
  { row: '1', column: '0', shortDesc: 'Medium Potential, Poor Performance' },
  { row: '1', column: '1', shortDesc: 'Medium Potential, Fair Performance' },
  { row: '1', column: '2', shortDesc: 'Medium Potential, Good Performance' },
  { row: '2', column: '0', shortDesc: 'High Potential, Poor Performance' },
  { row: '2', column: '1', shortDesc: 'High Potential, Fair Performance' },
  { row: '2', column: '2', shortDesc: 'High Potential, Good Performance' }
];
const backgroundByDepartment: Record<string, string> = {
  Development: 'blue',
  Documentation: 'purple',
  Marketing: 'orange',
  'Product Management': 'teal'
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((part) => Number.isNaN(Number(part)))
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('');

export const NBoxGrouping = () => {
  const [groupBehavior, setGroupBehavior] = useState<any>('withinCell');
  const employees = useMemo(() => JSON.parse(jsonData) as Employee[], []);
  const colorHandler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        Development: '#4f7fb8',
        Documentation: '#8d6db8',
        Marketing: '#d47b32',
        'Product Management': '#3b938c'
      }),
    []
  );
  const nodes = useMemo(
    () =>
      employees.map((employee) => ({
        id: employee.name,
        label: employee.name,
        secondaryLabel: employee.position,
        row: employee.potential,
        column: employee.performance,
        groupCategory: employee.department,
        color: colorHandler.getValue(employee.department),
        categories: [employee.department, employee.role],
        shortDesc: `${employee.name} - ${employee.position}, ${employee.department}`,
        icon: {
          shape: 'human',
          initials: getInitials(employee.name),
          background: backgroundByDepartment[employee.department] ?? 'neutral'
        }
      })),
    [colorHandler, employees]
  );
  const dataProvider = useMemo(
    () => new ArrayDataProvider(nodes, { keyAttributes: 'id' }),
    [nodes]
  );
  const handleGroupBehaviorChanged = (event: PropertyChangedEvent<any>) => {
    setGroupBehavior(event.detail.value);
  };

  return (
    <div>
      <oj-form-layout direction="row" max-columns={1} class="oj-sm-padding-2x">
        <demo-radioset-enum
          id="nBoxGroupingBehavior"
          labelHint="Group Behavior"
          value={groupBehavior}
          enumValues={['withinCell', 'acrossCells']}
          onvalueChanged={handleGroupBehaviorChanged}
        />
      </oj-form-layout>
      <oj-n-box
        id="nbox-grouping"
        animation-on-data-change="auto"
        animation-on-display="auto"
        data={dataProvider}
        rows={rows}
        columns={columns}
        cells={cells}
        rows-title="Potential"
        columns-title="Performance"
        groupBehavior={groupBehavior}
        groupAttributes={['color']}
        otherThreshold={0}
        aria-label="NBox showing employee nodes grouped by department."
        style="width: 100%; height: 420px;"
      />
    </div>
  );
};

export default NBoxGrouping;
