// @ts-nocheck
import { h } from 'preact';

export const boxPlotMeansDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>Mean values with connector line can be displayed using an additional line series.</p>

    <p>
      Please note that this approach only works for a single box plot series. For multiple series, the
      mean values can be displayed using nested items (same approach as outliers), but it's not possible
      to render the connector lines.
    </p>
  </>
);
