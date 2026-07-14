import 'preact';

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p>This demo shows how to display Oracle suggestions in oj-c-list-view. The special effect shown here is a
designated treatment for Oracle suggestions. In order to display them, you must provide suggestions
through the OARS service which can enable Machine Learning suggestions from AI Apps. Most
recommendations are provided as built-in to redwood, if you intend to use this feature outside of
what is provided in redwood, please contact us in the slack channel
#help-redwood-intelligent-recommendations to discuss your use case.`;

export const listViewSmartSuggestionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
