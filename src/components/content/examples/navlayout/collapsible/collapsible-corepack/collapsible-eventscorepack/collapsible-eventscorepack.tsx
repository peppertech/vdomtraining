import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { CCollapsibleElement } from 'oj-c/collapsible';
import 'oj-c/collapsible';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojinputtext';
import "css!./demo.css";

export const CollapsibleEventscorepack = () => {
  const [evtData, setEvtData] = useState<string>('');

  const logMsg = evtData;

  const getTargetId = (target: EventTarget | null): string => {
      return target instanceof HTMLElement ? target.id : '';
  };

  const clearLogMsg = () => {
      setEvtData('');
  };

  const appendData = (data: string) => {
      let ss = evtData;
      ss = ss ? ss + '\n' : '';
      setEvtData(ss + data);
  };

  const eventHandler = (event: CCollapsibleElement.ojExpand | CCollapsibleElement.ojCollapse) => {
      appendData(event.type + ': c1, data: { target: ' + getTargetId(event.detail.target) + ' }');
  };

  const expandedChangedHandler = (event: CCollapsibleElement.expandedChanged) => {
      appendData('optionChange: ' +
          'c1' +
          ', data: {' +
          ' previousValue: ' +
          event.detail.previousValue +
          ', value: ' +
          event.detail.value +
          ' }');
  };

  return (
      <div id="c1p">
            <oj-c-collapsible
              id="c1"
              onojExpand={eventHandler}
              onojCollapse={eventHandler}
              onexpandedChanged={expandedChangedHandler}
            >
                    <h3 id="h1" slot="header">
                              <span class="oj-ux-ico-home oj-ux-icon-size-5x oj-sm-padding-2x-end" />
                              Header
                          </h3>
                    <p id="p1">Content Panel</p>
                </oj-c-collapsible>
            <div>
                    <div class="oj-sm-padding-4x-vertical"><oj-button id="bb" onojAction={clearLogMsg}>Clear log</oj-button></div>
                    <oj-label for="eventlog">Event Data:</oj-label>
                    <oj-text-area id="eventlog" class="demo-text-area" value={logMsg} rows={8} readonly />
                </div>
        </div>
    );
};

export default CollapsibleEventscorepack;
