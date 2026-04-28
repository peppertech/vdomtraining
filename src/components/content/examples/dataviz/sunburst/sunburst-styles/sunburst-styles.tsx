import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { JetElementCustomEvent } from 'ojs/index';
import "css!./demo.css";
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojsunburst';
import '../../../../../jet-composites/demo-input-json/loader';
import '../../../../../jet-composites/demo-select-enum/loader';

type LabelDisplay = 'auto' | 'horizontal' | 'rotated' | 'off';
type LabelHalign = 'center' | 'inner' | 'outer';
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
  fontFamily: string;
  fontSize: string;
} | {
  color: string;
};

type StyleNode = {
  label: string;
  id: string;
  value: number;
  nodes?: StyleNode[];
};

type NodeTemplateContext = {
  data: StyleNode;
};

const nodes = JSON.parse(jsonDataText as string) as StyleNode[];

export const SunburstStyles = (): JSX.Element => {
  const [borderColor, setBorderColor] = useState<string>('#FFFFFF');
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [labelDisplay, setLabelDisplay] = useState<LabelDisplay>('auto');
  const [labelHalign, setLabelHalign] = useState<LabelHalign>('center');
  const [labelStyle, setLabelStyle] = useState<LabelStyle>({
    fontFamily: "'Helvetica Neue',Helvetica, Arial,sans-serif",
    fontSize: '11px'
  });
  const [nodeColor, setNodeColor] = useState<string>('#267DB3');
  const [nodeLabel, setNodeLabel] = useState<string>('Massachusetts');
  const [nodeBorderColor, setNodeBorderColor] = useState<string>('#DA80FB');
  const [nodeBorderWidth, setNodeBorderWidth] = useState<number>(3);
  const [pattern, setPattern] = useState<Pattern>('smallChecker');
  const [selectable, setSelectable] = useState<Selectable>('auto');

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const nodeClassName = 'demo-custom-border';
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const nodeDefaults = useMemo<NonNullable<ComponentProps<'oj-sunburst'>['nodeDefaults']>>(
    () => ({
      labelDisplay,
      labelHalign
    }),
    [labelDisplay, labelHalign]
  );

  const getColor = (data: StyleNode): string => colorHandler.getValue(data.id.substring(0, 1));
  const getShortDesc = (label: string, value: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Value: ${value}`;

  const handleNumberChanged =
    (setter: (value: number) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]): void => {
      setter(event.detail.value ?? 0);
    };

  const handleTextChanged =
    (setter: (value: string) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]): void => {
      setter(event.detail.value ?? '');
    };

  const handleJsonChanged = (event: JetElementCustomEvent<LabelStyle>): void => {
    setLabelStyle(event.detail.value);
  };

  const nodeTemplateRenderer = ($current: NodeTemplateContext): JSX.Element => (
    <oj-sunburst-node
      value={$current.data.value}
      color={$current.data.id === '0' ? nodeColor : getColor($current.data)}
      borderColor={$current.data.id === '0' ? nodeBorderColor : borderColor}
      borderWidth={$current.data.id === '0' ? nodeBorderWidth : borderWidth}
      label={$current.data.id === '0' ? nodeLabel : $current.data.label}
      pattern={$current.data.id === '0' ? pattern : 'none'}
      selectable={$current.data.id === '0' ? selectable : 'auto'}
      svgClassName={$current.data.id === '1' ? nodeClassName : undefined}
      labelStyle={$current.data.id === '1' ? { color: 'black' } : labelStyle}
      shortDesc={getShortDesc($current.data.label, $current.data.value)}
    />
  );

  return (
    <div id="sunburst-container" class="oj-flex oj-sm-padding-1x">
      <div class="oj-flex-item">
        <oj-sunburst
          id="sunburst"
          animationOnDataChange="auto"
          data={sunburstData}
          nodeDefaults={nodeDefaults}
          selection={['1']}
          selectionMode="multiple"
        >
          <template slot="nodeTemplate" render={nodeTemplateRenderer} />
        </oj-sunburst>
      </div>
      <div class="oj-flex-item">
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Node Defaults</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <oj-input-text onvalueChanged={handleTextChanged(setBorderColor)} value={borderColor} labelHint="Border Color" />
          <oj-input-number onvalueChanged={handleNumberChanged(setBorderWidth)} value={borderWidth} min={0} labelHint="Border Width" />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<LabelDisplay>) => setLabelDisplay(event.detail.value)}
            value={labelDisplay}
            labelHint="Label Display"
            enumValues={['auto', 'horizontal', 'rotated', 'off']}
          />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<LabelHalign>) => setLabelHalign(event.detail.value)}
            value={labelHalign}
            labelHint="Label H-Align"
            enumValues={['center', 'inner', 'outer']}
          />
          <demo-input-json onvalueChanged={handleJsonChanged} value={labelStyle} labelHint="Label Style" />
        </oj-form-layout>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Node Style - Massachusetts</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <oj-input-text onvalueChanged={handleTextChanged(setNodeColor)} value={nodeColor} labelHint="Color" />
          <oj-input-text onvalueChanged={handleTextChanged(setNodeLabel)} value={nodeLabel} labelHint="Label" />
          <oj-input-text onvalueChanged={handleTextChanged(setNodeBorderColor)} value={nodeBorderColor} labelHint="Border Color" />
          <oj-input-number min={0} onvalueChanged={handleNumberChanged(setNodeBorderWidth)} value={nodeBorderWidth} labelHint="Border Width" />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<Pattern>) => setPattern(event.detail.value)}
            value={pattern}
            labelHint="Pattern"
            enumValues={[
              'none',
              'smallChecker',
              'smallCrosshatch',
              'smallDiagonalLeft',
              'smallDiagonalRight',
              'smallDiamond',
              'smallTriangle',
              'largeChecker',
              'largeCrosshatch',
              'largeDiagonalLeft',
              'largeDiagonalRight',
              'largeDiamond',
              'largeTriangle'
            ]}
          />
          <demo-select-enum
            onvalueChanged={(event: JetElementCustomEvent<Selectable>) => setSelectable(event.detail.value)}
            value={selectable}
            labelHint="Selectable"
            enumValues={['auto', 'off']}
          />
        </oj-form-layout>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Node Style - Connecticut</div>
        <oj-form-layout aria-controls="sunburst" maxColumns={2}>
          <oj-input-text value={nodeClassName} labelHint="Class Name" />
        </oj-form-layout>
      </div>
    </div>
  );
};

export default SunburstStyles;
