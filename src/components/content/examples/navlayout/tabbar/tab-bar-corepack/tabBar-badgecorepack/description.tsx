import 'preact';

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>
    This demo shows how to add badge/metadata/severity icon to a tabbar.
</p>`;

export const tabBarBadgecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
