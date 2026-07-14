import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the items property of the 
    <code class="prettyprint">oj-c-buttonset-single</code>
    component to specify the buttons that can be clicked.
  </li>
  <li>
    Use the layout-width property to change width behavior. 
  </li>
  <li>
    Create Knockout observables to monitor screen size changes and component attributes that should
    vary by screen size to create responsive buttonsets. See
    <a href="#" onclick="demoGoLink(event, 'buttonsetone', 'buttonResponsive'); return false;">
      Responsive
    </a>
    for details.
  </li>
  <li>
    Add an
    <code class="prettyprint">oj-label</code>
    to define the label text and optional help.definition.See
    <a href="#" onclick="demoGoLink(event, 'buttonsetone', 'labelledButtonset'); return false;">
      Labelled Buttonset
    </a>
    for details.
  </li>
</ul>`;

export const buttonsetsingleOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
