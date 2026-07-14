// @ts-nocheck
import 'preact';

export const tagCloudStylesRecipe = (
  <>
    <ol>
      <li>Define SVG CSS customizations in a style class or inline style string. To use custom fills or strokes, create a separate SVG image on the page and define the fills or strokes in the defs element of that SVG image, referring to them in the style class or inline style.</li>
      <li>
        Create an oj-tag-cloud element and define the
        {" "}
        <i>
          <b>svg-class-name</b>
        </i>
        {" "}
        attributes on the Tag cloud item. These properties should reference the previously defined styles.
      </li>
      <li>The style class and inline style will override any other styling specifications.</li>
      <li>We recommend that when using these properties, the application should also specify the color property in order to provide better selection and tooltip styling.</li>
    </ol>
  </>
);
