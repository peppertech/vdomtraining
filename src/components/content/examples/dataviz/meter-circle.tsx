import { h } from "preact";
import { getUniqueId } from "ojs/ojvcomponent";
import "ojs/ojknockout";
import "ojs/ojlabel";
import "ojs/ojchart";
import "oj-c/meter-circle";
import { CMeterCircleElement } from "oj-c/meter-circle";
// import { colorGreen, colorRed, colorYellow, OKVMetricsData } from "../data_providers/okv-data-types";
// import { NLS } from "../../../../NLSSources";

type Props = Readonly<{
  // nls: NLS;
  metricName: string;
  // item: OKVMetricsData;
  cpuCores: number;
}>;

const isNotCPUChart = (props: Props) => {
  const labelId = "label" + getUniqueId();
  const valueId = "value" + getUniqueId();
  return (
    <div class="row" style="justify-content: center">
      <div class="utilization-label-container">
        {
          props.metricName !== "CPU Utilization" ? [
            <oj-label id={labelId} for={valueId} class="oj-label-inline">
              {"usedLabel"}
            </oj-label>,
            <div id={valueId} aria-labelledby={labelId} class="oj-label-inline">
              {20}{'ea'} / {45}{'pack'}
            </div>
          ] : [
            <oj-label id={labelId} for={valueId} class="oj-label-inline">
              {"noCpuCoresLabel"}
            </oj-label>,
            <div id={valueId} aria-labelledby={labelId} class="oj-label-inline">
              {props.cpuCores}
            </div>
          ]
        }
      </div>
    </div>
  );
}

const MeterCircle = (props: Props) => {
  const thresholds = [
    { color: 'green', max: 30 },
    { color: 'yellow', max: 60 },
    { color: 'red', max: 100 }
  ];

  const referenceLines = [
    { value: 30, color: 'yellow' },
    { value: 60, color: 'red' },
  ];


  const meterCircleCenterTemplate = (item: CMeterCircleElement.CenterTemplateContext) => {
    return (
      <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center oj-sm-justify-content-center" style="padding-top:25%">
        <div class="oj-flex-item oj-typography-subheading-md oj-typography-bold">
          {item.value}
        </div>
        <div class="oj-flex-item oj-typography-body-xs oj-text-color-secondary">Sales in USD</div>
      </div>
    )
  }

  return (
    <div>
      <div class="headerItems--title">
        <h3>{'props.item.title'}</h3>
      </div>
      <div class="meter-circle-div oj-sm-margin-2x-top">
        <oj-c-meter-circle

          class="meter-circle-chart"
          size="fit"
          style="width:300px;height:300px;"
          value={42}
          min={0}
          max={100}
          readonly={true}
          startAngle={180}
          angleExtent={180}
          thresholds={thresholds}
          referenceLines={referenceLines}
          datatip={(context) => `${props.metricName} ${context.value}%`}
          aria-label={`${props.metricName} 42%`}
        >
          <template slot="centerTemplate" render={meterCircleCenterTemplate}>
          </template>
        </oj-c-meter-circle>
        {props.metricName && isNotCPUChart(props)}
      </div>
    </div>
  );
};

export default MeterCircle;