import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartItem = {
  id: string;
  series: string;
  group: string;
  value: number;
};

const groupNames = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', 'Group G'];

export const PolarChartAnimation = () => {
  const [numSeries, setNumSeries] = useState(2);
  const [numGroups, setNumGroups] = useState(6);
  const [valueCache, setValueCache] = useState<Record<string, number>>({});

  const getValue = (id: string, cache: Record<string, number>) => {
    const cached = cache[id];
    if (cached != null) {
      return cached;
    }

    return 10 + Math.round(Math.random() * 50);
  };

  const getData = (seriesCount: number, groupCount: number, cache: Record<string, number>): ChartItem[] => {
    const data: ChartItem[] = [];

    for (let i = 0; i < seriesCount; i++) {
      for (let j = 0; j < groupCount; j++) {
        const id = `${i}-${j}`;
        data.push({
          id,
          series: `Series ${i + 1}`,
          group: groupNames[j],
          value: getValue(id, cache)
        });
      }
    }

    return data;
  };

  const data = useMemo(() => getData(numSeries, numGroups, valueCache), [numSeries, numGroups, valueCache]);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, ChartItem>(data, { keyAttributes: 'id' }),
    [data]
  );

  const updateButtonClick = () => {
    setValueCache({});
  };

  const seriesButtonClick = () => {
    setNumSeries((count) => (count <= 2 ? count + 1 : count - 1));
  };

  const groupButtonClick = () => {
    setNumGroups((count) => (count <= 6 ? count + 1 : count - 1));
  };

  const itemTemplateRenderer = (item: { data: ChartItem }) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[item.data.group]}
        seriesId={item.data.series}
      />
    );
  };

  return (
    <div id="chart-container">
      <oj-toolbar
        chroming="outlined"
        aria-label="Buttons Control Toolbar"
        aria-controls="polarChart1 polarChart2"
      >
        <oj-button id="button1" onojAction={updateButtonClick}>
          Update values
        </oj-button>
        <oj-button id="button2" onojAction={seriesButtonClick}>
          Add/Remove Series
        </oj-button>
        <oj-button id="button3" onojAction={groupButtonClick}>
          Add/Remove Group
        </oj-button>
      </oj-toolbar>
      <div class="oj-flex">
        <oj-chart
          class="oj-flex-item oj-sm-12 oj-md-6"
          id="polarChart1"
          type="bar"
          coordinateSystem="polar"
          stack="on"
          data={dataProvider}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-chart>

        <oj-chart
          class="oj-flex-item oj-sm-12 oj-md-6"
          id="polarChart2"
          type="line"
          coordinateSystem="polar"
          polarGridShape="polygon"
          data={dataProvider}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-chart>
      </div>
    </div>
  );
};

export default PolarChartAnimation;
