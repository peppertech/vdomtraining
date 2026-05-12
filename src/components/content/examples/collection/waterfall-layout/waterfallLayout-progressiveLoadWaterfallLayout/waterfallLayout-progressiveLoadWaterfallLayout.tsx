import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import DemoDelayingDataProvider from '../../shared/DemoDelayingDataProvider';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojwaterfalllayout';
import '../../../../../jet-composites/demo-dept-card-layout/loader';
import '../../../../../jet-composites/demo-profile-card-layout/loader';
import "css!./demo.css";

type InputNumberValue = ComponentProps<'oj-input-number'>['value'];
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

type WaterfallCardData = {
  type: 'people' | 'department';
  id: string;
  name: string;
  title?: string;
  work?: number;
  email?: string;
  initials?: string;
  head?: string;
  count?: string;
  image?: string;
};

type WaterfallItemTemplateContext = {
  data: WaterfallCardData;
  index: number;
  key: string;
};

const generateProgressiveData = (count: number) => {
  const data: WaterfallCardData[] = [];
  for (let index = 1; index <= count; index += 2) {
    data.push(
      { type: 'people', id: `p${index}`, name: `Employee ${index}`, title: `Title ${index}`, work: 1234567890, email: `employee${index}@company.com`, initials: `E${index}` },
      { type: 'department', id: `d${index}`, name: `Department ${index}`, head: `Employee ${index}`, count: '40 Employees' },
      { type: 'department', id: `d${index + 1}`, name: `Department ${index + 1}`, head: `Employee ${index + 1}` },
      { type: 'people', id: `p${index + 1}`, name: `Employee ${index + 1}`, title: `Title ${index + 1}`, work: 1234567890, email: `employee${index + 1}@company.com`, initials: `E${index + 1}` }
    );
  }
  return data;
};

const renderProgressiveWaterfallItem = (item: WaterfallItemTemplateContext) => {
  if (item.data.type === 'people') {
    return (
      <div class="oj-panel oj-sm-only-width-4/5">
        {h("demo-profile-card-layout", {
          name: item.data.name,
          initials: item.data.initials,
          image: item.data.image,
          workTitle: item.data.title
        })}
      </div>
    );
  }

  return (
    <div class="oj-panel oj-bg-warning-30 oj-sm-only-width-4/5">
      {h("demo-dept-card-layout", {
        deptName: item.data.name,
        deptCount: item.data.count,
        image: item.data.image,
        name: item.data.head
      })}
    </div>
  );
};

export const WaterfallLayoutProgressiveLoadWaterfallLayout = () => {
  const [delay, setDelay] = useState<InputNumberValue>(2000);
  const data = useMemo(() => generateProgressiveData(50), []);
  const createDataProvider = (nextDelay: number) =>
    new DemoDelayingDataProvider(
      new ArrayDataProvider<WaterfallCardData['id'], WaterfallCardData>(data, { keyAttributes: 'id' }),
      nextDelay
    );
  const [dataProvider, setDataProvider] = useState(() => createDataProvider(2000));

  const handleDelayChanged = (event: InputNumberValueChangedEvent) => {
    setDelay(event.detail.value ?? 0);
  };

  const handleApplyDelay = () => {
    setDataProvider(createDataProvider(delay ?? 0));
  };

  return (
    <div id="waterfall-container">
      <oj-form-layout maxColumns={2} direction="row">
        <oj-input-number
          id="fetch-delay-input"
          min={0}
          step={0}
          value={delay}
          onvalueChanged={handleDelayChanged}
          labelHint="Fetch delay (ms)"
        />
        <oj-button class="oj-button-lg" onojAction={handleApplyDelay}>
          Apply
        </oj-button>
      </oj-form-layout>

      <oj-waterfall-layout id="waterfall" aria-label="progressive loading" class="demo-waterfall" data={dataProvider}>
        <template slot="itemTemplate" render={renderProgressiveWaterfallItem} />
      </oj-waterfall-layout>
    </div>
  );
};

export default WaterfallLayoutProgressiveLoadWaterfallLayout;
