// @ts-nocheck
import { h } from 'preact';

export const panelPaneldragRecipe = (
  <>
    <p>
      See the
      {" "}
      <a target={"_blank"} href={"jsdocs/Panel.html"}>panel style doc</a>
      {" "}
      for all panel classes including affordances.
    </p>
    <p>
      Set the data-oj-binding-provider attribute to 'none' to notify the framework that particular
      elements or subtrees have no knockout dependencies and can be initialized without a knockout
      applyBindings call. For more information, see
      {" "}
      <a href={"jsdocs/CustomElementOverview.html#ce-overview-upgrade-section"}>
        Upgrading a Custom Element
      </a>
      .
    </p>
  </>
);
