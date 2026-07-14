import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojformlayout';
import 'ojs/ojtreemap';
import { ojTreemap } from 'ojs/ojtreemap';
import 'preact';
import type { JSX } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!./revenueData.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type Year = '2013' | '2014' | '2015';
type Sector = {
  label: string;
  value: number;
};
type Quarter = {
  label: string;
  value: number;
  sectors: Sector[];
};
type RevenueData = Record<Year, Quarter[]>;
type NodeTemplateContext = ojTreemap.NodeTemplateContext<string, Sector>;

const revenueData = JSON.parse(jsonDataText as string) as RevenueData;
const handler = new ColorAttributeGroupHandler();

const getShortDesc = (label: string, quarter: string, value: number): string =>
  `&lt;b&gt;${label} (${quarter})&lt;/b&gt;&lt;br/&gt;Sales in Millions: ${value}`;

const getNodeTemplateRenderer =
  (quarterLabel: string) =>
  ($current: NodeTemplateContext): JSX.Element =>
    (
      <oj-treemap-node
        label={$current.data.label}
        value={$current.data.value}
        color={handler.getValue($current.data.label)}
        shortDesc={getShortDesc($current.data.label, quarterLabel, $current.data.value)}
      />
    );

export const TreemapSmallFormFactor = () => {
  const [year, setYear] = useState<Year>('2013');
  const quarters = revenueData[year];

  const quarterCards = useMemo(
    () =>
      quarters.map((quarter) => ({
        ...quarter,
        dataProvider: new ArrayTreeDataProvider(quarter.sectors, {
          keyAttributes: 'label'
        })
      })),
    [quarters]
  );

  const handleYearChanged = (event: JetElementCustomEvent<Year>): void => {
    setYear(event.detail.value);
  };

  return (
    <div id="treemap-container">
      <div class="oj-typography-heading-lg">
        Revenues for <span>{year}</span>
      </div>
      {quarterCards.map((quarter) => (
        <div key={quarter.label} class="oj-sm-margin-3x-bottom">
          <div class="oj-flex-bar">
            <div class="oj-flex-bar-start">
              <div class="oj-typography-body-lg oj-sm-margin-4x-end">{quarter.label}</div>
            </div>
            <div class="oj-flex-bar-middle">
              <oj-treemap
                id={`treemap${quarter.label}`}
                selectionMode="none"
                layout="sliceAndDiceHorizontal"
                data={quarter.dataProvider}
                class="oj-helper-inline-block demo-treemap-height"
              >
                <template slot="nodeTemplate" render={getNodeTemplateRenderer(quarter.label)} />
              </oj-treemap>
            </div>
          </div>
        </div>
      ))}
      <oj-form-layout aria-controls="treemapQ1 treemapQ2 treemapQ3 treemapQ4">
        <demo-radioset-enum
          onvalueChanged={handleYearChanged}
          value={year}
          enumValues={["2013", "2014", "2015"]}
          direction="row"
          labelHint="Year"
        />
      </oj-form-layout>
    </div>
  );
};

export default TreemapSmallFormFactor;
