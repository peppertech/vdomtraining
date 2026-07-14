import 'css!./demo.css';
import 'ojs/ojchart';
import 'ojs/ojthematicmap';
import { ojThematicMap } from 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/electionData2000.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ElectionDatum = {
  State: string;
  Democrat: number;
  Republican: number;
};

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const electionData = (JSON.parse(jsonDataText as string) as ElectionDatum[]).filter(
  (_value: unknown, index: number) => index % 2 === 0
);

export const ThematicMapTooltip = () => {
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'Name',
        shortLabel: 'CC3',
        longLabel: 'Name'
      }
    }),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(electionData, {
        keyAttributes: 'State'
      }),
    []
  );
  const tooltipElem = useMemo(() => {
    const element = document.createElement('div');
    const textDiv = document.createElement('div');
    const labelText = document.createElement('span');
    const valueText = document.createElement('span');
    const pieChart = document.createElement('oj-chart') as HTMLElement & {
      data: ComponentProps<'oj-chart'>['data'];
    };

    textDiv.style.cssFloat = 'left';
    textDiv.style.padding = '10px 8px 10px 3px';
    labelText.style.fontWeight = 'bold';
    labelText.style.color = '#606060';
    valueText.style.fontStyle = 'italic';
    pieChart.style.width = '50px';
    pieChart.style.height = '50px';
    pieChart.style.cssFloat = 'right';
    pieChart.setAttribute('data-oj-binding-provider', 'none');
    pieChart.setAttribute('type', 'pie');
    pieChart.setAttribute('style-defaults.data-label-position', '["none"]');
    pieChart.setAttribute('legend.rendered', 'off');

    textDiv.appendChild(labelText);
    textDiv.appendChild(document.createElement('br'));
    textDiv.appendChild(valueText);
    element.appendChild(textDiv);
    element.appendChild(pieChart);

    return element;
  }, []);

  const tooltipFunction = (
    dataContext: ojThematicMap.TooltipContext<
      ElectionDatum['State'],
      null,
      null,
      ElectionDatum,
      null,
      null
    >
  ) => {
    if (dataContext.id == null || dataContext.itemData == null) {
      return { insert: `No results for ${dataContext.locationName}` };
    }

    const dem = dataContext.itemData.Democrat;
    const rep = dataContext.itemData.Republican;
    const electoralVotes = dem + rep;
    const val = 0.625 + 0.125 * Math.sin(electoralVotes);
    const pieChart = tooltipElem.children[1] as HTMLElement & {
      data: ComponentProps<'oj-chart'>['data'];
    };
    const textDiv = tooltipElem.children[0];

    textDiv.children[0].textContent = dataContext.locationName;
    textDiv.children[2].textContent = `${electoralVotes} Electoral Votes`;
    pieChart.data = new ArrayDataProvider(
      [
        {
          seriesId: 'Democrat',
          groupId: [''],
          value: dem > rep ? val : 1 - val,
          color: '#336791'
        },
        {
          seriesId: 'Republican',
          groupId: [''],
          value: dem > rep ? 1 - val : val,
          color: '#C53333'
        }
      ],
      {
        keyAttributes: '@index'
      }
    );

    return { insert: tooltipElem };
  };

  const areaTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    const isDemocratWin = $current.data.Democrat > $current.data.Republican;
    return (
      <oj-thematic-map-area
        location={$current.data.State}
        color={isDemocratWin ? '#336791' : '#C53333'}
        shortDesc={`${isDemocratWin ? 'Democrat' : 'Republican'} win`}
      />
    );
  };

  const thematicMapProps: Partial<ComponentProps<'oj-thematic-map'>> = {
    tooltip: { renderer: tooltipFunction }
  };

  return (
    <oj-thematic-map
      id="map1"
      animationOnDisplay="auto"
      mapProvider={mapProvider}
      areaData={dataProvider}
      class="demo-thematicmap-min-width"
      {...thematicMapProps}
    >
      <template slot="areaTemplate" render={areaTemplateRenderer} />
    </oj-thematic-map>
  );
};

export default ThematicMapTooltip;
