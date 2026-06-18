import { h } from "preact";
import "ojs/ojaccordion";
import "ojs/ojcollapsible";
import "ojs/ojlabel";
import "ojs/ojradioset";
import "ojs/ojoption";

export const AccordionBasicAccordion = () => {
  return (
    <div id="accordionPage">
      <oj-accordion id="a1">
        <oj-collapsible id="c1">
          <h3 slot="header">
            <span class="oj-ux-ico-cart oj-ux-icon-size-5x oj-sm-padding-2x-end" />
            Header 1
          </h3>
          <p>Content 1.</p>
        </oj-collapsible>
        <oj-collapsible id="c3" expanded>
          <h3 slot="header">Header 2</h3>
          <div>
            <oj-label id="mainlabelid">Colors</oj-label>
            <oj-radioset
              id="radiosetBasicDemoId"
              value="red"
              labelled-by="mainlabelid"
            >
              <oj-option id="blueopt" value="blue">
                Blue
              </oj-option>
              <oj-option id="greenopt" value="green">
                Green
              </oj-option>
              <oj-option id="redopt" value="red">
                Red
              </oj-option>
            </oj-radioset>
          </div>
        </oj-collapsible>
        <oj-collapsible id="c4">
          <h3 slot="header">Header 3</h3>
          <p>Content 3.</p>
        </oj-collapsible>
      </oj-accordion>
    </div>
  );
};

export default AccordionBasicAccordion;
