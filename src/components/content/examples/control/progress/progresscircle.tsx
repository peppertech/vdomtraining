import "oj-c/progress-circle";
import 'preact';
import { JSX } from 'preact';
import { useEffect,useState } from "preact/hooks";

const MAX_VALUE = 100;

const ProgressCircle = () => {
  const [value, setValue] = useState(15);
  const rowStyle: JSX.CSSProperties = { gap: "5px" };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((previous) => (previous >= MAX_VALUE ? 0 : previous + 5));
    }, 600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div id="progresscircle-container" class="oj-sm-margin-2x-bottom">
      <h6>Determinate</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-flex-wrap-wrap" style={rowStyle}>
        <oj-c-progress-circle
          id="progressCircleDeterminateSm"
          size="sm"
          value={value}
        ></oj-c-progress-circle>
        <oj-c-progress-circle
          id="progressCircleDeterminateMd"
          size="md"
          value={value}
        ></oj-c-progress-circle>
        <oj-c-progress-circle
          id="progressCircleDeterminateLg"
          size="lg"
          value={value}
        ></oj-c-progress-circle>
      </div>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top" aria-live="polite">
        {`${value}% complete`}
      </p>

      <h6 class="oj-sm-margin-6x-top">Indeterminate</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={rowStyle}>
        <oj-c-progress-circle
          id="progressCircleIndeterminateSm"
          size="sm"
          value={-1}
        ></oj-c-progress-circle>
        <oj-c-progress-circle
          id="progressCircleIndeterminateMd"
          size="md"
          value={-1}
        ></oj-c-progress-circle>
        <oj-c-progress-circle
          id="progressCircleIndeterminateLg"
          size="lg"
          value={-1}
        ></oj-c-progress-circle>
      </div>
    </div>
  );
};

export default ProgressCircle;
