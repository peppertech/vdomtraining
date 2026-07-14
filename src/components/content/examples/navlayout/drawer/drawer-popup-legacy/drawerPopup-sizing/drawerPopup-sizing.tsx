import 'preact';
import type { ComponentProps } from 'preact';

import "css!./demo.css";
import 'oj-c/button';
import 'ojs/ojdrawerpopup';
import 'ojs/ojformlayout';
import 'ojs/ojselectsingle';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-popup'>['opened']>;
type SelectSingleValue = NonNullable<ComponentProps<'oj-select-single'>['value']>;
type PopupSizeValue = 'min' | '50vw' | 'max' | '10rem' | '20rem' | '80vh';
type SizeOption = {
    value: PopupSizeValue;
    label: string;
};

export const DrawerPopupSizing = () => {
  const startDefaultValue: SelectSingleValue = 'min';
  const bottomDefaultValue: SelectSingleValue = '20rem';
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [bottomOpened, setBottomOpened] = useState<DrawerOpened>(false);
  const [startWidth, setStartWidth] = useState<SelectSingleValue>(startDefaultValue);
  const [bottomHeight, setBottomHeight] = useState<SelectSingleValue>(bottomDefaultValue);
  const [startTitle, setStartTitle] = useState<string>('Content width: ' + startDefaultValue);
  const [bottomTitle, setBottomTitle] = useState<string>('Content height: ' + bottomDefaultValue);
  const widthOptions = useMemo<SizeOption[]>(() => [
      {
          value: 'min',
          label: 'Minimize (320px)'
      },
      {
          value: '50vw',
          label: '50vw'
      },
      {
          value: 'max',
          label: 'Maximize (90vw)'
      }
  ], []);
  const widthOptionsDP = useMemo(() => new ArrayDataProvider<SizeOption['value'], SizeOption>(widthOptions, {
      keyAttributes: 'value'
  }), [widthOptions]);
  const heightOptions = useMemo<SizeOption[]>(() => [
      {
          value: '10rem',
          label: '10rem'
      },
      {
          value: '20rem',
          label: '20rem'
      },
      {
          value: '80vh',
          label: '80vh'
      }
  ], []);
  const heightOptionsDP = useMemo(() => new ArrayDataProvider<SizeOption['value'], SizeOption>(heightOptions, {
      keyAttributes: 'value'
  }), [heightOptions]);

  const handleStartOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const handleStartWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0]) => {
    setStartWidth(event.detail.value ?? startDefaultValue);
  };

  const handleBottomOpenedOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-popup'>['onopenedChanged']>>[0]) => {
    setBottomOpened(event.detail.value ?? false);
  };

  const handleBottomHeightValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>>[0]) => {
    setBottomHeight(event.detail.value ?? bottomDefaultValue);
  };

  const startToggle = () => setStartOpened((value) => !value);

  const bottomToggle = () => setBottomOpened((value) => !value);

  const updateWidth = (value: string) => {
      const startContentElement = document.getElementById('demo-start-drawer-content');
      if (startContentElement) {
          startContentElement.removeAttribute('class');
          startContentElement.classList.add('demo-start-drawer-width-' + value);
          const title = startContentElement.getElementsByTagName('h6')[0];
          if (title) {
              setStartTitle('Content width: ' + value);
          }
      }
  };
  const updateHeight = (value: string) => {
      const bottomContentElement = document.getElementById('demo-bottom-drawer-content');
      if (bottomContentElement) {
          bottomContentElement.removeAttribute('class');
          bottomContentElement.classList.add('demo-bottom-drawer-height-' + value);
          const title = bottomContentElement.getElementsByTagName('h6')[0];
          if (title) {
              setBottomTitle('Content height: ' + value);
          }
      }
  };
  return (
      <div id="demo-container">
            <div class="oj-sm-padding-4x">
                    <oj-c-button class="oj-sm-margin-2x-end" onojAction={startToggle} label="Toggle Start" />
                    <oj-c-button onojAction={bottomToggle} label="Toggle Bottom" />
                </div>
            <oj-drawer-popup onopenedChanged={handleStartOpenedOpenedChanged} opened={startOpened}>
                    <div id="demo-start-drawer-content" class="demo-start-drawer-width-min">
                              <div class="demo-drawer-header">
                                          <h6>{startTitle}</h6>
                                          <oj-c-button display="icons" chroming="borderless" onojAction={startToggle} label="Close"><span slot="startIcon" class="oj-ux-ico-close" /></oj-c-button>
                                      </div>
                              <div class="oj-sm-padding-4x">
                                          <oj-select-single id="select1" labelHint="Select width" labelEdge="inside" data={widthOptionsDP} onvalueChanged={handleStartWidthValueChanged} value={startWidth} itemText="label" />
                                      </div>
                          </div>
                </oj-drawer-popup>
            <oj-drawer-popup edge="bottom" onopenedChanged={handleBottomOpenedOpenedChanged} opened={bottomOpened}>
                    <div id="demo-bottom-drawer-content" class="demo-bottom-drawer-height-20rem">
                              <div class="demo-drawer-header">
                                          <h6>{bottomTitle}</h6>
                                          <oj-c-button display="icons" chroming="borderless" onojAction={bottomToggle} label="Close"><span slot="startIcon" class="oj-ux-ico-close" /></oj-c-button>
                                      </div>
                              <div class="oj-sm-padding-4x">
                                          <oj-select-single id="select2" labelHint="Select height" labelEdge="inside" data={heightOptionsDP} onvalueChanged={handleBottomHeightValueChanged} value={bottomHeight} itemText="label" />
                                      </div>
                          </div>
                </oj-drawer-popup>
        </div>
    );
};
export default DrawerPopupSizing;
