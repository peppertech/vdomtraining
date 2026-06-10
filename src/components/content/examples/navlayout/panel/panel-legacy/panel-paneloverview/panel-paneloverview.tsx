import { h } from 'preact';
import 'ojs/ojcollapsible';
import "css!./demo.css";

export const PanelPaneloverview = () => {
  return (
      <div id="panelPage">
            <p>
                    NOTE: All demos use class
                    <code>oj-panel</code>
                    in addition to any class name seen inside the panel.
                </p>
            <h6>basic</h6>
            <div class="oj-panel oj-sm-margin-4x demo-mypanel"><code>default</code></div>
            <div class="oj-panel oj-panel-border-radius-0 oj-sm-margin-4x demo-mypanel"><code>oj-panel-border-radius-0</code></div>
            <div class="oj-panel oj-panel-border-radius-0-top-start oj-sm-margin-4x demo-mypanel"><code>oj-panel-border-radius-0-top-start</code></div>
            <div class="oj-panel oj-panel-border-radius-0-top-end oj-sm-margin-4x demo-mypanel"><code>oj-panel-border-radius-0-top-end</code></div>
            <div class="oj-panel oj-panel-border-radius-0-bottom-start oj-sm-margin-4x demo-mypanel"><code>oj-panel-border-radius-0-bottom-start</code></div>
            <div class="oj-panel oj-panel-border-radius-0-bottom-end oj-sm-margin-4x demo-mypanel"><code>oj-panel-border-radius-0-bottom-end</code></div>
            <h6>adjust padding</h6>
            <p>Note: more padding classes available</p>
            <div class="oj-panel oj-sm-margin-4x demo-mypanel"><div class="oj-bg-neutral-30 demo-full-height">default</div></div>
            <div class="oj-panel oj-sm-padding-0 oj-sm-margin-4x demo-mypanel">
                    <div class="oj-bg-neutral-30 demo-full-height"><code>oj-sm-padding-0</code></div>
                </div>
            <div class="oj-panel oj-sm-padding-2x oj-sm-margin-4x demo-mypanel">
                    <div class="oj-bg-neutral-30 demo-full-height"><code>oj-sm-padding-2x</code></div>
                </div>
            <div class="oj-panel oj-sm-padding-4x oj-sm-margin-4x demo-mypanel">
                    <div class="oj-bg-neutral-30 demo-full-height"><code>oj-sm-padding-4x</code></div>
                </div>
            <div class="oj-panel oj-sm-padding-6x oj-sm-margin-4x demo-mypanel">
                    <div class="oj-bg-neutral-30 demo-full-height"><code>oj-sm-padding-6x</code></div>
                </div>
            <h6>colors</h6>
            <p>Note: more color classes available.</p>
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x demo-mypanel"><code>oj-bg-neutral-30</code></div>
            <div class="oj-panel oj-bg-brand-30 oj-sm-margin-4x demo-mypanel"><code>oj-bg-brand-30</code></div>
            <div class="oj-panel oj-bg-danger-30 oj-sm-margin-4x demo-mypanel"><code>oj-bg-danger-30</code></div>
            <div class="oj-panel oj-bg-warning-30 oj-sm-margin-4x demo-mypanel"><code>oj-bg-warning-30</code></div>
            <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x demo-mypanel"><code>oj-bg-info-30</code></div>
            <div class="oj-panel oj-bg-success-30 oj-sm-margin-4x demo-mypanel"><code>oj-bg-success-30</code></div>
            <hr />
            <h6>shadows</h6>
            <div class="oj-panel oj-panel-shadow-xs oj-sm-margin-4x demo-mypanel"><code>oj-panel-shadow-xs</code></div>
            <div class="oj-panel oj-panel-shadow-sm oj-sm-margin-4x demo-mypanel"><code>oj-panel-shadow-sm</code></div>
            <div class="oj-panel oj-panel-shadow-md oj-sm-margin-4x demo-mypanel"><code>oj-panel-shadow-md</code></div>
            <div class="oj-panel oj-panel-shadow-lg oj-sm-margin-4x demo-mypanel"><code>oj-panel-shadow-lg</code></div>
            <div class="oj-panel oj-panel-shadow-xl oj-sm-margin-4x demo-mypanel"><code>oj-panel-shadow-xl</code></div>
        </div>
    );
};

export default PanelPaneloverview;
