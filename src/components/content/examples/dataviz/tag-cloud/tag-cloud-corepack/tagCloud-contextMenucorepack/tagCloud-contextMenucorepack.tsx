// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'oj-c/tag-cloud';
import 'css!./demo.css';

type SocialNetwork = {
  id: string;
  total: number;
};

type SelectionChangedEvent = CustomEvent<{ value: string[]; updatedFrom?: string }>;
type TagCloudContextMenuConfig = NonNullable<ComponentProps<'oj-c-tag-cloud'>['contextMenuConfig']>;
type TagCloudMenuSelectionValue = 'selection1' | 'selection2' | 'selection3';

const renderContextMenuTagCloudItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-c-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    shortDesc={`${item.data.id}: ${item.data.total}% of respondents`}
  />
);

export const TagCloudContextMenucorepack = () => {
  const [launchedFromItem, setLaunchedFromItem] = useState('None launched yet');
  const [selectedMenuItem, setSelectedMenuItem] = useState('None selected yet');
  const [selectedSelectionMenuItem, setSelectedSelectionMenuItem] =
    useState<TagCloudMenuSelectionValue>('selection1');
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>([]);
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );

  const contextMenuConfig = useMemo<TagCloudContextMenuConfig>(
    () => ({
      items: (context) => {
        const launchedFrom =
          context.type === 'background'
            ? 'background'
            : context.itemData?.id ?? context.data?.label ?? context.data?.id ?? 'unknown';

        setLaunchedFromItem(launchedFrom);

        return [
          {
            label: 'Action 1',
            key: 'action1',
            onAction: () => {
              setSelectedMenuItem('action1');
            }
          },
          {
            label: 'Action 2',
            key: 'action2',
            onAction: () => {
              setSelectedMenuItem('action2');
            }
          },
          {
            label: 'Action 3',
            key: 'action3',
            onAction: () => {
              setSelectedMenuItem('action3');
            }
          },
          { type: 'separator' },
          {
            type: 'selectsingle',
            key: 'tagCloudSelection',
            items: [
              { label: 'Selection 1', value: 'selection1' },
              { label: 'Selection 2', value: 'selection2' },
              { label: 'Selection 3', value: 'selection3' }
            ],
            selection: selectedSelectionMenuItem,
            onSelection: (selectionInfo) => {
              setSelectedSelectionMenuItem(selectionInfo.value as TagCloudMenuSelectionValue);
            }
          }
        ];
      },
      accessibleLabel: 'tag cloud actions'
    }),
    [selectedSelectionMenuItem]
  );

  const handleSelectedItemsValueSelectionChanged = (event: SelectionChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setSelectedItemsValue(event.detail.value);
    }
  };

  return (
    <div id="tagcloud-container">
      <oj-c-tag-cloud
        id="tagcloud1"
        layout="cloud"
        data={dataProvider}
        class="demo-tagCloud-contextMenu-max-width"
        selectionMode="single"
        onselectionChanged={handleSelectedItemsValueSelectionChanged}
        selection={selectedItemsValue}
        contextMenuConfig={contextMenuConfig}
      >
        <template slot="itemTemplate" render={renderContextMenuTagCloudItem} />
      </oj-c-tag-cloud>
      <div class="oj-sm-margin-4x-vertical">
        <p>
          Last selected menu action: <span id="selected">{selectedMenuItem}</span>
        </p>
        <p>
          Last select single group selection: <span id="selectedSelection">{selectedSelectionMenuItem}</span>
        </p>
        <p>
          Launched from: <span id="launched">{launchedFromItem}</span>
        </p>
      </div>
    </div>
  );
};

export default TagCloudContextMenucorepack;
