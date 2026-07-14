import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojsunburst';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import DemoDelayingTreeDataProvider from '../streamList-streamlist/DemoDelayingTreeDataProvider';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type ProgressiveNode = {
  label: string;
  value: number;
  nodes?: ProgressiveNode[];
};

const nodes = JSON.parse(jsonDataText as string) as ProgressiveNode[];

export const SunburstProgressiveLoading = () => {
  const [delay, setDelay] = useState<number>(2000);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const getDataProvider = (currentDelay: number) =>
    new DemoDelayingTreeDataProvider(
      new ArrayTreeDataProvider(nodes, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
      currentDelay / 2,
      0
    );

  const [dataProvider, setDataProvider] = useState(() => getDataProvider(2000));

  const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-sunburst-node
      label={$current.data.label}
      value={$current.data.value}
      color={getColor()}
      shortDesc={`${$current.data.label}:${$current.data.value}`}
    />
  );

  return (
    <div id="container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout maxColumns={2} aria-controls="sunburst">
          <oj-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            onvalueChanged={(event: DatavizValueChangedEvent<number | null>) => setDelay(event.detail.value ?? 0)}
            value={delay}
            labelHint="Fetch delay (ms)"
          />
          <oj-button class="oj-button-lg" onojAction={() => setDataProvider(getDataProvider(delay))}>
            Apply
          </oj-button>
        </oj-form-layout>
      </div>
      <oj-sunburst id="sunburst" aria-label="States and cities" data={dataProvider}>
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstProgressiveLoading;
