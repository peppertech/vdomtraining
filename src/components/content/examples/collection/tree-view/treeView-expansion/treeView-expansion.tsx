import 'ojs/ojbutton';
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

type TreeViewExpandedChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tree-view'>['onexpandedChanged']>
>[0];

const jsonData = JSON.parse(jsonDataText as string) as TreeNode[];
const initialExpanded = new KeySetImpl<string>().add(['blogs']);

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

const getExpandedText = (expanded: KeySet<string>) => {
  if (!expanded.isAddAll()) {
    const expandedValues = Array.from((expanded as KeySetImpl<string>).values());
    return expandedValues.length > 0 ? expandedValues.join(', ') : 'none';
  }

  const deletedValues = Array.from((expanded as AllKeySetImpl<string>).deletedValues());
  return deletedValues.length > 0
    ? `All Expanded Except ${deletedValues.join(', ')}`
    : 'All Expanded';
};

const isExpanded = (expanded: KeySet<string>, key: string) => expanded.has(key);

export const TreeViewExpansion = () => {
  const data = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'id'
      }),
    []
  );
  const [expanded, setExpanded] = useState<KeySet<string>>(initialExpanded);

  const handleExpandedChanged = (event: TreeViewExpandedChangedEvent) => {
    setExpanded(event.detail.value as KeySet<string>);
  };

  const toggleExpandedKey = (key: string) => {
    setExpanded((currentExpanded) =>
      currentExpanded.has(key) ? currentExpanded.delete([key]) : currentExpanded.add([key])
    );
  };

  const toggleExpandAll = () => {
    setExpanded((currentExpanded) =>
      currentExpanded.isAddAll() ? currentExpanded.clear() : currentExpanded.addAll()
    );
  };

  return (
    <div id="treeview-container">
      <div class="oj-panel oj-bg-neutral-30">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Control The Expansion State Below
        </h2>
        <span class="oj-typography-body-lg oj-typography-bold">Expanded:</span>
        <span id="expanded-list">{getExpandedText(expanded)}</span>
        <div class="oj-sm-margin-6x-bottom" />
        <oj-button id="blogs" onojAction={() => toggleExpandedKey('blogs')}>
          {isExpanded(expanded, 'blogs') ? 'Collapse Blogs' : 'Expand Blogs'}
        </oj-button>
        <oj-button id="links" onojAction={() => toggleExpandedKey('links')}>
          {isExpanded(expanded, 'links') ? 'Collapse Links' : 'Expand Links'}
        </oj-button>
        <oj-button id="expand-all" onojAction={toggleExpandAll}>
          {expanded.isAddAll() ? 'Collapse All' : 'Expand All'}
        </oj-button>
        <div class="oj-sm-margin-6x-bottom" />
      </div>
      <oj-tree-view
        id="treeview"
        data={data}
        expanded={expanded}
        onexpandedChanged={handleExpandedChanged}
        aria-label="Tree View Expansion Demo"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewExpansion;
