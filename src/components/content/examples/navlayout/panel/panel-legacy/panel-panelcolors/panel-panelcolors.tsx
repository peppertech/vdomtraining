import { h } from 'preact';
import "css!./demo.css";

const lightColorRows = [
  ['oj-bg-body'],
  ['oj-bg-neutral-30', 'oj-bg-neutral-20', 'oj-bg-neutral-10', 'oj-bg-neutral-0'],
  ['oj-bg-brand-30', 'oj-bg-brand-20', 'oj-bg-brand-10'],
  ['oj-bg-danger-30', 'oj-bg-danger-20', 'oj-bg-danger-10'],
  ['oj-bg-warning-30', 'oj-bg-warning-20', 'oj-bg-warning-10'],
  ['oj-bg-success-30', 'oj-bg-success-20', 'oj-bg-success-10'],
  ['oj-bg-info-30', 'oj-bg-info-20', 'oj-bg-info-10']
];

const darkColorPanels = [
  'oj-bg-neutral-200',
  'oj-bg-neutral-190',
  'oj-bg-neutral-180',
  'oj-bg-neutral-170'
];

const renderPanel = (panelClass: string, isDark = false) => (
  <div
    key={panelClass}
    class={`${panelClass}${isDark ? ' oj-color-invert' : ''} oj-sm-margin-2x oj-panel demo-mypanel oj-typography-body-xs`}
  >
    <code>{panelClass}</code>
  </div>
);

export const PanelPanelcolors = () => {
  return (
    <div id="panel-container">
      <h2 class="oj-typography-heading-sm">Light colors</h2>
      {lightColorRows.map((colorRow) => (
        <div class="oj-flex" key={colorRow.join('-')}>
          {colorRow.map((panelClass) => renderPanel(panelClass))}
        </div>
      ))}
      <h2 class="oj-typography-heading-sm">Dark colors</h2>
      <div class="oj-flex">
        {darkColorPanels.map((panelClass) => renderPanel(panelClass, true))}
      </div>
    </div>
  );
};

export default PanelPanelcolors;
