import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface BubbleChartDatum {
    id: string;
    series: string;
    group: string;
    x: number;
    y: number;
    z: number;
}

type BubbleValues = Pick<BubbleChartDatum, 'x' | 'y' | 'z'>;
type ItemTemplateContext = {
    data: BubbleChartDatum;
};

export const BubbleChartAnimation = () => {
  const numSeriesRef = useRef<number>(4);
  const numGroupsRef = useRef<number>(3);
  const valueCacheRef = useRef<Record<string, BubbleValues>>({});

  const groupNames = useMemo(() => ['Group A', 'Group B', 'Group C', 'Group D'], []);

  const getValue = (id: string) => {
      let value = valueCacheRef.current[id];
      if (value != null)
          return value;
      else {
          let z = Math.random() * 5 + 1;
          value = { x: Math.random() * 60, y: Math.random() * 60, z: z };
          valueCacheRef.current[id] = value;
          return value;
      }
  };

  const getData = () => {
      const data: BubbleChartDatum[] = [];
      for (let i = 0; i < numSeriesRef.current; i++) {
          for (let j = 0; j < numGroupsRef.current; j++) {
              const id = `${i}-${j}`;
              const values = getValue(id);
              const item = {
                  id: id,
                  series: `Series ${i + 1}`,
                  group: groupNames[j],
                  x: values.x,
                  y: values.y,
                  z: values.z
              };
              data.push(item);
          }
      }
      return data;
  };

  const [chartData, setChartData] = useState<BubbleChartDatum[]>(getData());
  const dataProvider = useMemo(() => new ArrayDataProvider<BubbleChartDatum['id'], BubbleChartDatum>(chartData, {
      keyAttributes: 'id'
  }), [chartData]);

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

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
      return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-toolbar chroming="outlined" aria-controls="bubbleChart">
                    <oj-button onojAction={updateButtonClick}>Update values</oj-button>
                    <oj-button onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
                    <oj-button onojAction={groupButtonClick}>Add/Remove Group</oj-button>
                </oj-toolbar>
            <oj-chart id="bubbleChart" type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
        </div>
    );
};

export default BubbleChartAnimation;
