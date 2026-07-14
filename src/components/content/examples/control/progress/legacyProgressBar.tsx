import "ojs/ojprogressbar";
import 'preact';
import { JSX } from 'preact';
import { useEffect,useState } from "preact/hooks";

const MAX_VALUE = 100;

const LegacyProgressBar = () => {
  const [value, setValue] = useState(25);
  const rowStyle: JSX.CSSProperties = { gap: "5px" };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((previous) => (previous >= MAX_VALUE ? 0 : previous + 5));
    }, 600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div id="legacy-progressbar-container" class="oj-sm-margin-2x-bottom">
      <h6>Determinate (Legacy)</h6>
      <oj-progress-bar id="legacyProgressBarDeterminate" max={MAX_VALUE} value={value}></oj-progress-bar>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top">
        Value updates every 600ms: <span aria-live="polite">{`${value}%`}</span>
      </p>

      <h6 class="oj-sm-margin-6x-top">Indeterminate</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-padding-2x">
        <oj-progress-bar id="legacyProgressBarIndeterminate" value={-1}></oj-progress-bar>
      </div>

      <h6 class="oj-sm-margin-6x-top">Sizes</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-flex-wrap-nowrap" style={rowStyle}>
        <oj-progress-bar id="legacyProgressBarSmall" max={MAX_VALUE} value={40}></oj-progress-bar>
        <oj-progress-bar id="legacyProgressBarMedium" max={MAX_VALUE} value={65}></oj-progress-bar>
        <oj-progress-bar id="legacyProgressBarLarge" max={MAX_VALUE} value={90}></oj-progress-bar>
      </div>
    </div>
  );
};

export default LegacyProgressBar;
