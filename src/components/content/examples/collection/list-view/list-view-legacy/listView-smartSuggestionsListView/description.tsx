// @ts-nocheck
import { h } from 'preact';

export const listViewSmartSuggestionsListViewDescription = (
  <>
    <p>A list view displays data items as a list or a grid with highly interactive features.</p>This demo shows a ListView displaying Oracle suggestions. The special effect shown here is a
    designated treatment for Oracle suggestions. In order to display them, you must provide suggestions
    through the OARS service which can enable Machine Learning suggestions from AI Apps. Most
    recommendations are provided as built-in to redwood, if you intend to use this feature outside of
    what is provided in redwood, please contact us in the slack channel
    #help-redwood-intelligent-recommendations to discuss your use case.
    <div className={"oj-sm-padding-3x-vertical"}>
      <span className={"oj-icon-color-danger oj-ux-ico-error-s oj-icon-size-6x"} role={"img"} aria-label={"error"} style={{ fontSize: "20px", verticalAlign: "bottom" }}></span>
      {" "}
      <b>NOTE</b>
      : The special rendering of Oracle suggestions will be visible only in the redwood theme.
    </div>
  </>
);
