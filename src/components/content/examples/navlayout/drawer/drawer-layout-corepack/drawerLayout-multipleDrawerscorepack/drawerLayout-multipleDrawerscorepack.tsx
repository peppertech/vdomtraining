import { JetElementCustomEvent } from 'ojs/index';
import { h } from 'preact';
import type { ComponentProps } from 'preact';

import { useState } from 'preact/hooks';
import 'ojs/ojdrawerlayout';
import 'ojs/ojbutton';
import 'ojs/ojnavigationlist';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import "css!./demo.css";

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-layout'>['startOpened']>;
type DrawerOpenedEventValue = ComponentProps<'oj-drawer-layout'>['startOpened'];

export const DrawerLayoutMultipleDrawerscorepack = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [endOpened, setEndOpened] = useState<DrawerOpened>(false);
  const [bottomOpened, setBottomOpened] = useState<DrawerOpened>(false);

  const handleStartOpenedStartOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onstartOpenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const handleEndOpenedEndOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onendOpenedChanged']>>[0]) => {
    setEndOpened(event.detail.value ?? false);
  };

  const handleBottomOpenedBottomOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onbottomOpenedChanged']>>[0]) => {
    setBottomOpened(event.detail.value ?? false);
  };

  const startToggle = () => setStartOpened((value) => !value);

  const endToggle = () => setEndOpened((value) => !value);

  const bottomToggle = () => setBottomOpened((value) => !value);

  return (
      <div id="demo-container">
            <oj-drawer-layout onstartOpenedChanged={handleStartOpenedStartOpenedChanged} startOpened={startOpened} onendOpenedChanged={handleEndOpenedEndOpenedChanged} endOpened={endOpened} onbottomOpenedChanged={handleBottomOpenedBottomOpenedChanged} bottomOpened={bottomOpened} class="demo-full-height">
                    <div class="demo-padding">
                              <div class="demo-controls">
                                          <oj-button id="startToggleButton" class="demo-button" onojAction={startToggle}>Toggle Start</oj-button>
                                          <oj-button id="endToggleButton" class="demo-button" onojAction={endToggle}>Toggle End</oj-button>
                                          <oj-button id="bottomToggleButton" class="demo-button" onojAction={bottomToggle}>Toggle Bottom</oj-button>
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
                    <div slot="end" class="demo-drawer-end">
                              <div class="demo-drawer-header">
                                          <h6>Address</h6>
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
                          </div>
                    <div slot="bottom" class="demo-drawer-bottom">
                              <div class="demo-padding">
                                          <p>
                                                        We use cookies to improve user experience, and analyze website traffic. For these reasons, we may share your site usage data with our analytics partners. By clicking
                                                        <a href="#">Accept Cookies</a>
                                                        you consent to store on your device all the technologies described in our Cookie Policy. You can change your cookie settings whenever needed by clicking
                                                        <a href="#">Cookie Preferences</a>
                                                    </p>
                                          <oj-button id="bottomButtonCloser" onojAction={bottomToggle}>Accept</oj-button>
                                      </div>
                          </div>
                </oj-drawer-layout>
        </div>
    );
};
export default DrawerLayoutMultipleDrawerscorepack;
