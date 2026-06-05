import { JetElementCustomEvent } from 'ojs/index';
import { h } from 'preact';
import type { ComponentProps } from 'preact';

import { useState } from 'preact/hooks';
import 'ojs/ojdrawerpopup';
import 'ojs/ojbutton'; // Controls
import 'ojs/ojlabel'; // Main section
import 'ojs/ojnavigationlist'; // Start drawer
// End drawer
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import "css!./demo.css";

type DrawerOpened = ComponentProps<'oj-drawer-popup'>['opened'];
type TextAreaValue = ComponentProps<'oj-text-area'>['value'];
type LogValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-text-area'>['onvalueChanged']>>[0];
type DrawerOpenedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0];
type DrawerBeforeCloseEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onojBeforeClose']>>[0];
type DrawerCloseEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onojClose']>>[0];
type DrawerPopupEvent = DrawerOpenedChangedEvent | DrawerBeforeCloseEvent | DrawerCloseEvent;

export const DrawerPopupEventscorepack = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [endOpened, setEndOpened] = useState<DrawerOpened>(false);
  const [bottomOpened, setBottomOpened] = useState<DrawerOpened>(false);
  const [log, setLog] = useState<TextAreaValue>('');

  const handleLogValueChanged = (event: LogValueChangedEvent) => {
    setLog(event.detail.value);
  };

  const startToggle = () => setStartOpened((value) => !value);

  const endToggle = () => setEndOpened((value) => !value);

  const bottomToggle = () => setBottomOpened((value) => !value);

  const startOpenedChangedHandler = (event: DrawerOpenedChangedEvent) => {
      updateLog(event);
  };

  const endOpenedChangedHandler = (event: DrawerOpenedChangedEvent) => {
      updateLog(event);
  };

  const bottomOpenedChangedHandler = (event: DrawerOpenedChangedEvent) => {
      updateLog(event);
  };

  const startBeforeCloseHandler = (event: DrawerBeforeCloseEvent) => {
      updateLog(event);
  };

  const endBeforeCloseHandler = (event: DrawerBeforeCloseEvent) => {
      updateLog(event);
  };

  const bottomBeforeCloseHandler = (event: DrawerBeforeCloseEvent) => {
      updateLog(event);
  };

  const startCloseHandler = (event: DrawerCloseEvent) => {
      updateLog(event);
  };

  const endCloseHandler = (event: DrawerCloseEvent) => {
      updateLog(event);
  };

  const bottomCloseHandler = (event: DrawerCloseEvent) => {
      updateLog(event);
  };

  const isOpenedChangedEvent = (event: DrawerPopupEvent): event is DrawerOpenedChangedEvent =>
      'previousValue' in event.detail;

  const updateLog = (event: DrawerPopupEvent) => {
      let data = log;
      if (isOpenedChangedEvent(event) && event.detail.previousValue != event.detail.value) {
          data += `Writeback: ${event.type}, Updated from: ${event.detail.updatedFrom}, {previousValue: ${event.detail.previousValue}, value: ${event.detail.value}} \n`;
      }
      else {
          data += `Event: ${event.type} \n`;
      }
      setLog(data);
  };
  const clearLog = () => {
      setLog('');
  };
  return (
      <div id="demo-container">
            <div class="demo-padding">
                    <div class="demo-controls">
                              <oj-button id="toggleStartButton" class="demo-button" onojAction={startToggle}>Toggle Start</oj-button>
                              <oj-button id="toggleEndButton" class="demo-button" onojAction={endToggle}>Toggle End</oj-button>
                              <oj-button id="toggleBottomButton" class="demo-button" onojAction={bottomToggle}>Toggle Bottom</oj-button>
                              <oj-button class="demo-button" onojAction={clearLog}>Clear log</oj-button>
                          </div>
                    <oj-label for="eventlog">Event Data:</oj-label>
                    <oj-text-area id="eventlog" class="demo-text-area" onvalueChanged={handleLogValueChanged} value={log} rows={30} readonly />
                </div>
            <oj-drawer-popup class="demo-drawer-start" opened={startOpened} onopenedChanged={startOpenedChangedHandler} onojBeforeClose={startBeforeCloseHandler} onojClose={startCloseHandler} aria-labelledby="startHeader">
                    <div class="demo-drawer-header">
                              <div id="startHeader"><h6>Welcome</h6></div>
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
                </oj-drawer-popup>
            <oj-drawer-popup edge="end" class="demo-drawer-end" opened={endOpened} onopenedChanged={endOpenedChangedHandler} onojBeforeClose={endBeforeCloseHandler} onojClose={endCloseHandler} aria-labelledby="endHeader">
                    <div class="demo-drawer-header">
                              <h6 id="endHeader">Address</h6>
                              <oj-button id="endButtonCloser" display="icons" chroming="borderless" onojAction={endToggle}>
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
                </oj-drawer-popup>
            <oj-drawer-popup edge="bottom" class="demo-drawer-bottom" opened={bottomOpened} onopenedChanged={bottomOpenedChangedHandler} onojBeforeClose={bottomBeforeCloseHandler} onojClose={bottomCloseHandler} aria-label="Cookie Preferences">
                    <div class="demo-padding">
                              <p>
                                          We use cookies to improve user experience, and analyze website traffic. For these reasons, we may share your site usage data with our analytics partners. By clicking
                                          <a href="#">Accept Cookies</a>
                                          you consent to store on your device all the technologies described in our Cookie Policy. You can change your cookie settings whenever needed by clicking
                                          <a href="#">Cookie Preferences</a>
                                      </p>
                              <oj-button id="bottomButtonCloser" onojAction={bottomToggle}>Accept</oj-button>
                          </div>
                </oj-drawer-popup>
        </div>
    );
};
export default DrawerPopupEventscorepack;
