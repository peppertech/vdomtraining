// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojmenu';
import 'ojs/ojtagcloud';
import 'ojs/ojoption';
import 'css!./demo.css';

type SocialNetwork = {
  id: string;
  total: number;
};

type SelectionChangedEvent = CustomEvent<{ value: string[]; updatedFrom?: string }>;

const renderContextMenuTagCloudItem = (item: any) => (
  <oj-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    short-desc={`${item.data.id}: ${item.data.total}% of respondents`}
  />
);

export const TagCloudContextMenucorepack = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('(None selected yet)');
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>([]);
  const [item, setItem] = useState<SocialNetwork | null>(null);
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );
  const idToItemMap = useMemo(
    () => Object.fromEntries(socialNetworks.map((entry: any) => [entry.id, entry])),
    [socialNetworks]
  );

  const handleSelectedItemsValueSelectionChanged = (event: SelectionChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setSelectedItemsValue(event.detail.value);
    }
  };

  const beforeOpenFunction = (event: any) => {
    const target = event.detail.originalEvent?.target;
    setItem(null);

    if (!target) {
      return;
    }

    if (target.id === 'tagcloud1') {
      const selection = selectedItemsValue;
      if (selection.length > 0) {
        setItem(idToItemMap[selection[0]] ?? null);
      }
      return;
    }

    const tagCloud = document.getElementById('tagcloud1');
    const context = tagCloud?.getContextByNode?.(target);
    if (context != null) {
      setItem(socialNetworks[context.index] ?? null);
    }
  };

  const menuItemAction = (event: any) => {
    const text = event.detail.selectedValue;
    setSelectedMenuItem(item ? `${text} from ${item.id}` : `${text} from tag cloud background`);
  };

  return (
    <div id="tagcloud-container">
      <oj-tag-cloud
        id="tagcloud1"
        layout="cloud"
        data={dataProvider}
        class="demo-tagCloud-contextMenu-max-width"
        selectionMode="single"
        onselectionChanged={handleSelectedItemsValueSelectionChanged}
        selection={selectedItemsValue}
      >
        <template slot="itemTemplate" render={renderContextMenuTagCloudItem} />
        <oj-menu
          slot="contextMenu"
          aria-label="Social Network Edit"
          onojMenuAction={menuItemAction}
          onojBeforeOpen={beforeOpenFunction}
        >
          <oj-option value="Action 1">Action 1</oj-option>
          <oj-option value="Action 2">Action 2</oj-option>
          <oj-option value="Action 3">Action 3</oj-option>
        </oj-menu>
      </oj-tag-cloud>
      <p>
        Last selected menu item:
        <span id="results" class="oj-typography-bold italic">{selectedMenuItem}</span>
      </p>
    </div>
  );
};

export default TagCloudContextMenucorepack;
