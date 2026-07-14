// @ts-nocheck
import 'preact';

export const tagCloudAnimationRecipe = (
  <>
    <ul>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <i>
          <b>short-desc</b>
        </i>
        {" "}
        attribute with meaningful descriptors. Also, when using font colors as a data dimension for Tag Clouds, the application needs to ensure that they meet minimum contrast requirements. Note that not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum contrast requirements for text.
      </li>
      <li>
        Set
        {" "}
        <i>
          <b>animation-on-display</b>
        </i>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        to enable initial display animation.
      </li>
      <li>
        Set
        {" "}
        <i>
          <b>animation-on-data-change</b>
        </i>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        to enable data change animation.
      </li>
    </ul>
  </>
);
