import "css!./demo.css";
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojwaterfalllayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import Context = require('ojs/ojcontext');
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type InputNumberValue = ComponentProps<'oj-input-number'>['value'];
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

type PerformanceItem = {
  id: string;
  name: string;
};

type PerformanceTemplateContext = {
  data: PerformanceItem;
  index: number;
  key: string;
};

const generatePerformanceData = (count: number) => {
  const data: PerformanceItem[] = [];
  for (let index = 0; index < count; index += 1) {
    data.push({ id: `id${index}`, name: `Item ${index + 1}` });
  }
  return data;
};

const getPerformanceCardClass = (index: number) => {
  const classes = ['oj-bg-danger-30', 'oj-bg-warning-30', 'oj-bg-success-30', 'oj-bg-info-30'];
  return `oj-panel ${classes[index % 4]} demo-card${(index % 4) + 1}`;
};

const renderPerformanceItem = (item: PerformanceTemplateContext) => (
  <div class={getPerformanceCardClass(item.index)} aria-labelledby={item.data.id}>
    <div id={item.data.id} class="oj-sm-padding-2x">
      {item.data.name}
    </div>
  </div>
);

export const WaterfallLayoutPerformanceWaterfallLayout = () => {
  const waterfallRef = useRef<HTMLElement | null>(null);
  const [numItems, setNumItems] = useState<InputNumberValue>(1000);
  const [renderTime, setRenderTime] = useState(0);
  const [dataProvider, setDataProvider] = useState(
    () => new ArrayDataProvider<string, PerformanceItem>(generatePerformanceData(1000), { keyAttributes: 'id' })
  );

  useEffect(() => {
    const waterfall = waterfallRef.current;
    if (!waterfall) {
      return;
    }
    const start = Date.now();
    Context.getContext(waterfall).getBusyContext().whenReady().then(() => {
      setRenderTime(Date.now() - start);
    });
  }, [dataProvider]);

  const updateDataProvider = (count: number) => {
    setDataProvider(new ArrayDataProvider<string, PerformanceItem>(generatePerformanceData(count), { keyAttributes: 'id' }));
  };

  const handleNumItemsChanged = (event: InputNumberValueChangedEvent) => {
    const nextCount = event.detail.value ?? 1000;
    setNumItems(nextCount);
    updateDataProvider(nextCount);
  };

  const handleRerender = () => {
    updateDataProvider(numItems ?? 1000);
  };

  const scrollPolicyOptions = useMemo(() => ({ maxCount: 10000 }), []);

  return (
    <div id="waterfall-container">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-label for="inputnumber-id1">Number of Items</oj-label>
        <oj-input-number
          id="inputnumber-id1"
          onvalueChanged={handleNumItemsChanged}
          min={10}
          step={40}
          value={numItems}
        />
        <oj-label-value>
          <oj-label slot="label"></oj-label>
          <oj-button slot="value" id="updateButton" onojAction={handleRerender}>
            Re-Render
          </oj-button>
        </oj-label-value>
        <p>Time to render: {renderTime} ms</p>
      </oj-form-layout>
      <oj-waterfall-layout
        ref={waterfallRef}
        id="waterfall"
        aria-label="performance test for waterfall layout"
        class="demo-waterfall"
        data={dataProvider}
        scrollPolicyOptions={scrollPolicyOptions}
      >
        <template slot="itemTemplate" render={renderPerformanceItem} />
      </oj-waterfall-layout>
    </div>
  );
};

export default WaterfallLayoutPerformanceWaterfallLayout;
