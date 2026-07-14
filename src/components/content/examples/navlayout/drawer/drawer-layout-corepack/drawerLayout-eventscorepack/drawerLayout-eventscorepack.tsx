import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojdrawerlayout';
import { useState } from 'preact/hooks';
// Controls
import 'ojs/ojbutton';
// Drawers
import "css!./demo.css";
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojnavigationlist';

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-layout'>['startOpened']>;
type TextAreaValue = ComponentProps<'oj-text-area'>['value'];
type LogValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-text-area'>['onvalueChanged']>>[0];
type StartOpenedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onstartOpenedChanged']>>[0];
type EndOpenedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onendOpenedChanged']>>[0];
type LayoutBeforeCloseEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onojBeforeClose']>>[0];
type LayoutCloseEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onojClose']>>[0];
type DrawerLayoutEvent = StartOpenedChangedEvent | EndOpenedChangedEvent | LayoutBeforeCloseEvent | LayoutCloseEvent;

export const DrawerLayoutEventscorepack = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [endOpened, setEndOpened] = useState<DrawerOpened>(false);
  const [log, setLog] = useState<TextAreaValue>('');

  const handleLogValueChanged = (event: LogValueChangedEvent) => {
    setLog(event.detail.value);
  };

  const startToggle = () => setStartOpened((value) => !value);

  const endToggle = () => setEndOpened((value) => !value);

  const startOpenedChangedHandler = (event: StartOpenedChangedEvent) => {
      updateLog(event);
      setStartOpened(event.detail.value ?? false);
  };

  const endOpenedChangedHandler = (event: EndOpenedChangedEvent) => {
      updateLog(event);
      setEndOpened(event.detail.value ?? false);
  };

  const beforeCloseHandler = (event: LayoutBeforeCloseEvent) => {
      updateLog(event);
  };

  const closeHandler = (event: LayoutCloseEvent) => {
      updateLog(event);
  };

  const isWritebackEvent = (event: DrawerLayoutEvent): event is StartOpenedChangedEvent | EndOpenedChangedEvent =>
      'previousValue' in event.detail;

  const updateLog = (event: DrawerLayoutEvent) => {
      let data = log;
      if (isWritebackEvent(event) && event.detail.previousValue != event.detail.value) {
          data += `Writeback: ${event.type}, Updated from: ${event.detail.updatedFrom}, {previousValue: ${event.detail.previousValue}, value: ${event.detail.value}} \n`;
      }
      else {
          const edge = 'edge' in event.detail ? event.detail.edge : '';
          data += `Event: ${event.type}${edge ? `, Edge: ${edge}` : ''} \n`;
      }
      setLog(data);
  };
  const clearLog = () => {
      setLog('');
  };
  return (
      <div id="demo-container">
            <oj-drawer-layout id="drawerLayout" class="demo-full-height" startOpened={startOpened} endOpened={endOpened} onstartOpenedChanged={startOpenedChangedHandler} onendOpenedChanged={endOpenedChangedHandler} onojBeforeClose={beforeCloseHandler} onojClose={closeHandler}>
                    <div class="demo-padding">
                              <div class="demo-controls">
                                          <oj-button id="toggleStartButton" class="demo-button" onojAction={startToggle}>Toggle Start</oj-button>
                                          <oj-button id="toggleEndButton" class="demo-button" onojAction={endToggle}>Toggle End</oj-button>
                                          <oj-button class="demo-button" onojAction={clearLog}>Clear log</oj-button>
                                      </div>
                              <oj-label for="eventlog">Event Data:</oj-label>
                              <oj-text-area id="eventlog" class="demo-text-area" onvalueChanged={handleLogValueChanged} value={log} rows={30} readonly />
                          </div>
                    <div slot="start" class="demo-drawer-start">
                              <div class="demo-drawer-header">
                                          <div><h6>Welcome</h6></div>
                                          <oj-button id="startButtonCloser" display="icons" chroming="borderless" onojAction={startToggle}>
                                                        <span slot="startIcon" class="oj-ux-ico-close" />
                                                        Close
                                                    </oj-button>
                                      </div>
                              <oj-navigation-list>
                                          <ul>
                                                        <li id="one"><a href="#">Dashboard</a></li>
                                                        <li><a href="#">Incidents</a></li>
                                                        <li><a href="#">Customers</a></li>
                                                        <li><a href="#">About</a></li>
                                                    </ul>
                                      </oj-navigation-list>
                          </div>
                    <div slot="end">
                              <div class="demo-drawer-header">
                                          <h6>Address</h6>
                                          <oj-button id="endButtonCloser" class="demo-close-button" display="icons" chroming="borderless" onojAction={endToggle}>
                                                        <span slot="startIcon" class="oj-ux-ico-close" />
                                                        Close
                                                    </oj-button>
                                      </div>
                              <div class="demo-padding demo-form-container">
                                          <oj-form-layout>
                                                        <oj-input-text aria-label="line1" value="Line 1" />
                                                        <oj-input-text aria-label="line2" value="Line 2" />
                                                    </oj-form-layout>
                                      </div>
                          </div>
                </oj-drawer-layout>
        </div>
    );
};
export default DrawerLayoutEventscorepack;
