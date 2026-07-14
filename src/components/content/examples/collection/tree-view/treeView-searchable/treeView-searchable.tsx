import 'ojs/ojinputsearch';
import type { InputSearchElement } from 'ojs/ojinputsearch';
import { AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojtreeview';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type TreeNode = {
  title: string;
  id: string;
  children?: TreeNode[];
};

type TreeViewItemTemplateContext = {
  data: TreeNode;
};

type InputSearchValue = ComponentProps<'oj-input-search'>['value'];
type InputSearchValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-search'>['onvalueChanged']>
>[0];
type InputSearchValueActionEvent = InputSearchElement.ojValueAction<string, TreeNode>;

const jsonData = JSON.parse(jsonDataText as string) as TreeNode[];

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

const filterData = (dataArray: TreeNode[], searchCriteria: string) => {
  for (let index = dataArray.length - 1; index >= 0; index -= 1) {
    const item = dataArray[index];
    if (item.children && item.children.length > 0) {
      if (!item.title.toLowerCase().includes(searchCriteria)) {
        filterData(item.children, searchCriteria);
        if (item.children.length === 0) {
          dataArray.splice(index, 1);
        }
      }
    } else if (!item.title.toLowerCase().includes(searchCriteria)) {
      dataArray.splice(index, 1);
    }
  }
};

const createDataProvider = (searchTerm?: string | null) => {
  if (!searchTerm) {
    return new ArrayTreeDataProvider(jsonData, {
      keyAttributes: 'id'
    });
  }

  const filteredData = JSON.parse(jsonDataText as string) as TreeNode[];
  filterData(filteredData, searchTerm.toLowerCase());

  return new ArrayTreeDataProvider(filteredData, {
    keyAttributes: 'id'
  });
};

export const TreeViewSearchable = () => {
  const expanded = useMemo(() => new AllKeySetImpl<string>(), []);
  const [value, setValue] = useState<InputSearchValue>(undefined);
  const [data, setData] = useState(() => createDataProvider());

  const handleValueChanged = (event: InputSearchValueChangedEvent) => {
    setValue(event.detail.value);
  };

  const handleValueAction = (event: InputSearchValueActionEvent) => {
    setData(createDataProvider(event.detail.value));
  };

  return (
    <div id="treeview-container">
      <div class="oj-panel oj-bg-neutral-30">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Search The Treeview Below
        </h2>
        <oj-input-search
          id="search1"
          class="oj-form-control-max-width-md"
          value={value}
          onvalueChanged={handleValueChanged}
          onojValueAction={handleValueAction}
          placeholder="Search..."
          aria-label="My search field"
        />
      </div>
      <oj-tree-view
        id="treeview"
        data={data}
        selectionMode="multiple"
        expanded={expanded}
        aria-label="Searchable Tree View with JSON Data"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewSearchable;
