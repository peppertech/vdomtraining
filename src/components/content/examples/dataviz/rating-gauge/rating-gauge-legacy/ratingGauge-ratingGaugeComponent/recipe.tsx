export const ratingGaugeRatingGaugeComponentRecipe = (
  <>
    <ol>
      <li>
        Create a rating gauge by using the oj-rating-gauge tag with the
        {" "}
        <i><b>value</b></i>
        {" "}
        attribute defined.
      </li>
      <li>
        Choose the size of the gauge shapes with the
        {" "}
        <i><b>size</b></i>
        {" "}
        attribute. For custom size (in this demo, 225x60), set the
        {" "}
        <i><b>size</b></i>
        {" "}
        to
        {" "}
        <i><b>fit</b></i>
        .
        <i><b>sm</b></i>
        {" "}
        and
        {" "}
        <i><b>md</b></i>
        {" "}
        sizes are not recommended for interactive gauges as the touch target sizes are not large enough
        to meet the accessibility guidelines.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for providing a meaningful tooltip using
        {" "}
        <i><b>tooltip.renderer</b></i>
        {" "}
        function on the element as the oj-rating-gauge element does not provide a default tooltip and
        also ensuring that an accessible label is included that matches the tooltip's content. .
      </li>
    </ol>
  </>
);
