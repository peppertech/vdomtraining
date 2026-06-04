import { h } from 'preact';
import "css!./demo.css";

const colorPanels = [
  'oj-bg-neutral-30',
  'oj-bg-brand-30',
  'oj-bg-danger-30',
  'oj-bg-warning-30',
  'oj-bg-info-30',
  'oj-bg-success-30'
];

export const PanelPanelcolors = () => {
  return (
    <div id="panelPage">
      <p>Note: more color classes available.</p>
      {colorPanels.map((panelClass) => (
        <div class={`oj-panel ${panelClass} oj-sm-margin-4x demo-mypanel`}>
          <code>{panelClass}</code>
        </div>
      ))}
    </div>
  );
};

export default PanelPanelcolors;
