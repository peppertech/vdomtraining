import { h } from 'preact';

export const lineChartDataLabelsRecipe = (
  <>
    <ol>
      <li>
        On the desired data items, specify data labels using the <i><b>label</b></i>{' '}
        property.
      </li>
      <li>
        To position the data labels, set the <i><b>style-defaults.data-label-position</b></i>{' '}
        property on the <code>oj-chart</code> element. Alternatively, set the{' '}
        <i><b>label-position</b></i> attribute on the <code>oj-chart-item</code> element
        to provide different label positions for each item.
      </li>
      <li>
        To apply custom CSS styling to data labels, set the{' '}
        <i><b>style-defaults.data-label-style</b></i> attribute.
      </li>
      <li>
        To format numerical data labels, create a converter and set it on the chart&apos;s{' '}
        <i><b>value-formats</b></i> object.
      </li>
    </ol>
  </>
);
