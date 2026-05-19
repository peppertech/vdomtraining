import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import 'css!./demo.css';
import 'oj-c/progress-bar';

export const ProgressBarOverviewcorepack = () => {
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
      <oj-c-progress-bar
        aria-labelledby="indetLabel"
        class="progress-bar-corepack-width oj-sm-margin-4x-bottom"
        value={-1}
      />
      <oj-c-progress-bar value={-1} aria-label="Indeterminate progress bar" />

      <hr class="oj-sm-margin-4x-vertical" />

      <div id="detLabel" class="oj-sm-margin-1x-bottom">
        Determinate Progress Bar
      </div>
      <oj-c-progress-bar
        class="progress-bar-corepack-width oj-sm-margin-4x-bottom"
        id="progressBar"
        aria-labelledby="detLabel"
        value={progressValue}
      />
      <oj-c-progress-bar value={progressValue} aria-label="Determinate progress bar" />

      <hr class="oj-sm-margin-4x-vertical" />

      <div id="emIndeLabel" class="oj-sm-margin-1x-bottom">
        Embedded Indeterminate Progress Bar
      </div>
      <div class="oj-panel progress-bar-corepack-embedded-panel">
        <oj-c-progress-bar
          aria-labelledby="emIndeLabel"
          edge="top"
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
      <div class="oj-panel progress-bar-corepack-embedded-panel">
        <oj-c-progress-bar
          aria-labelledby="emDeLabel"
          edge="top"
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

export default ProgressBarOverviewcorepack;
