import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
  import 'ojs/ojprogress-circle';

const MAX_VALUE = 100;

const LegacyProgressCircle = () => {
  const [value, setValue] = useState(20);
  const rowStyle: JSX.CSSProperties = { gap: "5px" };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((previous) => (previous >= MAX_VALUE ? 0 : previous + 5));
    }, 700);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div id="legacy-progresscircle-container" class="oj-sm-margin-2x-bottom">
      <h6>Determinate (Legacy)</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-flex-wrap-wrap" style={rowStyle}>
        <oj-progress-circle
          id="legacyProgressCircleDeterminateSm"
          size="sm"
          value={value}
        ></oj-progress-circle>
        <oj-progress-circle
          id="legacyProgressCircleDeterminateMd"
          size="md"
          value={value}
        ></oj-progress-circle>
        <oj-progress-circle
          id="legacyProgressCircleDeterminateLg"
          size="lg"
          value={value}
        ></oj-progress-circle>
      </div>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top" aria-live="polite">
        {`${value}% complete`}
      </p>

      <h6 class="oj-sm-margin-6x-top">Indeterminate</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={rowStyle}>
        <oj-progress-circle
          id="legacyProgressCircleIndeterminateSm"
          size="sm"
          value={-1}
        ></oj-progress-circle>
        <oj-progress-circle
          id="legacyProgressCircleIndeterminateMd"
          size="md"
          value={-1}
        ></oj-progress-circle>
        <oj-progress-circle
          id="legacyProgressCircleIndeterminateLg"
          size="lg"
          value={-1}
        ></oj-progress-circle>
      </div>
    </div>
  );
};

export default LegacyProgressCircle;
