import 'preact';

export const legendLayoutDescription = (
  <>
    <p>
      A legend displays an interactive description of symbols, colors, and other
      cues used in graphical information representations.
    </p>
    <p>The layout properties of the legend can be set to customize item placement.</p>
    <ul>
      <li>
        The vertical and horizontal alignment of the legend items can be specified
        using the <i><b>valign</b></i> and <i><b>halign</b></i> attributes.
      </li>
      <li>
        Alternatively, the <b>getPreferredSize</b> method on the legend element can be
        used to find the optimal size for the legend based on its contents. This is useful
        for knowing how much space to allocate when rendering the legend either within or
        alongside other components.
      </li>
    </ul>
  </>
);
