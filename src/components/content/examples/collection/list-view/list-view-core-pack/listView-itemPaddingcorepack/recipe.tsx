import 'preact';

const recipeHtmlText = String.raw`<ul>
    <li>
        Please see the
        <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
          basic oj-c-list-view demo
        </a>
        for more information about configuring a basic oj-c-list-view.
    </li>
    <li>
        Use the
        <code>item.padding</code>
        attribute to enable padding around each item.
    </li>
    <li>
        Use the switch to change
        <code>item.padding</code> attribute to 
        enable or disable the padding around each item.
      </li>
  </ul>`;

export const listViewItemPaddingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
