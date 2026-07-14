import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojdrawerpopup';
import { useState } from 'preact/hooks';
// Controls
import 'ojs/ojbutton';
import 'ojs/ojswitch';
// End drawer
import "css!./demo.css";
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';

export const DrawerPopupAutoDismiss = () => {
  const [endOpened, setEndOpened] = useState<ComponentProps<'oj-drawer-popup'>['opened']>(false);
  const [isChecked, setIsChecked] = useState<ComponentProps<'oj-switch'>['value']>(true);

  const handleIsCheckedValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => {
    setIsChecked(event.detail.value ?? false);
  };

  const handleEndOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setEndOpened(event.detail.value ?? false);
  };

  const endToggle = () => setEndOpened(!endOpened);

  return (
      <div id="demo-container">
            <div class="demo-padding">
                    <div class="demo-controls">
                              <oj-button onojAction={endToggle}>Toggle End</oj-button>
                              <oj-switch class="demo-switch" onvalueChanged={handleIsCheckedValueChanged} value={isChecked} labelEdge="inside" labelHint="Auto Dismiss" />
                          </div>
                    <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat consequat mauris nunc congue nisi vitae. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fermentum leo vel orci porta non pulvinar neque laoreet.
                          </p>
                    <p>
                              Non arcu risus quis varius quam quisque. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Pretium viverra suspendisse potenti nullam ac tortor vitae. Bibendum arcu vitae elementum curabitur. Fermentum leo vel orci porta. Nisl vel pretium lectus quam id leo in. Lorem ipsum dolor sit amet consectetur. Orci sagittis eu volutpat odio facilisis mauris sit. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.
                          </p>
                </div>
            <oj-drawer-popup edge="end" onopenedChanged={handleEndOpenedOpenedChanged} opened={endOpened} autoDismiss={isChecked ? "focus-loss" : "none"} aria-labelledby="header">
                    <div class="demo-drawer-header">
                              <h6 id="header">Address</h6>
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
                </oj-drawer-popup>
        </div>
    );
};
export default DrawerPopupAutoDismiss;
