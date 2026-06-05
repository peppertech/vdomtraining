import { JetElementCustomEvent } from 'ojs/index';
import { h } from 'preact';
import type { ComponentProps } from 'preact';

import { useState } from 'preact/hooks';
import 'ojs/ojdrawerlayout';
// Controls
import 'ojs/ojbutton';
import 'ojs/ojradioset';
// Drawers
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojoption';
import "css!./demo.css";

export const DrawerLayoutDisplayMode = () => {
  const [endOpened, setEndOpened] = useState<ComponentProps<'oj-drawer-layout'>['endOpened']>(false);
  const [currentStyle, setCurrentStyle] = useState<ComponentProps<'oj-drawer-layout'>['endDisplay']>('auto');

  const handleEndOpenedEndOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onendOpenedChanged']>>[0]) => {
    setEndOpened(event.detail.value ?? false);
  };

  const handleCurrentStyleValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0]) => {
    setCurrentStyle((event.detail.value ?? 'auto') as ComponentProps<'oj-drawer-layout'>['endDisplay']);
  };

  const endToggle = () => setEndOpened(!endOpened);
  return (
      <div id="demo-container">
            <oj-drawer-layout onendOpenedChanged={handleEndOpenedEndOpenedChanged} endOpened={endOpened} endDisplay={currentStyle} class="demo-full-height">
                    <div class="demo-padding">
                              <div class="demo-controls">
                                          <oj-button class="demo-button" onojAction={endToggle}>Toggle End</oj-button>
                                          <oj-radioset id="radiosetSetValidation" labelEdge="inside" class="oj-choice-direction-row demo-radioset" onvalueChanged={handleCurrentStyleValueChanged} value={currentStyle}>
                                                        <oj-option value="auto">Auto</oj-option>
                                                        <oj-option value="overlay">Overlay</oj-option>
                                                        <oj-option value="reflow">Reflow</oj-option>
                                                    </oj-radioset>
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
                    <div slot="end" class="demo-drawer-end">
                              <div class="demo-drawer-header">
                                          <h6>Address</h6>
                                          <oj-button display="icons" chroming="borderless" onojAction={endToggle}>
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
export default DrawerLayoutDisplayMode;
