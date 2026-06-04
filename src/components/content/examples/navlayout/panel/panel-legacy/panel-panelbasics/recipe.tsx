// @ts-nocheck
import { h } from 'preact';

export const panelPanelbasicsRecipe = (
  <>
    <ul>
      <li>
        Create a div and add classes:
        <ul>
          <li>
            <b>oj-panel</b>
            : add this class to get a panel
          </li>
          <li>
            add one of the
            <a href={"#"}>
              background color classes
            </a>
            to change the color.
          </li>
          <li>
            <b>oj-sm-margin-2x</b>
            : see the spacing section of the
            <a href={"jsdocs/Spacing.html"}>styling doc</a>
          </li>
          <li>
            <b>demo-mypanel</b>
            : add your own custom class (or use the style attribute) to control things like the size or
            display of the panel if needed. In this demo we created the "demo-mypanel" class for this.
          </li>
        </ul>
      </li>
      <li>Add a header or collapsible as needed in the panel</li>
      <li>
        When panels are on the same row they have equal height because they are in a div with class
        'oj-flex'. By default in flexbox items on the same row will stretch vertically to be the same
        height. See the
        <a href={"#"}>flex align demo</a>
        for more information.
      </li>
      <li>
        Set the data-oj-binding-provider attribute to 'none' to notify the framework that particular
        elements or subtrees have no knockout dependencies and can be initialized without a knockout
        applyBindings call. For more information, see
        <a href={"jsdocs/CustomElementOverview.html#ce-overview-upgrade-section"}>
          Upgrading a Custom Element
        </a>
        .
      </li>
    </ul>
  </>
);
