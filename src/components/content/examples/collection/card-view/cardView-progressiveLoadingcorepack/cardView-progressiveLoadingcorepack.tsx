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
import "ojs/ojformlayout";

interface Contact {
  id: string;
  initials: string;
  name: string;
}

type CardItemContext = {
  data: Contact;
  isTabbable?: boolean;
  item: { data: Contact; metadata: { key: Contact["id"] } };
};
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];
type InputNumberRawValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onrawValueChanged"]>
>[0];

const CONTACTS = JSON.parse(jsonDataStr as string) as Contact[];

const normalizeDelay = (value: number | string | null | undefined) => {
  const parsedValue =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  return Number.isFinite(parsedValue) ? Math.max(0, parsedValue as number) : 0;
};

const renderCard = (context: CardItemContext) => (
  <div class="oj-panel">
    {h("demo-profile-card-layout", {
      name: context.data.name,
      initials: context.data.initials,
    })}
  </div>
);

export const CardViewProgressiveLoadingcorepack = () => {
  const [delayInput, setDelayInput] = useState(2000);
  const [delayRawValue, setDelayRawValue] = useState("2000");
  const [fetchDelay, setFetchDelay] = useState(2000);
  const [reloadKey, setReloadKey] = useState(0);

  const dataProvider = useMemo(
    () =>
      new DemoDelayingDataProvider<Contact["id"], Contact>(
        new MutableArrayDataProvider<Contact["id"], Contact>(CONTACTS, {
          keyAttributes: "id"
        }),
        0,
        { fetchFirst: fetchDelay }
      ),
    [fetchDelay, reloadKey]
  );

  const handleDelayChanged = (event: InputNumberValueChangedEvent) => {
    const nextDelay = normalizeDelay(event.detail.value);
    setDelayInput(nextDelay);
    setDelayRawValue(String(nextDelay));
  };

  const handleDelayRawValueChanged = (
    event: InputNumberRawValueChangedEvent
  ) => {
    setDelayRawValue(event.detail.value ?? "");
  };

  const handleApply = () => {
    const nextDelay = normalizeDelay(
      delayRawValue === "" ? delayInput : delayRawValue
    );
    setDelayInput(nextDelay);
    setDelayRawValue(String(nextDelay));
    setFetchDelay(nextDelay);
    setReloadKey((currentKey) => currentKey + 1);
  };

  return (
    <div id="cardviewContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
        <oj-form-layout max-columns={3} direction="row">
          <oj-c-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            value={delayInput}
            labelHint="Fetch delay (ms)"
            onvalueChanged={handleDelayChanged}
            onrawValueChanged={handleDelayRawValueChanged}
          />
          <oj-c-button size="lg" onojAction={handleApply} label="Apply" />
        </oj-form-layout>
      </div>
      <oj-c-card-view
        id="cardview"
        class="demo-card-view"
        aria-label="cardview progressive loading"
        columns={3}
        data={dataProvider}
      >
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
    </div>
  );
};

export default CardViewProgressiveLoadingcorepack;
