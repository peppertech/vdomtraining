import "oj-c/button";
import "oj-c/popup";
import "oj-c/progress-circle";
import 'preact';
import { useEffect,useRef,useState } from "preact/hooks";

export const PopupUnstyledcorepack = () => {
  const [opened, setOpened] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [progressLabel, setProgressLabel] = useState("Loading Data");
  const [progressValue, setProgressValue] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const openListener = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setOpened(true);
    setButtonDisabled(true);
    setProgressLabel("Loading Data");
    setProgressValue(0);

    const totalIntervals = 50;
    let currentInterval = totalIntervals;

    intervalRef.current = window.setInterval(() => {
      setProgressValue(100 - (100 * currentInterval) / totalIntervals);

      if (currentInterval === 0) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        setProgressLabel("Data Loaded");
        timeoutRef.current = window.setTimeout(() => {
          setButtonDisabled(false);
          setOpened(false);
        }, 1000);
      }

      currentInterval -= 1;
    }, totalIntervals);
  };

  return (
    <div id="popupWrapper">
      <oj-c-popup
        role="tooltip"
        opened={opened}
        variant="unstyled"
        anchor="window"
        autoDismiss="none"
      >
        <oj-c-progress-circle
          size="lg"
          value={progressValue}
          aria-label="Progress indicator"
        />
        <br />
        <p>{progressLabel}</p>
      </oj-c-popup>
      <oj-c-button disabled={buttonDisabled} onojAction={openListener} label="Open" />
    </div>
  );
};

export default PopupUnstyledcorepack;
