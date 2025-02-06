import { ComponentProps } from "preact";
import "ojs/ojgauge";
import "oj-c/rating-gauge"
import {RatingGauge} from "oj-c/rating-gauge"

type RatingGaugeProps = ComponentProps<typeof RatingGauge>;

// const thresholdValues: Array<RatingGaugeProps["thresholds"]> = [
//   { max: 1, color: "danger", accessibleLabel: 'Poor' },
//   { max: 2, color: "danger", accessibleLabel: 'Needs Improvement' },
//   { max: 3, color: "warning", accessibleLabel: 'Satisfactory' },
//   { max: 4, color: "success", accessibleLabel: 'Exceeds Expectations' },
//   { max: 5, color: "success", accessibleLabel: 'Outstanding' }
// ];

const RatingGaugeComp = () => {
  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-rating-gauge
        size="lg"
        value={3}
        //thresholds={thresholdValues}
        aria-labelledby="large"
        labelledBy="thresholds"></oj-rating-gauge>
      <oj-c-rating-gauge
        size="lg"
        value={3}
        //thresholds={thresholdValues}
        labelledBy="large thresholds"></oj-c-rating-gauge>
    </div>
  );
};
export default RatingGaugeComp;
