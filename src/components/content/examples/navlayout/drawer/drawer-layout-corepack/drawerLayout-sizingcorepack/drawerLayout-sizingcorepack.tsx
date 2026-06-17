import { h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojdrawerlayout';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojselectsingle';
import 'ojs/ojlabelvalue';
import "css!./demo.css";

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-layout'>['startOpened']>;
type WidthValue = 12 | 19 | 25 | 31 | 37;
type HeightValue = 'min' | '50%' | 'max';
type WidthOption = { value: WidthValue; label: string };
type HeightOption = { value: HeightValue; label: string };
const bottomHeightStyles: Record<HeightValue, string> = {
  min: '11rem',
  '50%': '50%',
  max: '100%'
};

export const DrawerLayoutSizingcorepack = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [bottomOpened, setBottomOpened] = useState<DrawerOpened>(false);
  const [widthStart, setWidthStart] = useState<WidthValue>(25);
  const [heightBottom, setHeightBottom] = useState<HeightValue>('min');

  const widthOptions = useMemo<WidthOption[]>(() => [
      { value: 12, label: '12rem' },
      { value: 19, label: '19rem' },
      { value: 25, label: '25rem' },
      { value: 31, label: '31rem' },
      { value: 37, label: '37rem' }
  ], []);
  const widthOptionsDP = useMemo(() => new ArrayDataProvider<WidthValue, WidthOption>(widthOptions, {
      keyAttributes: 'value'
  }), [widthOptions]);
  const heightOptions = useMemo<HeightOption[]>(() => [
      { value: 'min', label: 'Minimize' },
      { value: '50%', label: '50% height' },
      { value: 'max', label: 'Maximize' }
  ], []);
  const heightOptionsDP = useMemo(() => new ArrayDataProvider<HeightValue, HeightOption>(heightOptions, {
      keyAttributes: 'value'
  }), [heightOptions]);

  const handleStartOpenedStartOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onstartOpenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const handleBottomOpenedBottomOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onbottomOpenedChanged']>>[0]) => {
    setBottomOpened(event.detail.value ?? false);
  };

  const handleWidthStartValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0]) => {
    const value = event.detail.value as WidthValue | null;
    if (value != null) {
      setWidthStart(value);
    }
  };

  const handleHeightBottomValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0]) => {
    const value = event.detail.value as HeightValue | null;
    if (value != null) {
      setHeightBottom(value);
    }
  };

  const startToggle = () => setStartOpened((value) => !value);

  const bottomToggle = () => setBottomOpened((value) => !value);

  const startDrawerClass = `demo-drawer-width-${widthStart}`;
  const bottomDrawerStyle = { height: bottomHeightStyles[heightBottom] };

  return (
      <div id="demo-container" class="drawer-layout-sizing-demo">
            <oj-drawer-layout id="demo-drawer-layout" onstartOpenedChanged={handleStartOpenedStartOpenedChanged} startOpened={startOpened} onbottomOpenedChanged={handleBottomOpenedBottomOpenedChanged} bottomOpened={bottomOpened} bottomDisplay="overlay" class="demo-full-height">
                    <div class="oj-sm-padding-4x">
                              <div class="oj-sm-padding-4x-bottom">
                                          <oj-button id="startToggleButton" class="oj-sm-margin-2x-end" onojAction={startToggle}>Toggle Start</oj-button>
                                          <oj-button id="bottomToggleButton" class="oj-sm-margin-2x-end" onojAction={bottomToggle}>Toggle Bottom</oj-button>
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
                    <div slot="start" id="demo-drawer-start" class={startDrawerClass}>
                              <div class="demo-drawer-header">
                                          <h6>{`Content width: ${widthStart}rem`}</h6>
                                          <oj-button id="buttonCloser" class="demo-close-button" display="icons" chroming="borderless" onojAction={startToggle}>
                                                        <span slot="startIcon" class="oj-ux-ico-close" />
                                                        Close
                                                    </oj-button>
                                      </div>
                              <div class="oj-sm-padding-4x">
                                          <oj-select-single labelHint="Select width" labelEdge="inside" data={widthOptionsDP} itemText="label" onvalueChanged={handleWidthStartValueChanged} value={widthStart} />
                                      </div>
                          </div>
                    <div slot="bottom" id="demo-drawer-bottom-content" style={bottomDrawerStyle}>
                                          <div class="demo-drawer-header">
                                                        <h6>{`Content height: ${heightBottom}`}</h6>
                                                        <oj-button id="bottomButtonCloser" display="icons" chroming="borderless" onojAction={bottomToggle}>
                                                                        <span slot="startIcon" class="oj-ux-ico-close" />
                                                                        Close
                                                                    </oj-button>
                                                    </div>
                                          <div class="oj-sm-padding-4x demo-form-container">
                                                        <oj-select-single labelHint="Select height" labelEdge="inside" data={heightOptionsDP} itemText="label" onvalueChanged={handleHeightBottomValueChanged} value={heightBottom} />
                                                    </div>
                          </div>
                </oj-drawer-layout>
        </div>
    );
};
export default DrawerLayoutSizingcorepack;
