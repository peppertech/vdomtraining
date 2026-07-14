import 'preact';

export const legendDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an <code>{'<oj-legend>'}</code> element and set the <i><b>orientation</b></i>{' '}
        attribute to either <i>&apos;vertical&apos;</i> or <i>&apos;horizontal&apos;</i>.
      </li>
      <li>
        Supply the items for the legend using the <i><b>data</b></i> attribute.
      </li>
      <li>
        <b>Accessibility</b>: To make your component accessible, set the appropriate
        aria props. See this <a target={"_blank"} href={"jsdocs/oj.ojLegend.html#a11y-section"}>doc</a>{' '}
        for details. When setting color, applications are responsible for making sure
        that the color meets the{' '}
        <a target={"_blank"} href={"https://www.w3.org/TR/WCAG21/#non-text-contrast"}>
          minimum contrast ratio
        </a>.
      </li>
    </ol>
  </>
);
