import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';

type ScatterChartDatum = {
  id: string;
  series: string;
  group: string;
  x: number;
  y: number;
};

type ScatterValues = Pick<ScatterChartDatum, 'x' | 'y'>;

export const ScatterChartAnimation = () => {
  const numSeriesRef = useRef(4);
  const numGroupsRef = useRef(3);
  const valueCacheRef = useRef<Record<string, ScatterValues>>({});

  const groupNames = useMemo(() => ['Group A', 'Group B', 'Group C', 'Group D'], []);

  const getValue = (id: string): ScatterValues => {
    const cachedValue = valueCacheRef.current[id];
    if (cachedValue != null) {
      return cachedValue;
    }

    const value = {
      x: Math.random() * 60,
      y: Math.random() * 60
    };
    valueCacheRef.current[id] = value;
    return value;
  };

  const getData = (): ScatterChartDatum[] => {
    const chartData: ScatterChartDatum[] = [];

    for (let seriesIndex = 0; seriesIndex < numSeriesRef.current; seriesIndex++) {
      for (let groupIndex = 0; groupIndex < numGroupsRef.current; groupIndex++) {
        const id = `${seriesIndex}-${groupIndex}`;
        const values = getValue(id);
        chartData.push({
          id,
          series: `Series ${seriesIndex + 1}`,
          group: groupNames[groupIndex],
          x: values.x,
          y: values.y
        });
      }
    }

    return chartData;
  };

  const [chartData, setChartData] = useState<ScatterChartDatum[]>(() => getData());
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(chartData, {
        keyAttributes: 'id'
      }),
    [chartData]
  );

  const updateButtonClick = () => {
    valueCacheRef.current = {};
    setChartData(getData());
  };

  const seriesButtonClick = () => {
    numSeriesRef.current = numSeriesRef.current <= 4 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
    setChartData(getData());
  };

  const groupButtonClick = () => {
    numGroupsRef.current = numGroupsRef.current <= 3 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
    setChartData(getData());
  };

  const itemTemplateRenderer = (item: any) => (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-toolbar chroming="outlined" aria-label="Button Controls Toolbar" aria-controls="scatterChart">
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

      <oj-chart
        id="scatterChart"
        type="scatter"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default ScatterChartAnimation;
