import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojformlayout';
import 'ojs/ojlegend';
import type { ojLegend } from 'ojs/ojlegend';
import type { JSX } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type FruitItem = {
  fruit: string;
};

type Orientation = 'vertical' | 'horizontal';
type HorizontalAlign = 'center' | 'end' | 'start';
type VerticalAlign = 'middle' | 'bottom' | 'top';
type DemoRadiosetValueChangeEvent<T extends string> = {
  detail: {
    value: T;
  };
};

const fruits: FruitItem[] = [
  { fruit: 'Blueberries' },
  { fruit: 'Kiwis' },
  { fruit: 'Bananas' },
  { fruit: 'Apples' },
  { fruit: 'Grapes' }
];

const colorHandler = new ColorAttributeGroupHandler();

export const LegendLayout = (): JSX.Element => {
  const [legendOrientation, setLegendOrientation] = useState<Orientation>('vertical');
  const [horizAlign, setHorizAlign] = useState<HorizontalAlign>('center');
  const [vertAlign, setVertAlign] = useState<VerticalAlign>('middle');
  const preferredLegendRef = useRef<ojLegend<string, FruitItem> | null>(null);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<string, FruitItem>(fruits, {
        keyAttributes: 'fruit'
      }),
    []
  );

  const itemTemplateRenderer = ($current: { data: FruitItem }): JSX.Element => (
    <oj-legend-item
      shortDesc={$current.data.fruit}
      text={$current.data.fruit}
      color={colorHandler.getValue($current.data.fruit)}
    />
  );

  useEffect(() => {
    const legend = preferredLegendRef.current;
    if (!legend) {
      return;
    }
    const dims = legend.getPreferredSize(500, 300);
    if (!dims) {
      return;
    }
    legend.style.width = `${dims.width}px`;
    legend.style.height = `${dims.height}px`;
  }, [legendOrientation]);

  return (
    <div id="demo-container">
      <oj-form-layout aria-controls="legend1">
        <demo-radioset-enum
          labelHint="Orientation"
          direction="row"
          value={legendOrientation}
          onvalueChanged={(event: DemoRadiosetValueChangeEvent<Orientation>) =>
            setLegendOrientation(event.detail.value)
          }
          enumValues={["vertical", "horizontal"]}
        />
        <demo-radioset-enum
          labelHint="hAlign"
          direction="row"
          value={horizAlign}
          onvalueChanged={(event: DemoRadiosetValueChangeEvent<HorizontalAlign>) =>
            setHorizAlign(event.detail.value)
          }
          enumValues={["center", "end", "start"]}
        />
        <demo-radioset-enum
          labelHint="vAlign"
          direction="row"
          value={vertAlign}
          onvalueChanged={(event: DemoRadiosetValueChangeEvent<VerticalAlign>) =>
            setVertAlign(event.detail.value)
          }
          enumValues={["middle", "bottom", "top"]}
        />
      </oj-form-layout>

      <div id="legend-container">
        <oj-legend
          id="legend1"
          orientation={legendOrientation}
          data={dataProvider}
          valign={vertAlign}
          halign={horizAlign}
          class="oj-bg-neutral-30"
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-legend>
      </div>

      <div id="legend-container2">
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">getPreferredSize:</div>
        </div>
        <oj-legend
          id="legend2"
          ref={preferredLegendRef}
          orientation={legendOrientation}
          data={dataProvider}
          class="oj-bg-neutral-30"
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-legend>
      </div>
    </div>
  );
};

export default LegendLayout;
