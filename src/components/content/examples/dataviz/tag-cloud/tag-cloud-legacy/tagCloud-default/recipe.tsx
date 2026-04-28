// @ts-nocheck
import { h } from 'preact';

export const tagCloudDefaultRecipe = (
  <>
    <ul>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        <i>
          <b>short-desc</b>
        </i>
        attribute with meaningful descriptors. Also, when using font colors as a data dimension for Tag Clouds, the application needs to ensure that they meet minimum contrast requirements. Note that not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum contrast requirements for text.
      </li>
      <li>
        Create an
        <b>oj-tag-cloud</b>
        element.
      </li>
      <li>
        Add an
        <b>itemTemplate</b>
        slot with
        <b>oj-tag-cloud-item</b>
        child element. For more details, see
        <a target="_blank" href="jsdocs/oj.ojTagCloud.html#itemTemplate">itemTemplate</a>
        and
        <a target="_blank" href="jsdocs/oj.ojTagCloudItem.html">oj-tag-cloud-item</a>
        .
      </li>
      <li>
        Supply the data items using the
        <i>
          <b>data</b>
        </i>
        attribute. Optionally set the 'data-oj-as' attribute on the template element to set the alias for the $current context for individual templates.
      </li>
      <li>
        Change the tag cloud layout using the
        <i>
          <b>layout</b>
        </i>
        attribute.
      </li>
    </ul>
  </>
);
