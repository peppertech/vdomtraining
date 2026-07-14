import 'ojs/ojcollapsible';
import 'preact';

export const CollapsibleNestedCollapsible = () => {
  return (
      <oj-collapsible id="collapsiblePage" expanded>
            <h3 id="ph" slot="header">Parent Collapsible</h3>
            <div>
                    <oj-collapsible id="innerContent1" expanded>
                              <h4 id="ch1" slot="header">Nested Collapsible 1</h4>
                              <div id="c1">Nested Content 1</div>
                          </oj-collapsible>
                    <oj-collapsible id="innerContent2" expanded>
                              <h4 id="ch2" slot="header">Nested Collapsible 2</h4>
                              <div id="c2">Nested Content 2</div>
                          </oj-collapsible>
                    <oj-collapsible id="innerContent3" expanded>
                              <h4 id="ch3" slot="header">Nested Collapsible 3</h4>
                              <div id="c3">Nested Content 3</div>
                          </oj-collapsible>
                </div>
        </oj-collapsible>
    );
};

export default CollapsibleNestedCollapsible;
