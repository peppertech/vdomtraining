import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojdrawerpopup';
import { useState } from 'preact/hooks';
// Controls
import 'ojs/ojbutton';
import 'ojs/ojswitch';
// Start drawer
import 'ojs/ojnavigationlist';
// End drawer
import "css!./demo.css";
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-popup'>['opened']>;
type SwitchValue = NonNullable<ComponentProps<'oj-switch'>['value']>;
type DrawerModality = ComponentProps<'oj-drawer-popup'>['modality'];

export const DrawerPopupModality = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [isChecked, setIsChecked] = useState<SwitchValue>(true);

  const handleIsCheckedValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0]) => {
    setIsChecked(event.detail.value ?? false);
  };

  const handleStartOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const startToggle = () => setStartOpened((value) => !value);
  const modality: DrawerModality = isChecked ? 'modal' : 'modeless';

  return (
      <div id="demo-container">
            <div class="demo-padding">
                    <div class="demo-controls">
                              <oj-button id="demoToggleButton" onojAction={startToggle}>Toggle Start</oj-button>
                              <oj-switch class="demo-switch" onvalueChanged={handleIsCheckedValueChanged} value={isChecked} labelEdge="inside" labelHint="Modal On/Off" />
                          </div>
                    <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat consequat mauris nunc congue nisi vitae. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fermentum leo vel orci porta non pulvinar neque laoreet.
                          </p>
                    <p>
                              Non arcu risus quis varius quam quisque. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Pretium viverra suspendisse potenti nullam ac tortor vitae. Bibendum arcu vitae elementum curabitur. Fermentum leo vel orci porta. Nisl vel pretium lectus quam id leo in. Lorem ipsum dolor sit amet consectetur. Orci sagittis eu volutpat odio facilisis mauris sit. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.
                          </p>
                </div>
            <oj-drawer-popup id="demoDrawerStart" onopenedChanged={handleStartOpenedOpenedChanged} opened={startOpened} modality={modality} aria-labelledby="header">
                    <div class="demo-drawer-header">
                              <div id="header"><h6>Welcome</h6></div>
                              <oj-button id="demoCloseButton" display="icons" chroming="borderless" onojAction={startToggle}>
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
        </div>
    );
};
export default DrawerPopupModality;
