import 'ojs/ojtreemap';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregionShaped.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

export const TreemapShapedData = () => {
  const nodes = JSON.parse(jsonData) as DatavizChartDatum[];
  const treemapData = useMemo(() => new ArrayTreeDataProvider(nodes, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), [nodes]);

  return (
      <div id="treemap-container">
            <oj-treemap id="treemap1" animation-on-display="auto" animation-on-data-change="auto" data={treemapData} aria-label="Tree map where hierarchical data is represented across two dimensions by the size and color of nested rectangular nodes." />
        </div>
    );
};

export default TreemapShapedData;
