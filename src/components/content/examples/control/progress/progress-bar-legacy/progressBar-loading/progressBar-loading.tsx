import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojprogress-bar';
import 'preact';
import { useEffect,useState } from 'preact/hooks';

export const ProgressBarLoading = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (progressValue >= 100) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setProgressValue((currentValue) => Math.min(currentValue + 1, 100));
    }, 30);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [progressValue]);

  const handleRestartAction = () => {
    setProgressValue(0);
  };

  const isComplete = progressValue === 100;
  const loadingText = isComplete ? 'Done!' : 'Loading...';

  return (
    <div id="demo-container">
      <oj-progress-bar
        id="progressBar"
        value={progressValue}
        aria-labelledby="status loadingRegion"
      />
      <div class="oj-sm-margin-4x-vertical" />
      <oj-label-value>
        <oj-label slot="label" label-id="status">
          Status
        </oj-label>
        <div
          slot="value"
          id="loadingRegion"
          aria-labelledby="status"
          aria-busy={isComplete ? undefined : 'true'}
          aria-describedby={isComplete ? undefined : 'progressBar'}
        >
          {loadingText}
        </div>
      </oj-label-value>
      <oj-button
        id="button1"
        onojAction={handleRestartAction}
        style={{ display: isComplete ? 'inline-flex' : 'none' }}
      >
        Restart
      </oj-button>
    </div>
  );
};

export default ProgressBarLoading;
