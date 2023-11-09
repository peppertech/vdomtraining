import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import "ojs/ojprogress-circle";

const ProgressCircle = () => {
	const [progressValue, setProgressValue] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgressValue((prevValue) => (prevValue >= 100 ? 0 : prevValue + 1));
		}, 30);

		return () => clearInterval(interval);
	}, []);

	return (
		<div id="progressCircleWrapper">
			{/* Indeterminate Progress Circle */}
			<oj-progress-circle size="sm" value={-1}></oj-progress-circle>

			{/* Determinate Progress Circle */}
			<oj-progress-circle size="sm" value={progressValue}></oj-progress-circle>
		</div>
	);
};

export default ProgressCircle;
