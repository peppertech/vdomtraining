import 'preact';

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p><p>
  This demo showcases how to create a JET Core Pack Legend with a dataProvider that contains data that has
  already been shaped for the Legend using the expected data fields. This has significant performance benefits. When using shaped data there is no need to use the <a target="_blank" href="jsdocs/oj-c.Legend.html#itemTemplate">itemTemplate</a> slot shown in the <a href="#" onclick="demoGoLink(event, 'legendCorepack', 'default'); return false;">Basic demo</a>.
</p>`;

export const legendShapedDatacorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
