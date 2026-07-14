import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>Create an oj-c-avatar element.</li>
    <li>For an Image avatar, provide the source of the avatar by using the <a href="jsdocs/oj-c.Avatar.html#src">src</a> attribute.</li>
    <li>For an Icon avatar, provide the css class of the avatar by using the <a href="jsdocs/oj-c.Avatar.html#iconClass">icon-class</a> attribute</li>
    <li>For an Initials avatar, provide the initials to the avatar using the <a href="jsdocs/oj-c.Avatar.html#initials">initials</a> attribute. If no image is provided, the avatar will display the initials.</li>
    <li>To specify a size, use the <a href="jsdocs/oj-c.Avatar.html#size">size</a> attribute. Possible sizes are 2xs, xs, sm, md, lg, xl, and 2xl. The default is md.</li>
    <li>To specify the shape, use the <a href="jsdocs/oj-c.Avatar.html#shape">shape</a> attribute. Possible shapes are square and circle. The default is square.</li>
    <li>Accessibility: If any associated information is already available to assistive technologies, for example by rendering the name in addition to the avatar as part of the page content, then setting the aria-label is optional. Otherwise setting the aria-label is required by passing a descriptive text to the <a href="jsdocs/oj-c.Avatar.html#a11y-section">aria-label</a> attribute.</li>
</ol>`;

export const avatarCombinationscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
