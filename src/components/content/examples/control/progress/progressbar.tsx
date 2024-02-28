import "preact";
import { useState, useEffect } from "preact/hooks";
import "ojs/ojprogress-bar";

const ProgressBar = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prevValue) => (prevValue >= 100 ? -1 : prevValue + 1));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="progressBarWrapper">
      {/* Indeterminate Progress Bar */}
      <oj-progress-bar
        class="oj-sm-margin-4x-bottom demo-width"
        value={-1}></oj-progress-bar>

      {/* Determinate Progress Bar */}
      <oj-progress-bar
        class="oj-sm-margin-4x-bottom demo-width"
        value={progressValue}></oj-progress-bar>
    </div>
  );
};

export default ProgressBar;
