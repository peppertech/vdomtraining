// @ts-nocheck
import 'preact';

export const tagCloudLinksRecipe = (
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
        attribute with meaningful descriptors. Also, when using font colors as a data dimension for tag clouds, the application needs to ensure that they meet minimum contrast requirements. Note that not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum contrast requirements for text.
      </li>
      <li>
        To make tag cloud items link to a website, set the
        {" "}
        <i>
          <b>url</b>
        </i>
        {" "}
        attribute on the oj-tag-cloud-item element.
      </li>
    </ul>
  </>
);
