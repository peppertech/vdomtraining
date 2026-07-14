import 'preact';

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p><p>Tag cloud items can be interactive links.</p>`;

export const tagCloudLinkscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
