export const ratingGaugeRatingGaugeEventsRecipe = (
  <>
    <ol>
      <li>
        Create a rating gauge by using the oj-rating-gauge tag with the
        <i><b>value</b></i>
        attribute defined.
      </li>
      <li>
        To catch and process events triggered when the
        <i><b>value</b></i>
        is changed, bind an event listener using the
        <a href={"#"}>
          <i><b>on-value-changed</b></i>
        </a>
        attribute.
      </li>
      <li>
        To retrieve the
        <i>transient-value</i>
        of the gauge during hover action, read the
        <code>transientValue</code>
        property of the gauge and keep it synchronized from the transient value change event.
      </li>
    </ol>
  </>
);
