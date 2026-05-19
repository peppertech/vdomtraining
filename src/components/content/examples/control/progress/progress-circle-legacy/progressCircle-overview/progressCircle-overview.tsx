import { h } from 'preact';
import { useState } from 'preact/hooks';
import 'ojs/ojprogress-circle';

export const ProgressCircleOverview = () => {
  const [step] = useState(0);
  const progressValue = Math.min(step, 100);

  return (
    <div id="progressCircleWrapper">
      <table class="demo-table-width oj-helper-text-align-center demo-padding" role="presentation">
        <tbody>
          <tr>
            <th>Size</th>
            <th id="detLabel">Determinate</th>
            <th id="indetLabel">Indeterminate</th>
          </tr>
          <tr>
            <td id="smLabel">sm</td>
            <td>
              <oj-progress-circle aria-labelledby="detLabel smLabel" size="sm" value={progressValue} />
            </td>
            <td>
              <oj-progress-circle aria-labelledby="indetLabel smLabel" size="sm" value={-1} />
            </td>
          </tr>
          <tr>
            <td id="mdLabel">md (default)</td>
            <td>
              <oj-progress-circle aria-labelledby="detLabel mdLabel" size="md" value={progressValue} />
            </td>
            <td>
              <oj-progress-circle aria-labelledby="indetLabel mdLabel" size="md" value={-1} />
            </td>
          </tr>
          <tr>
            <td id="lgLabel">lg</td>
            <td>
              <oj-progress-circle aria-labelledby="detLabel lgLabel" size="lg" value={progressValue} />
            </td>
            <td>
              <oj-progress-circle aria-labelledby="indetLabel lgLabel" size="lg" value={-1} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProgressCircleOverview;
