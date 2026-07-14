import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

export const PieChartAnimation = () => {
  const numSeriesRef = useRef(5);
  const valueCacheRef = useRef<Record<number, number>>({});
  const [pieSliceExplode, setPieSliceExplode] = useState(0);

  const getValue = (id: number) => {
    let value = valueCacheRef.current[id];
    if (value != null) {
      return value;
    }
    value = 10 + Math.round(Math.random() * 50);
    valueCacheRef.current[id] = value;
    return value;
  };

  const getData = () => {
    const nextData = [];
    for (let i = 1; i < numSeriesRef.current + 1; i++) {
      nextData.push({
        id: i,
        series: `Series ${i}`,
        group: 'Group 1',
        value: getValue(i)
      });
    }
    return nextData;
  };

  const [chartData, setChartData] = useState(() => getData());
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, { keyAttributes: 'id' }), [chartData]);

  const updateButtonClick = () => {
    valueCacheRef.current = {};
    setChartData(getData());
  };

  const seriesButtonClick = () => {
    numSeriesRef.current = numSeriesRef.current <= 5 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
    setChartData(getData());
  };

  const explodeButtonClick = () => {
    setPieSliceExplode(1 - pieSliceExplode);
  };

  const renderItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const renderSeries = (series: DatavizSeriesTemplateContext) => (
    <oj-chart-series pieSliceExplode={series.id === 'Series 5' ? pieSliceExplode : 0} />
  );

  return (
    <div id="chart-container">
      <oj-toolbar chroming="outlined" aria-controls="pieChart">
        <oj-button onojAction={updateButtonClick}>Update values</oj-button>
        <oj-button onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
        <oj-button onojAction={explodeButtonClick}>Explode/UnExplode</oj-button>
      </oj-toolbar>
      <oj-chart id="pieChart" type="pie" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto">
        <template slot="itemTemplate" render={renderItem} />
        <template slot="seriesTemplate" render={renderSeries} />
      </oj-chart>
    </div>
  );
};

export default PieChartAnimation;
