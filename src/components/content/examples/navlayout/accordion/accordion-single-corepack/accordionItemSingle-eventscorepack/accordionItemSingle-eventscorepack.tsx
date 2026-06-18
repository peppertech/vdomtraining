import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "css!./demo.css";
import "oj-c/accordion-item-single";
import "oj-c/button";
import "oj-c/text-area";

type AccordionSingleEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-accordion-item-single">["onojExpand"]>
>[0];
type ExpandedKeyChangedEvent = Parameters<
  NonNullable<
    ComponentProps<"oj-c-accordion-item-single">["onexpandedKeyChanged"]
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

const formatSingleEventDetail = (detail: AccordionSingleEvent["detail"]) => {
  const parts: string[] = [];
  if (detail.fromKey != null) {
    parts.push(`fromKey: ${detail.fromKey}`);
  }
  parts.push(`toKey: ${detail.toKey}`);
  return parts.join(" ");
};

export const AccordionItemSingleEventscorepack = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [eventLog, setEventLog] = useState("");

  const appendLog = (message: string) => {
    setEventLog((currentValue) =>
      currentValue ? `${currentValue}\n${message}` : message,
    );
  };

  const handleExpandedKeyChanged = (event: ExpandedKeyChangedEvent) => {
    setExpandedKey((event.detail.value as string | null) ?? null);
  };

  const handleAccordionEvent = (event: AccordionSingleEvent) => {
    const id = (event.currentTarget as HTMLElement).id;
    appendLog(
      `${event.type}: ${id}, data: { ${formatSingleEventDetail(
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
        <oj-c-accordion-item-single
          key={item.id}
          expandedKey={expandedKey}
          onexpandedKeyChanged={handleExpandedKeyChanged}
          itemKey={item.itemKey}
          id={`accordionItem_${item.id}`}
          onojExpand={handleAccordionEvent}
          onojCollapse={handleAccordionEvent}
        >
          <h3 slot="header">{item.title}</h3>
          <span>{item.text}</span>
        </oj-c-accordion-item-single>
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

export default AccordionItemSingleEventscorepack;
