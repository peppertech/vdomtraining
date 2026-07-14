import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojavatar';
import 'ojs/ojdrawerlayout';
import { useState } from 'preact/hooks';
// Controls
import "css!./demo.css";
import 'ojs/ojbutton';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';

type DrawerOpened = NonNullable<ComponentProps<'oj-drawer-layout'>['startOpened']>;
type DrawerOpenedEventValue = ComponentProps<'oj-drawer-layout'>['startOpened'];
type InputNumberValue = NonNullable<ComponentProps<'oj-input-number'>['value']>;

export const DrawerLayoutInsetLayoutcorepack = () => {
  const [startOpened, setStartOpened] = useState<DrawerOpened>(false);
  const [endOpened, setEndOpened] = useState<DrawerOpened>(false);
  const [bottomOpened, setBottomOpened] = useState<DrawerOpened>(false);
  const [countStart, setCountStart] = useState<InputNumberValue>(3);
  const [countMain, setCountMain] = useState<InputNumberValue>(7);
  const [countEnd, setCountEnd] = useState<InputNumberValue>(3);

  const handleStartOpenedStartOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onstartOpenedChanged']>>[0]) => {
    setStartOpened(event.detail.value ?? false);
  };

  const handleEndOpenedEndOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onendOpenedChanged']>>[0]) => {
    setEndOpened(event.detail.value ?? false);
  };

  const handleBottomOpenedBottomOpenedChanged = (event: Parameters<NonNullable<ComponentProps<'oj-drawer-layout'>['onbottomOpenedChanged']>>[0]) => {
    setBottomOpened(event.detail.value ?? false);
  };

  const handleCountMainValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
    setCountMain(event.detail.value ?? 0);
  };

  const handleCountStartValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
    setCountStart(event.detail.value ?? 0);
  };

  const handleCountEndValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
    setCountEnd(event.detail.value ?? 0);
  };

  const startToggle = () => setStartOpened((value) => !value);

  const endToggle = () => setEndOpened((value) => !value);

  const bottomToggle = () => setBottomOpened((value) => !value);

  return (
      <div id="demo-container">
            <div class="demo-header demo-padding oj-bg-neutral-0 oj-divider-bottom">
                    <div>
                              <oj-button id="toggleStartButton" class="demo-button" onojAction={startToggle}>Toggle Start</oj-button>
                              <oj-button id="toggleEndButton" class="demo-button" onojAction={endToggle}>Toggle End</oj-button>
                              <oj-button id="toggleBottomButton" class="demo-button" onojAction={bottomToggle}>Toggle Bottom</oj-button>
                          </div>
                    <oj-avatar role="img" aria-label="JD" initials="JD" background="green" title="JD" size="sm" shape="circle" />
                </div>
            <oj-drawer-layout onstartOpenedChanged={handleStartOpenedStartOpenedChanged} startOpened={startOpened} onendOpenedChanged={handleEndOpenedEndOpenedChanged} endOpened={endOpened} onbottomOpenedChanged={handleBottomOpenedBottomOpenedChanged} bottomOpened={bottomOpened} class="demo-drawer-layout">
                    <div class="demo-padding">
                              <oj-label-value labelEdge="top">
                                          <oj-label slot="label" for="demo-main-setter">Paragraphs</oj-label>
                                          <oj-input-number slot="value" id="demo-main-setter" max={20} min={0} step={1} onvalueChanged={handleCountMainValueChanged} value={countMain} />
                                      </oj-label-value>
                              <div id="demo-main">
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                          <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                    </p>
                                      </div>
                          </div>
                    <div slot="start" class="demo-drawer-start">
                              <div class="demo-drawer-header oj-bg-neutral-30">
                                          <h6>Fixed header</h6>
                                          <oj-button id="startButtonCloser" display="icons" chroming="borderless" onojAction={startToggle}>
                                                        <span slot="startIcon" class="oj-ux-ico-close" />
                                                        Close
                                                    </oj-button>
                                      </div>
                              <div class="demo-padding demo-drawer-content">
                                          <oj-label-value labelEdge="top">
                                                        <oj-label slot="label" for="demo-start-setter">Paragraphs</oj-label>
                                                        <oj-input-number slot="value" id="demo-start-setter" max={20} min={0} step={1} onvalueChanged={handleCountStartValueChanged} value={countStart} />
                                                    </oj-label-value>
                                          <div id="demo-start">
                                                        <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                                    </p>
                                                        <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                                    </p>
                                                        <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                                    </p>
                                                    </div>
                                      </div>
                          </div>
                    <div slot="end" class="demo-drawer-end">
                              <div class="demo-drawer-header oj-bg-neutral-30">
                                          <h6>Fixed header</h6>
                                          <oj-button id="endButtonCloser" display="icons" chroming="borderless" onojAction={endToggle}>
                                                        <span slot="startIcon" class="oj-ux-ico-close" />
                                                        Close
                                                    </oj-button>
                                      </div>
                              <div class="demo-padding demo-drawer-content">
                                          <oj-label-value labelEdge="top">
                                                        <oj-label slot="label" for="demo-end-setter">Paragraphs</oj-label>
                                                        <oj-input-number slot="value" id="demo-end-setter" max={20} min={0} step={1} onvalueChanged={handleCountEndValueChanged} value={countEnd} />
                                                    </oj-label-value>
                                          <div id="demo-end">
                                                        <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                                    </p>
                                                        <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                                    </p>
                                                        <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                                                    </p>
                                                    </div>
                                      </div>
                          </div>
                    <div slot="bottom" class="demo-padding">
                              <h6>Bottom drawer</h6>
                              <p>
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
                                      </p>
                          </div>
                </oj-drawer-layout>
            <div class="demo-footer demo-padding oj-bg-neutral-0 oj-divider-top">Footer</div>
        </div>
    );
};
export default DrawerLayoutInsetLayoutcorepack;
