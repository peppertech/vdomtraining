import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'basic'); return false;">
      basic oj-c-tab-bar demo
    </a>
    for more information about configuring oj-c-tab-bar.  
    </li>
    <li>
        For each item provide an 
        <code class="prettyprint">itemKey</code>, 
        <code class="prettyprint">label</code>, and a
        <code class="prettyprint">badge</code> or 
        <code class="prettyprint">metadata</code> or 
        <code class="prettyprint">severity</code>.
    </li>
    <li> If desired, icons-only tabs can be shown by setting 
        <code class="prettyprint">display</code> 
        attribute to icons</li> 
    <li>If desired, icon, label and badge can be stacked by setting 
        <code class="prettyprint">display</code>
         attribute to stacked</li>
    <li>
        To have different type of layout set
        <code class="prettyprint">layout</code>
        attribute to the type you want.
    </li>
    <li>
        Ensure that the
        <code>edge</code> 
        attribute set to top.
    </li>
    <li>
        To handle item selection, bind
        <code>selection</code>
        attribute to an observable as shown.
    </li>
  </ol>`;

export const tabBarBadgecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
