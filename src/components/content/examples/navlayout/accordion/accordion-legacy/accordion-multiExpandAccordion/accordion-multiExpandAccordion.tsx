import "ojs/ojaccordion";
import "ojs/ojcollapsible";
import 'preact';

export const AccordionMultiExpandAccordion = () => {
  return (
    <div id="accordionPage">
      <oj-accordion
        id="a1"
        multiple
        expanded={[{ id: "c2" }, { id: "c3" }]}
      >
        <oj-collapsible id="c1">
          <h3 slot="header">Header 1</h3>
          <p>Content 1.</p>
        </oj-collapsible>
        <oj-collapsible id="c2" expanded>
          <h3 slot="header">Header 2</h3>
          <p>Content 2.</p>
        </oj-collapsible>
        <oj-collapsible id="c3" expanded>
          <h3 slot="header">Header 3</h3>
          <p>Content 3.</p>
        </oj-collapsible>
        <oj-collapsible id="c4" expanded>
          <h3 slot="header">Header 4</h3>
          <oj-collapsible id="innerCollapsible">
            <h6 slot="header">Inner Collapsible</h6>
            <p>I am a collapsible inside an accordion.</p>
          </oj-collapsible>
        </oj-collapsible>
      </oj-accordion>
    </div>
  );
};

export default AccordionMultiExpandAccordion;
