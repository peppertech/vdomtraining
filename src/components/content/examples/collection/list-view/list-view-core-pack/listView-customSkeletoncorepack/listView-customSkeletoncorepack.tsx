import "css!./demo.css";
import "oj-c/avatar";
import "oj-c/button";
import "oj-c/input-number";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/skeleton";
import "ojs/ojformlayout";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import * as tweetsText from "text!./tweets.json";
import DemoDelayingDataProvider from "../../../shared/DemoDelayingDataProvider";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

interface Tweet {
  created_at: string;
  name: string;
  profile_background_image_url: string;
  screen_name: string;
  source: string;
  text: string;
}

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];
type ItemTemplateContext = CListViewElement.ItemTemplateContext<Tweet["source"], Tweet>;
type SkeletonTemplateContext = CListViewElement.SkeletonTemplateContext;

const TWEETS = JSON.parse(tweetsText) as Tweet[];

const renderSkeleton: import("ojs/ojvcomponent").TemplateSlot<SkeletonTemplateContext> = (_context) => (
  <oj-c-list-item-layout>
    <div>
      <oj-c-skeleton height="5x" width="45x" />
    </div>
    <div class="oj-sm-padding-2x-vertical" slot="secondary">
      <oj-c-skeleton height="4.5x" width="160x" />
    </div>
    <div slot="tertiary">
      <oj-c-skeleton height="4x" width="30x" />
    </div>
    <div slot="leading">
      <oj-c-skeleton height="11x" width="11x" borderRadius="6px" />
    </div>
  </oj-c-list-item-layout>
);

const renderItem: import("ojs/ojvcomponent").TemplateSlot<ItemTemplateContext> = (context) => (
  <oj-c-list-item-layout>
    <div>
      <span class="oj-typography-body-md oj-text-color-primary">{context.data.name}</span>
      <span class="oj-typography-body-xs">@{context.data.screen_name}</span>
    </div>
    <oj-c-avatar slot="leading" size="xs" src="/styles/images/listView/oracle.gif" />
    <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary demo-tweet">
      {context.data.text}
    </span>
    <span slot="tertiary" class="oj-typography-body-xs">
      {context.data.created_at}
    </span>
  </oj-c-list-item-layout>
);

export const ListViewCustomSkeletoncorepack = () => {
  const [delayInput, setDelayInput] = useState(2000);
  const [fetchDelay, setFetchDelay] = useState(2000);

  const dataProvider = useMemo(
    () =>
      new DemoDelayingDataProvider<Tweet["source"], Tweet>(
        new MutableArrayDataProvider<Tweet["source"], Tweet>(TWEETS, {
          keyAttributes: "source"
        }),
        0,
        { fetchFirst: fetchDelay }
      ),
    [fetchDelay]
  );

  const handleDelayInputChanged = (event: InputNumberValueChangedEvent) => {
    setDelayInput(event.detail.value ?? 0);
  };

  const handleApply = () => {
    setFetchDelay(Math.max(0, delayInput));
  };

  return (
    <div id="listviewContainer">
      <div class="demo-list-container">
        <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
          <oj-form-layout max-columns={2} direction="row">
            <oj-c-input-number
              id="fetch-delay-input"
              min={0}
              step={0}
              value={delayInput}
              labelHint="Fetch delay (ms)"
              onvalueChanged={handleDelayInputChanged}
            />
            <oj-c-button size="lg" onojAction={handleApply} label="Apply" />
          </oj-form-layout>
        </div>
        <oj-c-list-view
          id="listview"
          aria-label="Progressive loading list"
          data={dataProvider}
          class="demo-list oj-sm-padding-1x-horizontal"
        >
          <template slot="skeletonTemplate" render={renderSkeleton} />
          <template slot="itemTemplate" render={renderItem} />
        </oj-c-list-view>
      </div>
    </div>
  );
};

export default ListViewCustomSkeletoncorepack;
