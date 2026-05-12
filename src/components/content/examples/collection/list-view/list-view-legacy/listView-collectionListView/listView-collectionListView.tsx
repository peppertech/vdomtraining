/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import { CollectionMockFetchServer as MockFetchServer } from '../../../shared/CollectionMockFetchServer';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/listView/collectionListView/tweets.json';
import 'ojs/ojlistview';
import 'ojs/ojlistitemlayout';
import 'ojs/ojavatar';

type Tweet = {
    source: string;
    name: string;
    screen_name: string;
    text: string;
    created_at: string;
};

type Key = Tweet['source'];

export const ListViewCollectionListView = () => {
  const keyAttributes: keyof Tweet = 'source';
  const server = useMemo(() => new MockFetchServer({
      keyAttributes: keyAttributes,
      data: JSON.parse(jsonDataStr)
  }), [keyAttributes]);
  useEffect(() => {
      server.start();
      return () => server.stop();
  }, [server]);
  const dataProvider = useMemo(() => new RESTDataProvider<Key, Tweet>({
      keyAttributes: keyAttributes,
      url: server.getUrl(),
      transforms: {
          fetchFirst: {
              request: async (options: RESTDataProvider.FetchByOffsetRequestTransformOptions<Key, Tweet>) => {
                  const url = new URL(options.url);
                  // Map paging params expected by the mock server
                  const size = options.fetchParameters?.size;
                  const offset = options.fetchParameters?.offset;
                  if (size != null)
                      url.searchParams.set('limit', String(size));
                  if (offset != null)
                      url.searchParams.set('offset', String(offset));
                  return new Request(url.href);
              },
              response: async ({ body }: RESTDataProvider.FetchResponseTransformOptions) => {
                  // Mock server returns { data, totalSize, hasMore }
                  const { data, totalSize, hasMore } = body;
                  return { data, totalSize, hasMore };
              }
          }
      }
  }), [keyAttributes, server]);

  return (
      <oj-list-view id="listview" aria-label="list using collection" class="demo-list oj-listview-item-padding-off" data={dataProvider} selection-mode="single" scroll-policy="loadMoreOnScroll" {...{ 'item.enter-key-focus-behavior': "focusWithin", 'scroll-policy-options.fetch-size': "15" }}>
            <template slot="itemTemplate" render={(item) => (
                  <>
                      <oj-list-item-layout>
                                  <div>
                                                <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                                                <span class="oj-typography-body-xs">{'@' + item.data.screen_name}</span>
                                            </div>
                                  <oj-avatar slot="leading" size="xs" src={'../images/listView/oracle.gif'} />
                                  <div slot="secondary" class="demo-tweet">
                                                <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
                                                <a href={item.data.source} class="oj-typography-body-sm">{item.data.source}</a>
                                            </div>
                                  <span slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">{item.data.created_at}</span>
                              </oj-list-item-layout>
                  </>
                )} />
        </oj-list-view>
    );
};

export default ListViewCollectionListView;
