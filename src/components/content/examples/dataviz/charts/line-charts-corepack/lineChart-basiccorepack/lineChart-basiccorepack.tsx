import "oj-c/line-chart";
import { JetElementCustomEvent } from "ojs/index";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import * as quarterDataText from "text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json";
import "../../../../../../jet-composites/demo-chart-orientation-control/loader";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type LineChartOrientation = NonNullable<ComponentProps<"oj-c-line-chart">["orientation"]>;

type QuarterDatum = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

type LineChartItemTemplateContext = {
  data: QuarterDatum;
};

const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];

export const LineChartBasiccorepack = () => {
  const [orientationValue, setOrientationValue] = useState<LineChartOrientation>("vertical");

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, QuarterDatum>(quarterData, { keyAttributes: "id" }),
    []
  );

  const handleOrientationChanged = (
    event: JetElementCustomEvent<LineChartOrientation>,
  ) => {
    const nextValue = event.detail.value;

    if (nextValue === "horizontal" || nextValue === "vertical") {
      setOrientationValue(nextValue);
    }
  };

  const renderLineChartItem = (item: LineChartItemTemplateContext) => (
    <oj-c-line-chart-item
      value={item.data.value}
      groupId={[item.data.quarter]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="line-chart-container">
      <oj-c-line-chart
        id="lineChart"
        data={dataProvider}
        orientation={orientationValue}
        hoverBehavior="dim"
        aria-label="Line chart with four series over four quarters"
      >
        <template slot="itemTemplate" render={renderLineChartItem} />
      </oj-c-line-chart>
      <demo-chart-orientation-control
        type="line"
        focusManagement="none"
        orientation={orientationValue}
        onorientationChanged={handleOrientationChanged}
        aria-controls="lineChart"
      />
    </div>
  );
};

export default LineChartBasiccorepack;
