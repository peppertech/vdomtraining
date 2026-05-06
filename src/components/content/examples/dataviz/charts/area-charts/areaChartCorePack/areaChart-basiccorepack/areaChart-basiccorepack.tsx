import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import * as quarterDataText from "text!../../data/cookbook/dataVisualizations/chart/resources/quarterData.json";
import "oj-c/area-chart";
import "ojs/ojtoolbar";
import "../../../../../../../jet-composites/demo-chart-orientation-control/loader";
import "../../../../../../../jet-composites/demo-chart-stack-control/loader";

type AreaChartOrientation = NonNullable<ComponentProps<"oj-c-area-chart">["orientation"]>;
type AreaChartStack = NonNullable<ComponentProps<"oj-c-area-chart">["stack"]>;
type OrientationChangedEvent = {
  detail: { value: AreaChartOrientation }; 
};
type StackChangedEvent = {
  detail: { value: AreaChartStack }; 
};

type QuarterDatum = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

type AreaChartItemTemplateContext = {
  data: QuarterDatum;
};

const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];

export const AreaChartBasiccorepack = () => {
  const [stackValue, setStackValue] = useState<AreaChartStack>("off");
  const [orientationValue, setOrientationValue] = useState<AreaChartOrientation>("vertical");

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, QuarterDatum>(quarterData, { keyAttributes: "id" }),
    []
  );

  const handleOrientationChanged = (event: OrientationChangedEvent) => {
    const nextValue = event.detail.value;

    if (nextValue === "horizontal" || nextValue === "vertical") {
      setOrientationValue(nextValue);
    }
  };

  const handleStackChanged = (event: StackChangedEvent) => {
    const nextValue = event.detail.value;

    if (nextValue === "on" || nextValue === "off") {
      setStackValue(nextValue);
    }
  };

  const renderAreaChartItem = (item: AreaChartItemTemplateContext) => (
    <oj-c-area-chart-item
      value={item.data.value}
      groupId={[item.data.quarter]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="area-chart-container">
      <oj-c-area-chart
        id="areaChart"
        data={dataProvider}
        orientation={orientationValue}
        hoverBehavior="dim"
        stack={stackValue}
        aria-label="Area chart with four series over four quarters"
      >
        <template slot="itemTemplate" render={renderAreaChartItem} />
      </oj-c-area-chart>
      <oj-toolbar
        id="myToolbar"
        aria-label="Chart Display Options Toolbar"
        aria-controls="areaChart"
      >
        <demo-chart-orientation-control
          id="orientationControl"
          type="area"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          id="stackControl"
          type="area"
          focusManagement="none"
          stack={stackValue}
          onstackChanged={handleStackChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default AreaChartBasiccorepack;
