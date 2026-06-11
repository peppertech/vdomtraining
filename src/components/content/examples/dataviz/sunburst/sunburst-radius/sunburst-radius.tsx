import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityData.json';
import 'ojs/ojsunburst';

type RadiusNode = {
  id: string;
  label: string;
  value: number;
};

const data = JSON.parse(jsonDataText as string) as RadiusNode[];

export const SunburstRadius = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(data, {
        keyAttributes: 'id'
      }),
    []
  );

  const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  const getShortDesc = (label: string, value: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Radius: ${value}`;

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-sunburst-node
      value={1}
      label={$current.data.label}
      radius={$current.data.value}
      color={getColor()}
      shortDesc={getShortDesc($current.data.label, $current.data.value)}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        animationOnDisplay="auto"
        data={sunburstData}
        selectionMode="single"
        {...({ 'nodeDefaults.labelDisplay': 'rotated' } as DatavizSunburstProps)}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstRadius;
