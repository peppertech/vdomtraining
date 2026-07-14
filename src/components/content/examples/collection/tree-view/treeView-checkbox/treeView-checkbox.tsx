import { AllKeySetImpl,KeySet,KeySetImpl } from 'ojs/ojkeyset';
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

type TreeViewSelectedChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tree-view'>['onselectedChanged']>
>[0];

const jsonData = JSON.parse(jsonDataText as string) as TreeNode[];

const initialSelected = new KeySetImpl<string>().add(['today', 'archive', 'microsoft']);

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

const getSelectedText = (selected: KeySet<string>) =>
  Array.from((selected as KeySetImpl<string>).values()).join(', ') || 'none';

export const TreeViewCheckbox = () => {
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'id'
      }),
    []
  );
  const expanded = useMemo(() => new AllKeySetImpl<string>(), []);
  const [selected, setSelected] = useState<KeySet<string>>(initialSelected);

  const handleSelectedChanged = (event: TreeViewSelectedChangedEvent) => {
    setSelected(event.detail.value as KeySet<string>);
  };

  return (
    <div id="treeview-container">
      <span class="oj-typography-body-lg oj-typography-bold">Selected:</span>
      <span id="selected-list">{getSelectedText(selected)}</span>
      <div class="oj-sm-margin-6x-bottom" />
      <oj-tree-view
        id="treeview"
        data={data}
        selected={selected}
        expanded={expanded}
        selectionMode="leafOnly"
        onselectedChanged={handleSelectedChanged}
        aria-label="Cascading Leaf Only Treeview"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewCheckbox;
