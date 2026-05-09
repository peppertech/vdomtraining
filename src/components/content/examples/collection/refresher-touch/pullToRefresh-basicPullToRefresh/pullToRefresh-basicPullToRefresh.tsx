import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojListView } from 'ojs/ojlistview';
import 'css!./demo.css';
import * as jsonDataStr from 'text!../cookbook/dataCollections/listView/collectionListView/tweets.json';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojrefresher';

type Tweet = {
  source: string;
  name: string;
  screen_name: string;
  text: string;
  created_at: string;
};

type ListViewItemContext = ojListView.ItemTemplateContext<Tweet['source'], Tweet>;

const loadTweets = (): Tweet[] => JSON.parse(jsonDataStr) as Tweet[];

export const PullToRefreshBasicPullToRefresh = () => {
  const [tweets, setTweets] = useState<Tweet[]>(() => loadTweets());

  const dataProvider = useMemo(
    () => new ArrayDataProvider<Tweet['source'], Tweet>(tweets, { keyAttributes: 'source' }),
    [tweets]
  );

  const refreshFunc = () =>
    new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setTweets(loadTweets());
        resolve();
      }, 2000);
    });

  const itemTemplateRenderer = (item: ListViewItemContext) => (
    <li>
      <oj-list-item-layout>
        <div>
          <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
          <span class="oj-typography-body-xs">{`@${item.data.screen_name}`}</span>
        </div>
        <oj-avatar slot="leading" size="xs" src={'../images/listView/oracle.gif'} />
        <div slot="secondary" class="demo-tweet">
          <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
          <a href={item.data.source} class="oj-typography-body-sm">
            {item.data.source}
          </a>
        </div>
        <span slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
          {item.data.created_at}
        </span>
      </oj-list-item-layout>
    </li>
  );

  return (
    <oj-refresher id="refresher" refreshContent={refreshFunc} text="Checking for updates">
      <oj-list-view
        id="listview"
        class="demo-pulltorefresh"
        data={dataProvider}
        scrollPolicy="loadMoreOnScroll"
        scrollPolicyOptions={{ fetchSize: 15 }}
        aria-label="listview with pull to refresh data"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-list-view>
    </oj-refresher>
  );
};

export default PullToRefreshBasicPullToRefresh;
