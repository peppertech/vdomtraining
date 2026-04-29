// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojtreemap';
import '../../../../../jet-composites/demo-input-json/loader';
import '../../../../../jet-composites/demo-select-enum/loader';
import "css!./demo.css";
import * as jsonDataText from 'text!../treemap-animation/cityStateData.json';
import { ojTreemap } from 'ojs/ojtreemap';

type LabelDisplay = 'node' | 'off';
type LabelHalign = 'start' | 'center' | 'end';
type LabelValign = 'top' | 'center' | 'bottom';
type HeaderIsolate = 'on' | 'off';
type Pattern =
  | 'none'
  | 'smallChecker'
  | 'smallCrosshatch'
  | 'smallDiagonalLeft'
  | 'smallDiagonalRight'
  | 'smallDiamond'
  | 'smallTriangle'
  | 'largeChecker'
  | 'largeCrosshatch'
  | 'largeDiagonalLeft'
  | 'largeDiagonalRight'
  | 'largeDiamond'
  | 'largeTriangle';
type Selectable = 'auto' | 'off';
type LabelStyle = {
  fontFamily?: string;
  fontSize?: string;
  color?: string;
};
type HeaderLabelStyle = {
  fontSize?: string;
};
type StyleNode = {
  label: string;
  id: string;
  value: number;
  nodes?: StyleNode[];
};
type NodeTemplateContext = ojTreemap.NodeTemplateContext<string, StyleNode>;

const nodes = JSON.parse(jsonDataText as string) as StyleNode[];

export const TreemapStyles = (): JSX.Element => {
  const [labelDisplay, setLabelDisplay] = useState<LabelDisplay>('node');
  const [labelHalign, setLabelHalign] = useState<LabelHalign>('center');
  const [labelValign, setLabelValign] = useState<LabelValign>('center');
  const [labelStyle, setLabelStyle] = useState<LabelStyle>({
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '11px'
  });
  const [headerBorderColor, setHeaderBorderColor] = useState<string>('#FFFFFF');
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string>('#FFFFFF');
  const [headerLabelHalign, setHeaderLabelHalign] = useState<LabelHalign>('start');
  const [headerLabelStyle, setHeaderLabelStyle] = useState<HeaderLabelStyle>({ fontSize: '15px' });
  const [headerIsolate, setHeaderIsolate] = useState<HeaderIsolate>('on');
  const [nodeColor, setNodeColor] = useState<string>('#267DB3');
  const [nodeLabel, setNodeLabel] = useState<string>('Boston');
  const [pattern, setPattern] = useState<Pattern>('smallChecker');
  const [selectable, setSelectable] = useState<Selectable>('off');
  const [nodeClassName, setNodeClassName] = useState<string>('demo-custom-border');

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    []
  );

  const nodeDefaults = useMemo<NonNullable<ComponentProps<'oj-treemap'>['nodeDefaults']>>(
    () => ({
      header: {
        backgroundColor: headerBackgroundColor,
        borderColor: headerBorderColor,
        labelHalign: headerLabelHalign,
        labelStyle: headerLabelStyle,
        isolate: headerIsolate
      },
      labelDisplay,
      labelHalign,
      labelValign,
      groupLabelDisplay: 'header'
    }),
    [headerBackgroundColor, headerBorderColor, headerIsolate, headerLabelHalign, headerLabelStyle, labelDisplay, labelHalign, labelValign]
  );

  const getColor = (data: StyleNode): string => colorHandler.getValue(data.id.substring(0, 1));
  const getShortDesc = (label: string, value: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Value: ${value}`;

  const handleTextChanged =
    (setter: (value: string) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]): void => {
      setter(event.detail.value ?? '');
    };

  const nodeTemplateRenderer = ($current: NodeTemplateContext): JSX.Element => (
    <oj-treemap-node
      value={$current.data.value}
      label={$current.data.id === '00' ? nodeLabel : $current.data.label}
      selectable={$current.data.id === '00' ? selectable : 'auto'}
      color={$current.data.id === '00' ? nodeColor : getColor($current.data)}
      pattern={$current.data.id === '00' ? pattern : 'none'}
      svgClassName={$current.data.id === '20' ? nodeClassName : undefined}
      labelStyle={$current.data.id === '20' ? { color: 'black' } : labelStyle}
      shortDesc={getShortDesc($current.data.label, $current.data.value)}
    />
  );

  return (
    <div id="treemap-container" class="oj-flex oj-sm-padding-1x">
      <div class="oj-flex-item">
        <oj-treemap
          id="treemap"
          selectionMode="multiple"
          data={treemapData}
          nodeDefaults={nodeDefaults}
          animationOnDataChange="auto"
          selection={['00']}
        >
          <template slot="nodeTemplate" render={nodeTemplateRenderer} />
        </oj-treemap>
      </div>

      <div class="oj-flex-item">
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Node Defaults</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<LabelDisplay>) => setLabelDisplay(event.detail.value)}
            value={labelDisplay}
            labelHint="Label Display"
            enumValues={["node", "off"]}
          />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<LabelHalign>) => setLabelHalign(event.detail.value)}
            value={labelHalign}
            labelHint="Label H-Align"
            enumValues={["start", "center", "end"]}
          />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<LabelValign>) => setLabelValign(event.detail.value)}
            value={labelValign}
            labelHint="Label V-Align"
            enumValues={["top", "center", "bottom"]}
          />
          <demo-input-json
            onvalueChanged={(event: JetElementCustomEvent<LabelStyle>) => setLabelStyle(event.detail.value)}
            value={labelStyle}
            labelHint="Label Style"
          />
        </oj-form-layout>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Header</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <oj-input-text onvalueChanged={handleTextChanged(setHeaderBorderColor)} value={headerBorderColor} labelHint="Border Color" />
          <oj-input-text onvalueChanged={handleTextChanged(setHeaderBackgroundColor)} value={headerBackgroundColor} labelHint="Background Color" />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<HeaderIsolate>) => setHeaderIsolate(event.detail.value)}
            value={headerIsolate}
            labelHint="Isolate"
            enumValues={["on", "off"]}
          />
          <demo-input-json
            onvalueChanged={(event: JetElementCustomEvent<HeaderLabelStyle>) => setHeaderLabelStyle(event.detail.value)}
            value={headerLabelStyle}
            labelHint="Label Style"
          />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<LabelHalign>) => setHeaderLabelHalign(event.detail.value)}
            value={headerLabelHalign}
            labelHint="Label H-Align"
            enumValues={["start", "center", "end"]}
          />
        </oj-form-layout>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Node - Boston</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <oj-input-text onvalueChanged={handleTextChanged(setNodeColor)} value={nodeColor} labelHint="Color" />
          <oj-input-text onvalueChanged={handleTextChanged(setNodeLabel)} value={nodeLabel} labelHint="Label" />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<Pattern>) => setPattern(event.detail.value)}
            value={pattern}
            labelHint="Pattern"
            enumValues={["none","smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeDiamond","largeTriangle"]}
          />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<Selectable>) => setSelectable(event.detail.value)}
            value={selectable}
            labelHint="Selectable"
            enumValues={["auto", "off"]}
          />
        </oj-form-layout>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Node - Portland</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <oj-input-text onvalueChanged={handleTextChanged(setNodeClassName)} value={nodeClassName} labelHint="Class Name" />
        </oj-form-layout>
      </div>
    </div>
  );
};

export default TreemapStyles;
