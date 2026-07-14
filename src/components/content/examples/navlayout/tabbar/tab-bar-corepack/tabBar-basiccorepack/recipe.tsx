import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>Create an oj-c-tab-bar element.</li>
    <li>Use the 
        <code class="prettyprint">data</code> 
        attribute to specify the data array that represents information about each tab.
    </li>
    <li>
        If desired, icons-only tabs can be shown by setting
      <code class="prettyprint">display</code>
      attribute to
      <code class="prettyprint">icons</code>.
    </li>
    <li>
        To have different type of layout set
        <code class="prettyprint">layout</code>
        attribute to the type you want.
    </li>
    <li>
       Use the  
        <code>edge</code> 
        attribute to specify the position of the tab bar.
    </li>
    <li>
        To handle item selection, bind
        <code>selection</code>
        attribute to an observable as shown.
    </li>
  </ol>`;

export const tabBarBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
