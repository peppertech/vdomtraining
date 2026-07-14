import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojbutton'; // Controls
import 'ojs/ojdrawerpopup';
import 'ojs/ojnavigationlist'; // Start drawer
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
// End drawer
import "css!./demo.css";
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojselectsingle';

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-popup'>['opened']>;
type SelectSingleValue = NonNullable<ComponentProps<'oj-select-single'>['value']>;
type SelectOption = {
    value: string;
    label: string;
};

export const DrawerPopupBasic = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [endOpened, setEndOpened] = useState<DrawerOpened>(false);
  const [bottomOpened, setBottomOpened] = useState<DrawerOpened>(false);
  const [selectVal, setSelectVal] = useState<SelectSingleValue>('3');
  const [selectVal2, setSelectVal2] = useState<SelectSingleValue>('CH');

  const lines = useMemo<SelectOption[]>(() => [
      { value: '3', label: 'Line 3' },
      { value: '4', label: 'Line 4' },
      { value: '5', label: 'Line 5' },
      { value: '6', label: 'Line 6' },
      { value: '7', label: 'Line 7' }
  ], []);
  const linesDP = useMemo(() => new ArrayDataProvider<SelectOption['value'], SelectOption>(lines, {
      keyAttributes: 'value'
  }), [lines]);
  const browsers = useMemo<SelectOption[]>(() => [
      { value: 'IE', label: 'Internet Explorer' },
      { value: 'FF', label: 'Firefox' },
      { value: 'CH', label: 'Chrome' },
      { value: 'OP', label: 'Opera' },
      { value: 'SA', label: 'Safari' }
  ], []);
  const browsersDP = useMemo(() => new ArrayDataProvider<SelectOption['value'], SelectOption>(browsers, {
      keyAttributes: 'value'
  }), [browsers]);

  const handleStartOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const handleEndOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setEndOpened(event.detail.value ?? false);
  };

  const handleSelectValValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0]) => {
    setSelectVal(event.detail.value ?? '3');
  };

  const handleSelectVal2ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0]) => {
    setSelectVal2(event.detail.value ?? 'CH');
  };

  const handleBottomOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setBottomOpened(event.detail.value ?? false);
  };

  const startToggle = () => setStartOpened((value) => !value);

  const endToggle = () => setEndOpened((value) => !value);

  const bottomToggle = () => setBottomOpened((value) => !value);

  return (
      <div id="demo-container">
            <div class="demo-padding">
                    <div class="demo-controls">
                              <oj-button id="toggleStartButton" class="demo-button" onojAction={startToggle}>Toggle Start</oj-button>
                              <oj-button id="toggleEndButton" class="demo-button" onojAction={endToggle}>Toggle End</oj-button>
                              <oj-button id="toggleBottomButton" class="demo-button" onojAction={bottomToggle}>Toggle Bottom</oj-button>
                          </div>
                    <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat consequat mauris nunc congue nisi vitae. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Fermentum leo vel orci porta non pulvinar neque laoreet.
                          </p>
                    <p>
                              Non arcu risus quis varius quam quisque. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Pretium viverra suspendisse potenti nullam ac tortor vitae. Bibendum arcu vitae elementum curabitur. Fermentum leo vel orci porta. Nisl vel pretium lectus quam id leo in. Lorem ipsum dolor sit amet consectetur. Orci sagittis eu volutpat odio facilisis mauris sit. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus.
                          </p>
                </div>
            <oj-drawer-popup class="demo-drawer-start" onopenedChanged={handleStartOpenedOpenedChanged} opened={startOpened} aria-labelledby="startHeader">
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
            <oj-drawer-popup class="demo-drawer-end" edge="end" onopenedChanged={handleEndOpenedOpenedChanged} opened={endOpened} aria-labelledby="endHeader">
                    <div class="demo-drawer-header">
                              <div id="endHeader"><h6>Address</h6></div>
                              <oj-button id="endButtonCloser" display="icons" chroming="borderless" onojAction={endToggle}>
                                          <span slot="startIcon" class="oj-ux-ico-close" />
                                          Close
                                      </oj-button>
                          </div>
                    <div class="demo-padding demo-form-container">
                              <oj-form-layout>
                                          <oj-input-text aria-label="line1" value="Line 1" />
                                          <oj-input-text aria-label="line2" value="Line 2" />
                                          <oj-select-single id="select1" labelHint="More Lines" labelEdge="inside" class="oj-form-control-max-width-md" data={linesDP} onvalueChanged={handleSelectValValueChanged} value={selectVal} />
                                          <oj-select-single id="select2" labelHint="Select Single with ArrayDataProvider" labelEdge="inside" data={browsersDP} onvalueChanged={handleSelectVal2ValueChanged} value={selectVal2} itemText="label" />
                                      </oj-form-layout>
                          </div>
                </oj-drawer-popup>
            <oj-drawer-popup class="demo-drawer-bottom" edge="bottom" onopenedChanged={handleBottomOpenedOpenedChanged} opened={bottomOpened} aria-label="Cookie Preferences">
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
export default DrawerPopupBasic;
