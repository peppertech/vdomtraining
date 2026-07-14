import 'preact';

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>This demo uses path-based Preact routing state to keep tab selection, panel content, and browser history in sync.</p>

<p>Selecting a tab updates the URL path, and browser back or forward navigation restores the matching tab.</p>`;

export const tabBarRoutingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
