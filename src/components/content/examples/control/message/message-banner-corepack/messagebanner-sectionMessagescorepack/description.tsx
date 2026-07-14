import 'preact';

const descriptionHtmlText = String.raw`<p>Message Banners are brief, moderately disruptive, semi-permanent messages that help communicate relevant and useful information.</p><p>This demo shows how to configure multiple
<strong>&lt;oj-c-message-banner&gt;</strong>
components with each one specific to each section on a page. Here, we need to use
<code class="prettyprint">section</code>
type messages.</p>

<p>The form controls shown in the demo are just for demo purposes; the value used in the
fields are not used for anything.</p>`;

export const messagebannerSectionMessagescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
