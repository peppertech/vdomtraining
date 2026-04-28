import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';

type PyramidChartDatum = {
  id: number;
  series: string;
  group: string;
  value: number;
};

const INITIAL_SERIES_COUNT = 5;

export const PyramidChartAnimation = () => {
  const numSeriesRef = useRef<number>(INITIAL_SERIES_COUNT);
  const valueCacheRef = useRef<Record<number, number>>({});

  const getValue = (id: number) => {
    const cachedValue = valueCacheRef.current[id];
    if (cachedValue != null) {
      return cachedValue;
    }

    const nextValue = 10 + Math.round(Math.random() * 50);
    valueCacheRef.current[id] = nextValue;
    return nextValue;
  };

  const getData = (): PyramidChartDatum[] => {
    const nextData: PyramidChartDatum[] = [];

    for (let i = 1; i <= numSeriesRef.current; i++) {
      nextData.push({
        id: i,
        series: `Series ${i}`,
        group: 'Group 1',
        value: getValue(i)
      });
    }

    return nextData;
  };

  const [chartData, setChartData] = useState<PyramidChartDatum[]>(() => getData());
  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PyramidChartDatum>(chartData, { keyAttributes: 'id' }),
    [chartData]
  );

  const updateButtonClick = () => {
    valueCacheRef.current = {};
    setChartData(getData());
  };

  const seriesButtonClick = () => {
    numSeriesRef.current =
      numSeriesRef.current <= INITIAL_SERIES_COUNT ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
    setChartData(getData());
  };

  const itemTemplateRenderer = (item: { data: PyramidChartDatum }) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-toolbar
        id="buttonToolbar"
        chroming="outlined"
        aria-controls="pyramidChart"
        aria-label="Pyramid Chart Controls Toolbar"
      >
        <oj-button onojAction={updateButtonClick}>Update Values</oj-button>
        <oj-button onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
      </oj-toolbar>

      <oj-chart
        id="pyramidChart"
        type="pyramid"
        hideAndShowBehavior="withRescale"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PyramidChartAnimation;
