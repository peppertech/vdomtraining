import { h } from 'preact';
import 'ojs/ojcollapsible';
import "css!./demo.css";

export const PanelPanelbasics = () => {
  return (
    <div id="panelPage">
      <div class="oj-flex">
        <div class="oj-panel oj-sm-margin-2x demo-mypanel">
          <h6>Header</h6>
          <p>Hello world!</p>
          How is it going out there?
        </div>
        <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-2x demo-mypanel">
          <p>Hello world!</p>
          It&apos;s going great in JET land.
        </div>
        <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-2x demo-mypanel">
          <oj-collapsible expanded data-oj-binding-provider="none">
            <h6 slot="header">Header</h6>
            <div>
              <p>I&apos;m a collapsible inside a panel</p>
              When you close the collapsible the panel will shrink.
            </div>
          </oj-collapsible>
        </div>
      </div>
    </div>
  );
};

export default PanelPanelbasics;
