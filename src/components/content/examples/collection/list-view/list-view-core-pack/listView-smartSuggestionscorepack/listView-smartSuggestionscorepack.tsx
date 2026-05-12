// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import DemoSmartSuggestionsDataProvider = require('../../../../../../dataProvider/DemoSmartSuggestionsDataProvider');
import 'oj-c/list-view';
import 'oj-c/avatar';
import 'oj-c/list-item-layout';

interface Employee {
    id: string;
    name: string;
    title: string;
}

export const ListViewSmartSuggestionscorepack = () => {
  const generateData = (count: number) => {
      const data: Array<Employee> = [];
      for (let i = 1; i <= count; i++) {
          data.push({ id: 'e' + i, name: 'Person ' + i, title: 'Consultant ' + ((i % 5) + 1) });
      }
      return data;
  };
  const data: any = useMemo(() => generateData(30), []);
  const dataProvider = useMemo(() => new DemoSmartSuggestionsDataProvider(data, 'id', [
      'e5',
      'e10',
      'e16',
      'e20'
  ]), [data]);

  return (
      <oj-c-list-view id="listview" aria-label="list with Oracle Suggestions" data={dataProvider} class="demo-list oj-listview-item-padding-off" {...{ 'item.enter-key-focus-behavior': "focusWithin" }}>
            <template slot="itemTemplate" render={(item) => (
                  <>
                      <oj-c-list-item-layout>
                                  <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                                  <oj-c-avatar slot="leading" size="xs" icon-class="oj-ux-ico-human-8" />
                                  <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">{item.data.title}</span>
                              </oj-c-list-item-layout>
                  </>
                )} />
        </oj-c-list-view>
    );
};

export default ListViewSmartSuggestionscorepack;
