import { h } from "preact";
import "ojs/ojlegend";
import { ojLegend } from "ojs/ojlegend";
import { ColorAttributeGroupHandler } from "ojs/ojattributegrouphandler";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type LegendItem = {
  fruit: string;
};

const fruits = [
  { fruit: "Blueberries" },
  { fruit: "Kiwis" },
  { fruit: "Bananas" },
  { fruit: "Apples" },
  { fruit: "Grapes" },
];
const dataProvider: MutableArrayDataProvider<
  LegendItem["fruit"],
  LegendItem
> = new MutableArrayDataProvider(fruits, {
  keyAttributes: "fruit",
});

const colorHandler = new ColorAttributeGroupHandler();
const getColor = (item: string) => {
  return colorHandler.getValue(item);
};

// should be using type of :ojLegend.ItemTemplateContext<LegendItem["fruit"],LegendItem>
// waiting on bug fix JET-46038
const renderLegendItem = (item:ojLegend.ItemTemplateContext<LegendItem["fruit"],LegendItem>) => {
  if (item) {
    return (
      <oj-legend-item
        text={item.data.fruit}
        color={getColor(item.data.fruit)}></oj-legend-item>
    );
  }
};

const Legend = () => {
  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-legend
        id="legend1"
        orientation="vertical"
        data={dataProvider}
        symbolHeight={20}
        symbolWidth={20}>
        <template slot="itemTemplate" render={renderLegendItem} />
      </oj-legend>
    </div>
  );
};
export default Legend;
