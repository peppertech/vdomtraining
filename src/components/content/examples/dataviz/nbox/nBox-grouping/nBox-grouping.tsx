import {
  ColorAttributeGroupHandler,
  ShapeAttributeGroupHandler
} from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojlegend';
import 'ojs/ojnbox';
import 'ojs/ojoption';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type Employee = {
  name: string;
  position: string;
  department: Department;
  role: Role;
  experience: Experience;
  performance: string;
  potential: string;
  image?: string;
  initials?: string;
  background?: string;
};

type Department = 'Product Management' | 'Documentation' | 'Development' | 'Marketing';
type Role = 'Manager' | 'Individual Contributor';
type Experience = '0-2 years' | '3-5 years' | '6+ years';
type ToggleValue = 'show' | 'group';
type GroupBehavior = NonNullable<ComponentProps<'oj-n-box'>['groupBehavior']>;
type HiddenCategories = NonNullable<ComponentProps<'oj-n-box'>['hiddenCategories']>;
type IndicatorShape = NonNullable<ComponentProps<'oj-n-box-node'>['indicatorIcon']>['shape'];

type LegendItem = {
  id: string;
  text: string;
  color?: string;
  markerShape?: IndicatorShape;
  categories?: string[];
};

type LegendSection = {
  id: string;
  title: string;
  items: LegendItem[];
};

type NodeTemplateContext = {
  data: Employee;
};

const employees = JSON.parse(jsonDataText as string) as Employee[];

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

const departments: Department[] = [
  'Product Management',
  'Documentation',
  'Development',
  'Marketing'
];
const roles: Role[] = ['Manager', 'Individual Contributor'];
const experiences: Experience[] = ['0-2 years', '3-5 years', '6+ years'];

const getToggleValue = (value: unknown): ToggleValue[] =>
  Array.isArray(value) ? (value.filter((item) => item === 'show' || item === 'group') as ToggleValue[]) : [];

export const NBoxGrouping = () => {
  const [departmentValue, setDepartmentValue] = useState<ToggleValue[]>(['show']);
  const [roleValue, setRoleValue] = useState<ToggleValue[]>([]);
  const [experienceValue, setExperienceValue] = useState<ToggleValue[]>([]);
  const [groupBehavior, setGroupBehavior] = useState<GroupBehavior>('withinCell');
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>([]);

  const colorHandler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        'Product Management': '#bacfd5',
        Documentation: '#c1dece',
        Development: '#fde9b6',
        Marketing: '#e3bede'
      }),
    []
  );

  const indicatorColorHandler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        Manager: '#195f74',
        'Individual Contributor': '#32925e'
      }),
    []
  );

  const indicatorShapeHandler = useMemo(
    () =>
      new ShapeAttributeGroupHandler({
        '0-2 years': 'triangleDown',
        '3-5 years': 'circle',
        '6+ years': 'triangleUp'
      }),
    []
  );

  const dataProvider = useMemo(
    () => new ArrayDataProvider<Employee['name'], Employee>(employees, { keyAttributes: 'name' }),
    []
  );

  const groupAttributes = useMemo(() => {
    const attributes: string[] = [];
    if (departmentValue.includes('group')) {
      attributes.push('color');
    }
    if (roleValue.includes('group')) {
      attributes.push('indicatorColor');
    }
    if (experienceValue.includes('group')) {
      attributes.push('indicatorIconShape');
    }
    return attributes;
  }, [departmentValue, experienceValue, roleValue]);

  const legendData = useMemo<LegendSection[]>(() => {
    const sections: LegendSection[] = [];

    if (departmentValue.includes('show')) {
      sections.push({
        id: 'department',
        title: 'Department',
        items: departments.map((department) => ({
          id: `department-${department}`,
          text: department,
          color: colorHandler.getValue(department),
          categories: [department]
        }))
      });
    }

    if (roleValue.includes('show')) {
      sections.push({
        id: 'role',
        title: 'Role',
        items: roles.map((role) => ({
          id: `role-${role}`,
          text: role,
          color: indicatorColorHandler.getValue(role),
          categories: [role]
        }))
      });
    }

    if (experienceValue.includes('show')) {
      sections.push({
        id: 'experience',
        title: 'Experience',
        items: experiences.map((experience) => ({
          id: `experience-${experience}`,
          text: experience,
          markerShape: indicatorShapeHandler.getValue(experience) as IndicatorShape,
          color: '#6f6f6f',
          categories: [experience]
        }))
      });
    }

    return sections;
  }, [colorHandler, departmentValue, experienceValue, indicatorColorHandler, indicatorShapeHandler, roleValue]);

  const legendDataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<string, LegendSection | LegendItem>(legendData, {
        keyAttributes: 'id',
        childrenAttribute: 'items'
      }),
    [legendData]
  );

  const nboxGroupingProps = useMemo(
    () =>
      ({
        groupAttributes
      }) as unknown as Partial<ComponentProps<'oj-n-box'>>,
    [groupAttributes]
  );

  const getCategories = (department: Department, role: Role, experience: Experience): string[] | undefined => {
    const categories: string[] = [];
    if (departmentValue.includes('show')) {
      categories.push(department);
    }
    if (roleValue.includes('show')) {
      categories.push(role);
    }
    if (experienceValue.includes('show')) {
      categories.push(experience);
    }
    return categories.length > 0 ? categories : undefined;
  };

  const getGroupCategory = (department: Department, role: Role, experience: Experience): string | undefined => {
    const groupCategory: string[] = [];
    if (departmentValue.includes('group')) {
      groupCategory.push(`Department: ${department}`);
    }
    if (roleValue.includes('group')) {
      groupCategory.push(`Role: ${role}`);
    }
    if (experienceValue.includes('group')) {
      groupCategory.push(`Experience: ${experience}`);
    }
    return groupCategory.length > 0 ? groupCategory.join(', ') : undefined;
  };

  const nodeTemplateRenderer = (current: NodeTemplateContext) => {
    const employee = current.data;

    return (
      <oj-n-box-node
        label={employee.name}
        secondaryLabel={employee.position}
        row={employee.potential}
        column={employee.performance}
        shortDesc={`${employee.name} - ${employee.position}`}
        categories={getCategories(employee.department, employee.role, employee.experience)}
        groupCategory={getGroupCategory(employee.department, employee.role, employee.experience)}
        color={departmentValue.includes('show') ? colorHandler.getValue(employee.department) : undefined}
        indicatorColor={roleValue.includes('show') ? indicatorColorHandler.getValue(employee.role) : undefined}
        indicatorIcon={
          experienceValue.includes('show')
            ? { shape: indicatorShapeHandler.getValue(employee.experience) as IndicatorShape }
            : undefined
        }
        icon={{
          source: employee.image ? `images/hcm/placeholder-${employee.image}.png` : '',
          initials: employee.initials,
          background: employee.background
        }}
      />
    );
  };

  return (
    <div id="nbox-container">
      <div class="oj-sm-padding-4x-start oj-helper-inline-block">
        <oj-label for="departmentButtonSet">Department</oj-label>
        <oj-buttonset-many
          id="departmentButtonSet"
          class="oj-buttonset-width-auto oj-sm-margin-2x-vertical"
          aria-label="Choose department display settings."
          aria-controls="nbox"
          value={departmentValue}
          onvalueChanged={(event) => setDepartmentValue(getToggleValue(event.detail.value))}
        >
          <oj-option value="show">Show</oj-option>
          <oj-option value="group">Group</oj-option>
        </oj-buttonset-many>
      </div>

      <div class="oj-sm-padding-4x-start oj-helper-inline-block">
        <oj-label for="roleButtonSet">Role</oj-label>
        <oj-buttonset-many
          id="roleButtonSet"
          class="oj-buttonset-width-auto oj-sm-margin-2x-vertical"
          aria-label="Choose role display settings."
          aria-controls="nbox"
          value={roleValue}
          onvalueChanged={(event) => setRoleValue(getToggleValue(event.detail.value))}
        >
          <oj-option value="show">Show</oj-option>
          <oj-option value="group">Group</oj-option>
        </oj-buttonset-many>
      </div>

      <div class="oj-sm-padding-4x-start oj-helper-inline-block">
        <oj-label for="experienceButtonSet">Experience</oj-label>
        <oj-buttonset-many
          id="experienceButtonSet"
          class="oj-buttonset-width-auto oj-sm-margin-2x-vertical"
          aria-label="Choose experience display settings."
          aria-controls="nbox"
          value={experienceValue}
          onvalueChanged={(event) => setExperienceValue(getToggleValue(event.detail.value))}
        >
          <oj-option value="show">Show</oj-option>
          <oj-option value="group">Group</oj-option>
        </oj-buttonset-many>
      </div>

      <div class="oj-sm-padding-4x-start oj-helper-inline-block">
        <oj-label for="groupButtonSet">Group Behavior</oj-label>
        <oj-buttonset-one
          id="groupButtonSet"
          class="oj-buttonset-width-auto oj-sm-margin-2x-vertical"
          aria-label="Choose group behavior."
          aria-controls="nbox"
          value={groupBehavior}
          onvalueChanged={(event) => setGroupBehavior((event.detail.value ?? 'withinCell') as GroupBehavior)}
        >
          <oj-option value="withinCell">Within Cell</oj-option>
          <oj-option value="acrossCells">Across Cells</oj-option>
          <oj-option value="none">None</oj-option>
        </oj-buttonset-one>
      </div>

      <oj-n-box
        id="nbox"
        animationOnDataChange="auto"
        data={dataProvider}
        rows={rows}
        columns={columns}
        cells={cells}
        rowsTitle="Potential"
        columnsTitle="Performance"
        groupBehavior={groupBehavior}
        hiddenCategories={hiddenCategories}
        onhiddenCategoriesChanged={(event) => setHiddenCategories(event.detail.value ?? [])}
        aria-label="Interactive NBox chart comparing employees by performance and potential"
        {...nboxGroupingProps}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-n-box>

      <oj-legend
        id="legend"
        aria-controls="nbox"
        halign="center"
        orientation="horizontal"
        data={legendDataProvider}
        hideAndShowBehavior="on"
        hiddenCategories={hiddenCategories}
        onhiddenCategoriesChanged={(event) => setHiddenCategories(event.detail.value ?? [])}
        aria-label="Legend for NBox chart."
      />
    </div>
  );
};

export default NBoxGrouping;
