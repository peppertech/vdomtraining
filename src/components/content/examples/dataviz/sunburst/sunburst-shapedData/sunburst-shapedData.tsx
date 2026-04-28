import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojsunburst';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregionShaped.json';

const nodes = JSON.parse(jsonDataText as string);

export const SunburstShapedData = () => {
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodes, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        animationOnDisplay="auto"
        colorLabel="Median Household Income"
        sizeLabel="Population"
        data={sunburstData}
        aria-label="Sunburst showing hierarchical data in concentric rings"
        {...({ 'nodeDefaults.labelDisplay': 'rotated' } as any)}
      />
    </div>
  );
};

export default SunburstShapedData;
