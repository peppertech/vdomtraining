// @ts-nocheck
import { render } from 'preact';
import type { ComponentChildren, ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as Model from 'ojs/ojmodel';
import * as CollectionTreeDataSource from 'ojs/ojcollectiontreedatasource';
import * as flattenedModule from 'ojs/ojflattenedtreedatagriddatasource';
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/rowExpanderDataGrid/collectionRowExpander/projectData.json';
import 'ojs/ojrowexpander';
import 'ojs/ojdatagrid';
import 'css!./demo.css';

type DataGridRendererContext = {
  key?: string | number;
  data?: unknown;
  [property: string]: unknown;
};

type EmployeeRecord = {
  EmployeeId: number;
  ManagerId: number | null;
  LastName: string;
  FirstName: string;
  Salary: number;
};

type EmployeeModel = {
  id: number | null;
  get: (property: keyof EmployeeRecord) => EmployeeRecord[keyof EmployeeRecord];
};

const createRenderer =
  (factory: (context: DataGridRendererContext) => ComponentChildren) =>
  (context: DataGridRendererContext) => {
  const container = document.createElement('div');
  render(factory(context), container);
  return { insert: container };
};

export const RowExpanderDataGridCollectionRowExpander = () => {
  const dataSource = useMemo(() => {
    const empData = JSON.parse(jsonDataStr as string) as EmployeeRecord[];
    const Employee = Model.Model.extend({
      idAttribute: 'EmployeeId'
    });

    const findEmployee = (id: number | null) => {
      if (id) {
        for (let i = 0; i < empData.length; i++) {
          if (id === empData[i].EmployeeId) {
            return i;
          }
        }
      }
      return -1;
    };

    const findManager = (id: number | null) => {
      if (id) {
        for (let i = 0; i < empData.length; i++) {
          if (id === empData[i].ManagerId) {
            return i;
          }
        }
      }
      return -1;
    };

    const countDepth = (model: EmployeeModel, depth: number) => {
      if (model && model.id) {
        const managerLoc = findEmployee(model.get('ManagerId'));
        if (managerLoc > -1) {
          depth++;
          return countDepth(new Employee(empData[managerLoc]), depth);
        }
      }
      return depth;
    };

    const getChildCollection = (
      _rootCollection: Model.Collection | null,
      model: EmployeeModel | null
    ) => {
      const employees = new Model.Collection(null, {
        model: Employee
      });
      const mgrId = model === null ? null : model.id;

      for (let i = 0; i < empData.length; i++) {
        if (empData[i].ManagerId === mgrId) {
          employees.add(empData[i]);
        }
      }
      return employees;
    };

    const parseMetadata = (model: EmployeeModel) => {
      const retObj = {};
      retObj.key = model.id;
      retObj.leaf = findManager(model.id) === -1;
      retObj.depth = countDepth(model, 1);
      return retObj;
    };

    const treeDataSource = new CollectionTreeDataSource({
      root: getChildCollection(null, null),
      parseMetadata,
      childCollectionCallback: getChildCollection
    });

    return new flattenedModule.FlattenedTreeDataGridDataSource(treeDataSource, {
      rowHeader: 'LastName',
      columns: ['FirstName', 'Salary']
    });
  }, []);

  const columnHeaderRenderer = createRenderer((context) => {
    if (context.key === 'FirstName') return <span>First Name</span>;
    if (context.key === 'Salary') return <span>Salary</span>;
    return <span>{String(context.key)}</span>;
  });

  const rowHeaderRenderer = createRenderer((context) => (
    <>
      <oj-row-expander context={context} />
      <span>{String(context.data ?? '')}</span>
    </>
  ));

  const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
    'selectionMode.cell': 'single',
    'header.column.renderer': columnHeaderRenderer,
    'header.column.style': 'width:100px;',
    'header.column.resizable.width': 'enable',
    'header.row.renderer': rowHeaderRenderer,
    'header.row.style': 'width:150px;',
    'cell.className': 'oj-sm-justify-content-flex-start'
  };

  return (
    <oj-data-grid
      id="datagrid"
      class="demo-rowexpander"
      aria-label="Data Grid with Collection Row Expander"
      data={dataSource}
      {...ojDataGridProps}
    />
  );
};

export default RowExpanderDataGridCollectionRowExpander;
