import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "css!./demo.css";
import "oj-c/accordion-item-multiple";
import "oj-c/button";
import "oj-c/text-area";

type AccordionMultipleEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-accordion-item-multiple">["onojExpand"]>
>[0];
type ExpandedKeysChangedEvent = Parameters<
  NonNullable<
    ComponentProps<"oj-c-accordion-item-multiple">["onexpandedKeysChanged"]
  >
>[0];

type AccordionItemData = {
  id: number;
  itemKey: string;
  text: string;
  title: string;
};

const accordionItemData: AccordionItemData[] = [
  { id: 1, itemKey: "itemKey1", text: "Content 1", title: "Header 1" },
  { id: 2, itemKey: "itemKey2", text: "Content 2", title: "Header 2" },
  { id: 3, itemKey: "itemKey3", text: "Content 3", title: "Header 3" },
];

const formatMultipleEventDetail = (
  detail: AccordionMultipleEvent["detail"],
) => {
  const parts: string[] = [];
  if (detail.fromKeys != null) {
    parts.push(`fromKeys: ${JSON.stringify(detail.fromKeys)}`);
  }
  parts.push(`toKeys: ${JSON.stringify(detail.toKeys)}`);
  return parts.join(" ");
};

export const AccordionItemMultipleEventscorepack = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [eventLog, setEventLog] = useState("");

  const appendLog = (message: string) => {
    setEventLog((currentValue) =>
      currentValue ? `${currentValue}\n${message}` : message,
    );
  };

  const handleExpandedKeysChanged = (event: ExpandedKeysChangedEvent) => {
    setExpandedKeys((event.detail.value as string[]) ?? []);
  };

  const handleAccordionEvent = (event: AccordionMultipleEvent) => {
    const id = (event.currentTarget as HTMLElement).id;
    appendLog(
      `${event.type}: ${id}, data: { ${formatMultipleEventDetail(
        event.detail,
      )} }`,
    );
  };

  const clearLog = () => {
    setEventLog("");
  };

  return (
    <div id="a1p">
      {accordionItemData.map((item) => (
        <oj-c-accordion-item-multiple
          key={item.id}
          expandedKeys={expandedKeys}
          onexpandedKeysChanged={handleExpandedKeysChanged}
          itemKey={item.itemKey}
          id={`accordionItem_${item.id}`}
          onojExpand={handleAccordionEvent}
          onojCollapse={handleAccordionEvent}
        >
          <h3 slot="header">{item.title}</h3>
          <span>{item.text}</span>
        </oj-c-accordion-item-multiple>
      ))}

      <br />
      <oj-c-button id="bb" onojAction={clearLog} label="Clear log" />
      <br />
      <oj-c-text-area
        id="eventlog"
        labelHint="Event Data:"
        labelEdge="top"
        value={eventLog}
        rows={8}
        readonly
      />
    </div>
  );
};

export default AccordionItemMultipleEventscorepack;
