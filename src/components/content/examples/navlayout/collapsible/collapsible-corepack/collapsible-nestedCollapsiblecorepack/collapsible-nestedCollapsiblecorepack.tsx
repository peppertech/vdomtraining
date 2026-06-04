import { h } from 'preact';
import 'oj-c/collapsible';

export const CollapsibleNestedCollapsiblecorepack = () => {
  return (
      <oj-c-collapsible id="collapsiblePage" expanded>
            <h3 id="ph" slot="header">Parent Collapsible</h3>
            <div>
                    <oj-c-collapsible id="innerContent1" expanded>
                              <h4 id="ch1" slot="header">Nested Collapsible 1</h4>
                              <div id="c1">Nested Content 1</div>
                          </oj-c-collapsible>
                    <oj-c-collapsible id="innerContent2" expanded>
                              <h4 id="ch2" slot="header">Nested Collapsible 2</h4>
                              <div id="c2">Nested Content 2</div>
                          </oj-c-collapsible>
                    <oj-c-collapsible id="innerContent3" expanded>
                              <h4 id="ch3" slot="header">Nested Collapsible 3</h4>
                              <div id="c3">Nested Content 3</div>
                          </oj-c-collapsible>
                </div>
        </oj-c-collapsible>
    );
};

export default CollapsibleNestedCollapsiblecorepack;
