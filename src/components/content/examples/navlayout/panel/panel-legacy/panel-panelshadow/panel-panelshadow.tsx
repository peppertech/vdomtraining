import "css!./demo.css";
import 'preact';

export const PanelPanelshadow = () => {
  return (
      <div id="panelPage" class="oj-sm-padding-10x-bottom">
            <div class="oj-flex">
                    <div class="oj-panel oj-sm-margin-4x demo-panel-customizations"><i>no shadow</i></div>
                    <div class="oj-panel oj-panel-shadow-xs oj-sm-margin-4x demo-panel-customizations"><code>oj-panel-shadow-xs</code></div>
                    <div class="oj-panel oj-panel-shadow-sm oj-sm-margin-4x demo-panel-customizations"><code>oj-panel-shadow-sm</code></div>
                    <div class="oj-panel oj-panel-shadow-md oj-sm-margin-4x demo-panel-customizations"><code>oj-panel-shadow-md</code></div>
                    <div class="oj-panel oj-panel-shadow-lg oj-sm-margin-4x demo-panel-customizations"><code>oj-panel-shadow-lg</code></div>
                    <div class="oj-panel oj-panel-shadow-xl oj-sm-margin-4x demo-panel-customizations"><code>oj-panel-shadow-xl</code></div>
                </div>
        </div>
    );
};

export default PanelPanelshadow;
