import 'preact';

const descriptionHtmlText = String.raw`<p>A CardView displays data items as a grid with highly interactive features.</p>This demo shows an example of load more on scroll in oj-c-card-view, 
which is enabled by default when oj-c-card-view is scrollable or inside a scrollable container. 
It also shows how an application can customize the number of item fetched each time 
by using the scroll-policy-options.fetch-size attribute.`;

export const cardViewLoadMoreOnScrollcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
