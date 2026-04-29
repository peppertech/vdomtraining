// @ts-nocheck
import { useMemo } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "oj-c/picto-chart";

type PictoDatum = {
  name: string;
  count: number;
};

type PictoChartItemTemplateContext = {
  data: PictoDatum;
  index: number;
};

const pictoData: PictoDatum[] = [
  { name: "Have Sleep Problems", count: 7 },
  { name: "Sleep Well", count: 3 }
];

const renderPictoChartItem = (item: PictoChartItemTemplateContext) => (
  <oj-c-picto-chart-item
    name={item.data.name}
    shape="human"
    count={String(item.data.count)}
    color={item.index === 0 ? "#ed6647" : undefined}
  />
);

export const PictoChartBasiccorepack = () => {
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, PictoDatum>(pictoData, { keyAttributes: "name" }),
    []
  );

  return (
    <div id="picto-container">
      <oj-c-picto-chart id="pictochart1" data={dataProvider} aria-label="Basic Picto Chart" columnCount={5}>
        <template slot="itemTemplate" render={renderPictoChartItem} />
      </oj-c-picto-chart>
      <div>
        <b>7 out of 10 college students</b>
      </div>
      <div>
        <b>have sleep problems.</b>
      </div>
    </div>
  );
};

export default PictoChartBasiccorepack;
