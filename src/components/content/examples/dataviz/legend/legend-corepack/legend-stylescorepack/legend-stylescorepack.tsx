import "css!./demo.css";
import "oj-c/legend";
import "oj-c/legend-item";
import "oj-c/legend-section";
import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import type { ComponentProps,JSX } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type CurrentTab = 'itemStyles' | 'textStyles';
type LegendLineStyle = 'solid' | 'dashed' | 'dotted';
type LegendMarkerShape =
  | 'square'
  | 'circle'
  | 'diamond'
  | 'plus'
  | 'triangleDown'
  | 'triangleUp'
  | 'human'
  | 'star'
  | 'rectangle'
  | 'ellipse';
type LegendSymbolType = 'line' | 'lineWithMarker' | 'marker';
type SectionTitleAlign = 'start' | 'center' | 'end';
type FruitItem = {
  fruit: string;
};
type FruitSection = {
  items: FruitItem[];
};
type StyleRecord = Record<string, string>;
type LegendItemTextStyle = NonNullable<ComponentProps<'oj-c-legend'>['textStyle']>;
type LegendSectionTitleStyle = NonNullable<ComponentProps<'oj-c-legend'>['sectionTitleStyle']>;

const fruits: FruitSection[] = [
  {
    items: [
      { fruit: 'Blueberries' },
      { fruit: 'Kiwis' },
      { fruit: 'Bananas' },
      { fruit: 'Apples' },
      { fruit: 'Grapes' }
    ]
  }
];

export const LegendStylescorepack = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>('itemStyles');
  const [legendTextStyle, setLegendTextStyle] = useState<StyleRecord>({ fontSize: '12px' });
  const [legendSymbolWidth, setLegendSymbolWidth] = useState<number>(25);
  const [legendSymbolHeight, setLegendSymbolHeight] = useState<number>(25);
  const [sectionTitle, setSectionTitle] = useState<string>('Fruits');
  const [sectionTitleStyle, setSectionTitleStyle] = useState<StyleRecord>({
    fontSize: '16px',
    color: '#408CB4'
  });
  const [sectionTitleAlign, setSectionTitleAlign] = useState<SectionTitleAlign>('start');
  const [color, setColor] = useState<string>('#267db3');
  const [borderColor, setBorderColor] = useState<string>('#0F3248');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [lineStyle, setLineStyle] = useState<LegendLineStyle>('solid');
  const [markerColor, setMarkerColor] = useState<string>('#8561C8');
  const [markerShape, setMarkerShape] = useState<LegendMarkerShape>('square');
  const [symbolType, setSymbolType] = useState<LegendSymbolType>('lineWithMarker');

  const dataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<number, FruitSection | FruitItem>(fruits, {
        childrenAttribute: 'items'
      }),
    []
  );
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const itemTemplateRenderer: import("ojs/ojvcomponent").TemplateSlot<{ data: FruitItem; index: number }> = ($current): JSX.Element => (
    <oj-c-legend-item
      shortDesc={$current.data.fruit}
      text={$current.data.fruit}
      color={$current.index === 4 ? color : colorHandler.getValue($current.data.fruit)}
      borderColor={$current.index === 4 ? borderColor : undefined}
      lineStyle={$current.index === 4 ? lineStyle : undefined}
      lineWidth={$current.index === 4 ? lineWidth : undefined}
      markerColor={$current.index === 4 ? markerColor : undefined}
      markerShape={$current.index === 4 ? markerShape : undefined}
      symbolType={$current.index === 4 ? symbolType : undefined}
    />
  );

  const sectionTemplateRenderer: import("ojs/ojvcomponent").TemplateSlot<{}> = (): JSX.Element => <oj-c-legend-section text={sectionTitle} />;

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

  return (
    <div id="legend-container" class="oj-flex">
      <oj-c-legend
        class="oj-flex-item demo-legend"
        id="legend1"
        orientation="vertical"
        data={dataProvider}
        textStyle={legendTextStyle as LegendItemTextStyle}
        symbolWidth={legendSymbolWidth}
        symbolHeight={legendSymbolHeight}
        sectionTitleStyle={sectionTitleStyle as LegendSectionTitleStyle}
        sectionTitleHalign={sectionTitleAlign}
      >
        <template slot="sectionTemplate" render={sectionTemplateRenderer} />
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-c-legend>

      <demo-tabs
        class="oj-flex-item demo-legend-styles-tabs-height"
        headers={[
          { id: "itemStyles", label: "Item Styles" },
          { id: "textStyles", label: "Text Styles" },
        ]}
        value={currentTab}
        onvalueChanged={(event: JetElementCustomEvent<CurrentTab>) => setCurrentTab(event.detail.value)}
      >
        <div>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Items Attributes - Item 5</div>
          <oj-form-layout aria-controls="legend1" maxColumns={2}>
            <oj-input-text labelHint="color" value={color} onvalueChanged={handleTextChanged(setColor)} />
            <oj-input-text
              labelHint="borderColor"
              value={borderColor}
              onvalueChanged={handleTextChanged(setBorderColor)}
            />
            <demo-select-enum
              value={lineStyle}
              labelHint="lineStyle"
              enumValues={["solid", "dashed", "dotted"]}
              onvalueChanged={(event: JetElementCustomEvent<LegendLineStyle>) => setLineStyle(event.detail.value)}
            />
            <oj-input-number labelHint="lineWidth" value={lineWidth} onvalueChanged={handleNumberChanged(setLineWidth)} />
            <oj-input-text
              labelHint="markerColor"
              value={markerColor}
              onvalueChanged={handleTextChanged(setMarkerColor)}
            />
            <demo-select-enum
              value={markerShape}
              labelHint="markerShape"
              enumValues={["square", "circle", "diamond", "plus", "triangleDown", "triangleUp", "human", "star", "rectangle", "ellipse"]}
              onvalueChanged={(event: JetElementCustomEvent<LegendMarkerShape>) => setMarkerShape(event.detail.value)}
            />
            <demo-select-enum
              value={symbolType}
              labelHint="symbolType"
              enumValues={["line", "lineWithMarker", "marker"]}
              onvalueChanged={(event: JetElementCustomEvent<LegendSymbolType>) => setSymbolType(event.detail.value)}
            />
            <oj-input-number
              labelHint="legendSymbolWidth"
              value={legendSymbolWidth}
              onvalueChanged={handleNumberChanged(setLegendSymbolWidth)}
            />
            <oj-input-number
              labelHint="legendSymbolHeight"
              value={legendSymbolHeight}
              onvalueChanged={handleNumberChanged(setLegendSymbolHeight)}
            />
          </oj-form-layout>
        </div>

        <div>
          <div class="oj-sm-padding-1x">
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Items Attributes - Item 5</div>
          </div>
          <oj-form-layout aria-controls="legend1" maxColumns={2}>
            <oj-input-text
              labelHint="sectionTitle"
              value={sectionTitle}
              onvalueChanged={handleTextChanged(setSectionTitle)}
            />
            <demo-input-json
              labelHint="sectionTitleStyle"
              value={sectionTitleStyle}
              onvalueChanged={(event: JetElementCustomEvent<StyleRecord>) => setSectionTitleStyle(event.detail.value)}
            />
            <demo-select-enum
              labelHint="sectionTitleAlign"
              value={sectionTitleAlign}
              enumValues={["start", "center", "end"]}
              onvalueChanged={(event: JetElementCustomEvent<SectionTitleAlign>) => setSectionTitleAlign(event.detail.value)}
            />
            <demo-input-json
              labelHint="legendTextStyle"
              value={legendTextStyle}
              onvalueChanged={(event: JetElementCustomEvent<StyleRecord>) => setLegendTextStyle(event.detail.value)}
            />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default LegendStylescorepack;
