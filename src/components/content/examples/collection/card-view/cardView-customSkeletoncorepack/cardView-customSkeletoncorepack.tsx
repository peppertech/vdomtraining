import { h, type ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import DemoDelayingDataProvider from "../../shared/DemoDelayingDataProvider";
import * as jsonDataStr from "text!./contacts.json";
import "../../../../../jet-composites/demo-profile-card-layout/loader";
import "css!./demo.css";
import "oj-c/button";
import "oj-c/card-view";
import "oj-c/input-number";
import "oj-c/skeleton";
import "ojs/ojformlayout";

interface Contact {
  id: string;
  initials: string;
  name: string;
}

interface CardSkeletonContext {
  height?: string;
  loadingStatus?: "initial" | "loadMore";
  width?: string;
}

type CardItemContext = {
  data: Contact;
  isTabbable?: boolean;
  item: { data: Contact; metadata: { key: Contact["id"] } };
};
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];

const CONTACTS = JSON.parse(jsonDataStr as string) as Contact[];

const renderCard = (context: CardItemContext) => (
  <div class="oj-panel">
    {h("demo-profile-card-layout", {
      name: context.data.name,
      initials: context.data.initials,
    })}
  </div>
);

const renderSkeleton = (context: CardSkeletonContext) => (
  <div
    class="oj-panel oj-sm-padding-0 demo-skeleton-card"
    style={
      context.loadingStatus === "loadMore"
        ? { width: context.width, height: context.height }
        : undefined
    }
  >
    <oj-c-skeleton height="100%" />
  </div>
);

export const CardViewCustomSkeletoncorepack = () => {
  const [delayInput, setDelayInput] = useState(2000);
  const [fetchDelay, setFetchDelay] = useState(2000);

  const dataProvider = useMemo(
    () =>
      new DemoDelayingDataProvider<Contact["id"], Contact>(
        new MutableArrayDataProvider<Contact["id"], Contact>(CONTACTS, {
          keyAttributes: "id"
        }),
        0,
        { fetchFirst: fetchDelay }
      ),
    [fetchDelay]
  );

  const handleDelayChanged = (event: InputNumberValueChangedEvent) => {
    setDelayInput(Math.max(0, event.detail.value ?? 0));
  };

  const handleApply = () => {
    setFetchDelay(Math.max(0, delayInput));
  };

  return (
    <div id="cardviewContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
        <oj-form-layout max-columns={2} direction="row">
          <oj-c-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            value={delayInput}
            labelHint="Fetch delay (ms)"
            onvalueChanged={handleDelayChanged}
          />
          <oj-c-button size="lg" onojAction={handleApply} label="Apply" />
        </oj-form-layout>
      </div>
      <oj-c-card-view
        id="cardview"
        class="demo-card-view"
        aria-label="cardview with custom skeleton"
        scrollPolicyOptions={{ fetchSize: 15 }}
        data={dataProvider}
      >
        <template slot="skeletonTemplate" render={renderSkeleton} />
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
    </div>
  );
};

export default CardViewCustomSkeletoncorepack;
