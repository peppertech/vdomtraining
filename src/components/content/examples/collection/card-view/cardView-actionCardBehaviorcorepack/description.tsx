import 'preact';

const descriptionHtmlText = String.raw`<p>A CardView displays data items as a grid with highly interactive features.</p>This demo shows how to use action card in oj-c-card-view. When using action card in oj-c-card-view, 
applications should ensure that focus-behavior is set to 'content' in order to get the correct keyboard behavior.
When users click the card or press Enter or Space key on the card, an action event will be triggered.`;

export const cardViewActionCardBehaviorcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
