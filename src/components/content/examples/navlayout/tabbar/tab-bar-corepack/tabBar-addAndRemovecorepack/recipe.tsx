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
      Ensure that
      <code class="prettyprint">isRemovable</code>
      is set to true in the data for items that need to be removed.
    </li>
    <li>
        To handle item selection, bind
        <code>selection</code>
        attribute to an observable as shown.
    </li>
    <li>
        Use
        <code>on-oj-remove</code>
        attribute to register listeners to perform custom logic on tab removal.
      </li>
    <li>Remove item from the data array when remove event fired.</li>   
  </ol>`;

export const tabBarAddAndRemovecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
