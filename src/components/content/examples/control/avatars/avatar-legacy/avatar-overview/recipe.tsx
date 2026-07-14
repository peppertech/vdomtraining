// @ts-nocheck
import 'preact';

export const avatarOverviewRecipe = (
  <>
    <ol>
      <li>
        Create an
        {" "}
        <code className={"prettyprint"}>oj-avatar</code>
        {" "}
        element.
      </li>
      <li>
        Provide the source of the avatar image by using the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#src"}>src</a>
        {" "}
        attribute.
      </li>
      <li>
        Provide the css class of the avatar icon by using the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#iconClass"}>icon-class</a>
        {" "}
        attribute.
      </li>
      <li>
        Provide the initials of the avatar using the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#initials"}>initials</a>
        {" "}
        attribute. If no image is provided, the avatar will display the initials.
      </li>
      <li>
        Specify a size by using the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#size"}>size</a>
        {" "}
        attribute. Possible sizes are 2xs, xs, sm, md, lg, xl, and 2xl. The default is
        <i>md</i>
        .
      </li>
      <li>
        Specify a shape by using the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#shape"}>shape</a>
        {" "}
        attribute. Possible shapes are square and circle. Do not specify the attribute in order to use
        the theme-specific default.
      </li>
      <li>
        Set the icon-class attribute to 'oj-ux-ico-contact-group' to use the group placeholder image.
      </li>
      <li>
        To make the element accessible, set the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#a11y-section"}>role</a>
        {" "}
        attribute to
        <i>'img'</i>
        and provide a value for the
        {" "}
        <a href={"jsdocs/oj.ojAvatar.html#a11y-section"}>aria-label</a>
        {" "}
        attribute.
      </li>
    </ol>
  </>
);
