import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojlistview';
import 'ojs/ojbutton';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/listView/jsonHierListView/files.json';
import { ojListView } from 'ojs/ojlistview';

interface File {
    id: string;
    name: string;
    modified: string;
    type: string;
}

interface Header {
    id: string;
    name: string;
}

interface HeaderData {
    attr: Header;
    children: Array<FileData>;
}

interface FileData {
    attr: File;
}

type AvatarBackground = NonNullable<ComponentProps<'oj-avatar'>['background']>;
type ListItemData = FileData | HeaderData;
type ItemTemplateContext = ojListView.ItemContext<File | Header, ListItemData>;

export const ListViewJsonHierListView = () => {
  const data = useMemo<HeaderData[]>(() => JSON.parse(jsonDataStr as string) as HeaderData[], []);
  const dataProvider = useMemo(() => new ArrayTreeDataProvider<File['id'] | Header['id'], ListItemData>(data, {
      keyAttributes: 'attr.id'
  }), [data]);

  const itemOnly = (context: ItemTemplateContext) => {
      return context.leaf;
  };

  const getIconColor = (type: string): AvatarBackground => {
      switch (type) {
          case 'pdf':
              return 'red';
          case 'xls':
              return 'green';
          case 'ppt':
              return 'purple';
          case 'doc':
              return 'teal';
          default:
              return 'neutral';
      }
  };

  const getIconClass = (type: string) => {
      switch (type) {
          case 'pdf':
              return 'oj-ux-ico-file-pdf';
          case 'xls':
              return 'oj-ux-ico-file-spreadsheet';
          case 'ppt':
              return 'oj-ux-ico-file-presentation';
          case 'doc':
              return 'oj-ux-ico-file-doc';
          default:
              return 'oj-ux-ico-folder';
      }
  };

  const renderItem = (item: ItemTemplateContext) => {
      if (item.leaf) {
          const file = item.data as FileData;

          return (
              <oj-list-item-layout>
                  <span class="oj-typography-body-md oj-text-color-primary">{file.attr.name}</span>
                  <oj-avatar slot="leading" background={getIconColor(file.attr.type)} role="img" size="xs" icon-class={getIconClass(file.attr.type)} aria-label="Circular icon with type icon" shape="circle" />
                  <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
                      Last modified on
                      {file.attr.modified}
                  </span>
              </oj-list-item-layout>
          );
      }

      const header = item.data as HeaderData;
      return <span>{header.attr.name}</span>;
  };

  return (
      <oj-list-view id="listview" aria-label="list using json data" class="oj-listview-item-padding-off" data={dataProvider} selection-mode="single" drill-mode="none" group-header-position="static" {...{ 'item.selectable': itemOnly, 'item.enter-key-focus-behavior': "focusWithin" }}>
            <template slot="itemTemplate" render={renderItem} />
        </oj-list-view>
    );
};

export default ListViewJsonHierListView;
