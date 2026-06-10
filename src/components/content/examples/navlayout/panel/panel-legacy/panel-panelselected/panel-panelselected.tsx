import { h } from 'preact';
import "css!./demo.css";

export const PanelPanelselected = () => {
  return (
      <div id="panelPage">
            <div class="oj-panel oj-selected oj-sm-margin-2x demo-panel-customizations"><i>default</i></div>
            <hr />
            <div class="oj-flex">
                    <div class="oj-panel oj-selected oj-bg-neutral-0 oj-sm-margin-2x demo-panel-customizations">oj-bg-neutral-0</div>
                    <div class="oj-panel oj-selected oj-bg-neutral-10 oj-sm-margin-2x demo-panel-customizations">oj-bg-neutral-10</div>
                    <div class="oj-panel oj-selected oj-bg-neutral-20 oj-sm-margin-2x demo-panel-customizations">oj-bg-neutral-20</div>
                    <div class="oj-panel oj-selected oj-bg-neutral-30 oj-sm-margin-2x demo-panel-customizations">oj-bg-neutral-30</div>
                </div>
        </div>
    );
};

export default PanelPanelselected;
