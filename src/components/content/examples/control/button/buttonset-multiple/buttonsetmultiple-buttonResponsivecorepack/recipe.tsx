import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create Knockout observables to monitor screen size changes. See the Responsive Javascript:
    Framework Queries demo for details.
  </li>
  <li>
    For component attributes that should vary by screen size, such as
    <code class="prettyprint">display</code>, define computed observables that return the desired value of those attributes as a function of
    the screen size.
  </li>
  <li>Bind the component attributes to those computed observables.</li>
  <li>
    To replace the Buttonset with a completely different component at smaller screen sizes, use
    Knockout's
    <code class="prettyprint">if</code>
    and
    <code class="prettyprint">ifnot</code>
    bindings as shown. The two components should share the same model.
  </li>
  <li>
    Apply an explicit width and/or a layout-width override property to the Buttonset if needed. See the
    <a href="#" onclick="demoGoLink(event, 'butttonsetmultipleCorepack', 'buttonsetWidth'); return false;">
      Buttonset Width demo
    </a>
    for details.
  </li>
</ul>`;

export const buttonsetmultipleButtonResponsivecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
