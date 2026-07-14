import "oj-c/progress-bar";
import 'preact';
import { JSX } from 'preact';
import { useEffect,useState } from "preact/hooks";

const MAX_VALUE = 100;

const ProgressBar = () => {
  const [value, setValue] = useState(30);
  const rowStyle: JSX.CSSProperties = { gap: "5px" };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((previous) => (previous >= MAX_VALUE ? 0 : previous + 5));
    }, 500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div id="progressbar-container" class="oj-sm-margin-2x-bottom">
      <h6>Determinate</h6>
      <oj-c-progress-bar id="progressBarDeterminate" max={MAX_VALUE} value={value}></oj-c-progress-bar>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top">
        Value updates every 500ms: <span aria-live="polite">{`${value}%`}</span>
      </p>

      <h6 class="oj-sm-margin-6x-top">Indeterminate</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-padding-2x">
        <oj-c-progress-bar id="progressBarIndeterminate" value={-1}></oj-c-progress-bar>
      </div>

      <h6 class="oj-sm-margin-6x-top">Sizes</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-flex-wrap-nowrap" style={rowStyle}>
        <oj-c-progress-bar id="progressBarSmall" max={MAX_VALUE} value={45}></oj-c-progress-bar>
        <oj-c-progress-bar id="progressBarMedium" max={MAX_VALUE} value={70}></oj-c-progress-bar>
        <oj-c-progress-bar id="progressBarLarge" max={MAX_VALUE} value={90}></oj-c-progress-bar>
      </div>
    </div>
  );
};

export default ProgressBar;
