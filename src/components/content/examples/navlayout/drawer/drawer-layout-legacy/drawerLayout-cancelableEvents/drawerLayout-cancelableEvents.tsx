import 'preact';
import type { ComponentProps } from 'preact';

import "css!./demo.css";
import 'ojs/ojbutton';
import 'ojs/ojdrawerlayout';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojswitch';
import { useState } from 'preact/hooks';

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-layout'>['startOpened']>;
type SwitchValue = NonNullable<ComponentProps<'oj-switch'>['value']>;
type DrawerOpenedEventValue = ComponentProps<'oj-drawer-layout'>['startOpened'];
type LayoutBeforeCloseEvent = Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onojBeforeClose']>>[0];

export const DrawerLayoutCancelableEvents = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [endOpened, setEndOpened] = useState<DrawerOpened>(false);
  const [startCancelability, setStartCancelability] = useState<SwitchValue>(true);
  const [validationStatus, setValidationStatus] = useState<string>('');

  const handleStartOpenedStartOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onstartOpenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const handleEndOpenedEndOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onendOpenedChanged']>>[0]) => {
    setEndOpened(event.detail.value ?? false);
  };

  const handleStartCancelabilityValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => {
    setStartCancelability(event.detail.value ?? false);
  };

  const startOpen = () => setStartOpened(true);
  const endOpen = () => setEndOpened(true);
  const handleBeforeClose = (event: LayoutBeforeCloseEvent) => {
      if (event.detail.edge === 'start') {
          if (startCancelability) {
              event.preventDefault();
          }
      }
      else if (event.detail.edge === 'end') {
          if (validationStatus === '') {
              // Simulation of async validation
              const validation = new Promise<void>((resolve) => {
                  let timeout = 8;
                  setValidationStatus('Validating, please wait.');
                  const interval = setInterval(() => {
                      setValidationStatus((current) => current + '.');
                      --timeout;
                      if (timeout === 0) {
                          setValidationStatus('');
                          clearInterval(interval);
                          resolve();
                      }
                  }, 250);
              });
              // Wait for validation promise to resolve
              event.detail.accept(validation);
          }
          else {
              // Reject close events during validation
              event.detail.accept(Promise.reject());
          }
      }
  };
  return (
      <div id="demo-container">
            <oj-drawer-layout onstartOpenedChanged={handleStartOpenedStartOpenedChanged} startOpened={startOpened} startDisplay="overlay" onendOpenedChanged={handleEndOpenedEndOpenedChanged} endOpened={endOpened} endDisplay="overlay" class="demo-full-height" onojBeforeClose={handleBeforeClose}>
                    <div class="demo-padding">
                              <div class="demo-controls">
                                          <oj-button id="startOpenButton" class="demo-button" onojAction={startOpen}>Open Start (Sync canceling)</oj-button>
                                          <oj-button id="endOpenButton" class="demo-button" onojAction={endOpen}>Open End (Async canceling)</oj-button>
                                      </div>
                              <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat consequat mauris nunc congue nisi vitae. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fermentum leo vel orci porta non pulvinar neque laoreet.
                                      </p>
                              <p>
                                          Non arcu risus quis varius quam quisque. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Pretium viverra suspendisse potenti nullam ac tortor vitae. Bibendum arcu vitae elementum curabitur. Fermentum leo vel orci porta. Nisl vel pretium lectus quam id leo in. Lorem ipsum dolor sit amet consectetur. Orci sagittis eu volutpat odio facilisis mauris sit. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.
                                      </p>
                              <p>
                                          Pellentesque dignissim ac orci a elementum. Morbi at venenatis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla enim magna, mattis sit amet arcu molestie, fermentum pellentesque enim. Vivamus commodo est eget justo pharetra convallis. Phasellus hendrerit elementum ipsum, sit amet dignissim risus lacinia fringilla. Aenean non diam nulla. Maecenas imperdiet lacus accumsan venenatis tempus. Aliquam vulputate facilisis tellus bibendum vestibulum.
                                      </p>
                              <p>
                                          Sed at odio luctus, tempus felis quis, hendrerit justo. Aliquam varius congue massa id fringilla. In consectetur urna et accumsan ornare. Quisque consequat consequat lorem, et euismod metus faucibus vitae. Sed sit amet risus a leo aliquet imperdiet. Cras pulvinar consequat feugiat. Proin tristique congue dignissim. Phasellus in erat ultrices, mollis orci in, consectetur arcu.
                                      </p>
                          </div>
                    <div slot="start" class="demo-drawer-start">
                              <div class="demo-drawer-header"><div><h6>Synchronous canceling</h6></div></div>
                              <div class="demo-padding">
                                          <p>With focus within the drawer, press Escape to close it.</p>
                                          <p>Closing will be cancelled until the switch below is turned off.</p>
                                          <oj-switch onvalueChanged={handleStartCancelabilityValueChanged} value={startCancelability} labelEdge="inside" labelHint="Cancel On/Off" />
                                      </div>
                          </div>
                    <div slot="end" class="demo-drawer-end">
                              <div class="demo-drawer-header"><h6>Asynchronous canceling</h6></div>
                              <div class="demo-padding">
                                          <p>With focus within the drawer, press Escape to close it.</p>
                                          <p>Closing will be cancelled until the form below gets validated.</p>
                                          <div class="demo-form-container">
                                                        <oj-form-layout>
                                                                        <oj-input-text aria-label="line1" value="Line 1" />
                                                                        <oj-input-text aria-label="line2" value="Line 2" />
                                                                    </oj-form-layout>
                                                    </div>
                                          <p>{validationStatus}</p>
                                      </div>
                          </div>
                </oj-drawer-layout>
        </div>
    );
};
export default DrawerLayoutCancelableEvents;
