import { h } from "preact";
import { useState } from "preact/hooks";
import type { ojAccordion } from "ojs/ojaccordion";
import "ojs/ojaccordion";
import "ojs/ojbutton";
import "ojs/ojcollapsible";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "css!./demo.css";

const getCollapsibleId = (collapsible: Element | null | undefined) => {
  return collapsible?.id || "none";
};

const formatExpandedValue = (value: ojAccordion["expanded"]) => {
  if (!value?.length) {
    return "none";
  }

  return value
    .map((item) => item.id ?? item.index ?? "unknown")
    .join(", ");
};

export const AccordionEvents = () => {
  const [evtData, setEvtData] = useState("");

  const clearLogMsg = () => {
    setEvtData("");
  };

  const appendData = (data: string) => {
    setEvtData((current) => (current ? `${current}\n${data}` : data));
  };

  const eventHandler = (
    event: ojAccordion.ojExpand | ojAccordion.ojCollapse,
  ) => {
    appendData(
      `${event.type}: fromCollapsible: ${getCollapsibleId(
        event.detail.fromCollapsible,
      )}, toCollapsible: ${getCollapsibleId(event.detail.toCollapsible)}`,
    );
  };

  const expandedChangedHandler = (event: ojAccordion.expandedChanged) => {
    appendData(
      `expandedChanged: previousValue: ${formatExpandedValue(
        event.detail.previousValue,
      )}, value: ${formatExpandedValue(event.detail.value)}`,
    );
  };

  return (
    <div id="a1p">
      <oj-accordion
        id="a1"
        onojExpand={eventHandler}
        onojCollapse={eventHandler}
        onexpandedChanged={expandedChangedHandler}
      >
        <oj-collapsible id="c1">
          <h3 slot="header">Header 1</h3>
          <p>Content 1.</p>
        </oj-collapsible>
        <oj-collapsible id="c2">
          <h3 slot="header">Header 2</h3>
          <p>Content 2.</p>
        </oj-collapsible>
        <oj-collapsible id="c3" expanded>
          <h3 slot="header">Header 3</h3>
          <p>Content 3.</p>
        </oj-collapsible>
      </oj-accordion>
      <div>
        <div class="oj-sm-padding-4x-vertical">
          <oj-button id="bb" onojAction={clearLogMsg}>
            Clear log
          </oj-button>
        </div>
        <oj-label for="eventlog">Event Data:</oj-label>
        <oj-text-area
          id="eventlog"
          class="demo-text-area"
          value={evtData}
          rows={8}
          readonly
        />
      </div>
    </div>
  );
};

export default AccordionEvents;
