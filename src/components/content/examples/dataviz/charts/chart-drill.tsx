import { ComponentProps } from "preact";
import { useState, useEffect } from "preact/hooks";
import { ColorAttributeGroupHandler } from "ojs/ojattributegrouphandler";
import { ojButton } from "ojs/ojbutton";
import { ojChart } from "ojs/ojchart";
import "ojs/ojbutton";
import "ojs/ojchart";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as data from "text!./data/drillData.json";

type ChartItem = {
  id: number;
  series: string;
  value: number;
  quarter: string;
  group?: string;
  color?: string;
};

const dataProvider: MutableArrayDataProvider<ChartItem["id"], ChartItem> =
  new MutableArrayDataProvider([], {
    keyAttributes: "id",
  });

const colorHandler = new ColorAttributeGroupHandler();
const years = ["2012", "2013", "2014", "2015"];

const getYearlyItems = () => {
  const chartData = JSON.parse(data);
  const items = [];
  for (let i = 0; i < chartData.length; i += 4) {
    const year = years[i / 4];
    chartData[i].color = colorHandler.getValue(year);
    chartData[i].group = year;
    chartData[i].series = "Total Revenue";
    chartData[i].value =
      chartData[i].value +
      chartData[i + 1].value +
      chartData[i + 2].value +
      chartData[i + 3].value;
    items.push(chartData[i]);
  }
  dataProvider.data = items;
};

const getQuarterlyItems = (year: number): void => {
  const start = (year - 2012) * 4;
  const chartData = JSON.parse(data).slice(start, start + 4);
  for (let i = 0; i < chartData.length; i++) {
    chartData[i].color = colorHandler.getValue(year.toString());
    chartData[i].series = year;
  }

  dataProvider.data = chartData;
};

type ChartProps = ComponentProps<"oj-chart">;

const renderChartItem = (
  item: ojChart.ItemTemplateContext<ChartItem["id"], ChartItem>
) => {
  return (
    <oj-chart-item
      groupId={[item.data.group || item.data.quarter]}
      seriesId={item.data.series}
      color={item.data.color}
      value={item.data.value}
    ></oj-chart-item>
  );
};

export const DrillChart = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [drillingValue, setDrillingValue] = useState<
    "groupsOnly" | "on" | "seriesOnly" | "off" | undefined
  >("groupsOnly");
  const [titleValue, setTitleValue] = useState<string>("Annual");
  const [tickLabelStyle, setTickLabelStyle] = useState<object>({
    textDecoration: "underline",
    color: "#045fab",
  });

  const xaxisConfig: ChartProps["xAxis"] = {
    tickLabel: {
      rotation: "auto",
      rendered: "on",
      style: tickLabelStyle,
    },
  };

  useEffect(() => {
    getYearlyItems();
  }, []);

  const drillUpButtonClick = (event: ojButton.ojAction) => {
    getYearlyItems();
    setDrillingValue("groupsOnly");
    setTitleValue("Annual");
    setTickLabelStyle({ textDecoration: "underline", color: "#045fab" });
    setIsDisabled(true);
  };
  const chartDrillAction = (
    event: ojChart.ojGroupDrill<ChartItem["id"], ChartItem, null>
  ) => {
    getQuarterlyItems(Number(event.detail.group));
    setDrillingValue("off");
    setTitleValue(event.detail.group as string);
    setTickLabelStyle({});
    setIsDisabled(false);
  };

  return (
    <div class="oj-md-margin-4x-horizontal">
      <div id="chart-container">
        <div class="oj-typography-heading-xs">{titleValue} Revenue</div>
        <oj-toolbar aria-controls="barChart">
          {!isDisabled && (
            <oj-button
              id="drillUpButton"
              onojAction={drillUpButtonClick}
              chroming="outlined"
            >
              Return
            </oj-button>
          )}
        </oj-toolbar>

        <oj-chart
          id="barChart"
          type="bar"
          orientation="vertical"
          data={dataProvider}
          drilling={drillingValue}
          xAxis={xaxisConfig}
          onojGroupDrill={chartDrillAction}
          legend={{ rendered: "off" }}
        >
          <template slot="itemTemplate" render={renderChartItem}></template>
        </oj-chart>
      </div>
    </div>
  );
};
