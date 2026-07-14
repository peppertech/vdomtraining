import 'ojs/ojtreeview';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!./projectData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type EmployeeNode = {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Salary: number;
  children?: EmployeeNode[];
};

type TreeViewItemTemplateContext = {
  data: EmployeeNode;
};

const jsonData = JSON.parse(jsonDataText as string) as EmployeeNode[];

const getStatusIconClass = (salary: number) => {
  if (salary >= 12000) {
    return 'oj-icon-color-success oj-ux-ico-success-s oj-treeview-item-content-icon';
  }

  if (salary >= 5000) {
    return 'oj-icon-color-warning oj-ux-ico-warning-s oj-treeview-item-content-icon';
  }

  return 'oj-icon-color-danger oj-ux-ico-error-s oj-treeview-item-content-icon';
};

const getStatusIconLabel = (salary: number) => {
  if (salary >= 12000) {
    return 'success';
  }

  if (salary >= 5000) {
    return 'warning';
  }

  return 'error';
};

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => {
  const fullName = `${row.data.FirstName} ${row.data.LastName}`;
  const statusIconClass = getStatusIconClass(row.data.Salary);
  const statusLabel = getStatusIconLabel(row.data.Salary);

  return [
    <span
      key="status"
      class={statusIconClass}
      role="img"
      aria-label={statusLabel}
    />,
    <span key="icon" class="oj-treeview-item-icon" />,
    <span
      key="name"
      class="oj-typography-body-lg oj-typography-bold oj-treeview-item-text"
    >
      {fullName}
    </span>,
    <span key="email" class="oj-text-color-secondary oj-treeview-item-text">
      ({row.data.Email})
    </span>
  ];
};

export const TreeViewRenderer = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'EmployeeId'
      }),
    []
  );

  return (
    <oj-tree-view
      id="treeview"
      data={dataProvider}
      selectionMode="single"
      aria-label="Tree View with Item Renderer"
    >
      <template slot="itemTemplate" render={itemTemplateRenderer} />
    </oj-tree-view>
  );
};

export default TreeViewRenderer;
