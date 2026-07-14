import 'css!./demo.css';
import 'ojs/ojprogress-bar';
import 'preact';
import { useEffect,useState } from 'preact/hooks';

export const ProgressBarOverview = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setStep((currentStep) => (currentStep + 1) % 200);
    }, 30);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const progressValue = Math.min(step, 100);

  return (
    <div id="progressBarWrapper">
      <div id="indetLabel" class="oj-sm-margin-1x-bottom">
        Indeterminate Progress Bar
      </div>
      <oj-progress-bar
        aria-labelledby="indetLabel"
        class="oj-sm-margin-4x-bottom demo-width"
        value={-1}
      />
      <oj-progress-bar value={-1} />

      <hr class="oj-sm-margin-4x-vertical" />

      <div id="detLabel" class="oj-sm-margin-1x-bottom">
        Determinate Progress Bar
      </div>
      <oj-progress-bar
        class="oj-sm-margin-4x-bottom demo-width"
        id="progressBar"
        aria-labelledby="detLabel"
        value={progressValue}
      />
      <oj-progress-bar value={progressValue} />

      <hr class="oj-sm-margin-4x-vertical" />

      <div id="emIndeLabel" class="oj-sm-margin-1x-bottom">
        Embedded Indeterminate Progress Bar
      </div>
      <div class="oj-panel demo-panel-progress">
        <oj-progress-bar
          aria-labelledby="emIndeLabel"
          class="oj-progress-bar-embedded"
          value={-1}
        />
        <div class="oj-sm-padding-2x">
          <h3>Progress Panel</h3>
          <p>This panel includes a progress bar.</p>
        </div>
      </div>

      <hr class="oj-sm-margin-4x-vertical" />

      <div id="emDeLabel" class="oj-sm-margin-1x-bottom">
        Embedded Determinate Progress Bar
      </div>
      <div class="oj-panel demo-panel-progress">
        <oj-progress-bar
          aria-labelledby="emDeLabel"
          class="oj-progress-bar-embedded"
          value={progressValue}
        />
        <div class="oj-sm-padding-2x">
          <h3>Progress Panel</h3>
          <p>This panel includes a progress bar.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarOverview;
