import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
      basic oj-c-list-view demo
    </a>
    for more information about configuring oj-c-list-view.  
  </li>
  <li>
    Use the
    <code>itemTemplate</code>
    slot to specify the template to render the item.
  </li>
  <li>
    Use
    <code>oj-ux-ico-chevron-right</code>
    class to render the drill icon. Use flex bar to position the icon as desired. See
    <a href="#" onclick="demoGoLink(event, 'flex', 'bar'); return false;">flex bar demo</a>
    for details.
  </li>
  <li>Use the on-oj-item-action attribute to register an item action listener. </li>
  <li>
    Since item action listener is registered, use the <code>item.enter-key-focus-behavior</code> attribute and set it to 'none' to switch off the enter key focus behavior so that it won't interfere with the item action.
  </li>  
  <li>
    Note that this demo primarily demonstrates the use of the drill icon. Module animation should be
    use to transition between views. See
    <a href="#" onclick="demoGoLink(event, 'ModuleElement', 'specificAnimation'); return false;">
      module animation demo
    </a>
    for details.
  </li>
</ul>`;

export const listViewDrillDowncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
