import 'preact';

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p>Thie demo shows the initial loading indicator in oj-c-list-view when it takes a long time to load and render the
data. oj-c-list-view only shows the loading indicator after a pre-defined time has elapsed, which varies
by themes (for Redwood it is 50ms). The appearance of the loading indicator also varies by themes
(for Redwood item skeletons are shown).`;

export const listViewProgressiveLoadingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
