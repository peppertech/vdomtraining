import { h } from 'preact';

export const pushButtonsButtonIconsRecipe = (
  <>
    <p>
      Use the <code class="prettyprint">display</code> attribute plus the <code>startIcon</code>{' '}
      and <code>endIcon</code> slots to configure any desired combination of icon and text.
    </p>
    <ol>
      <li>Create an <code>oj-button</code> or <code>oj-buttonset-many</code> element.</li>
      <li>Set the text in the default slot, even for an icon-only button.</li>
      <li>Set the start or end icon slot to the desired icon.</li>
      <li>
        For an icon-only button, set <code class="prettyprint">display=&quot;icons&quot;</code>.
        The default-slot text will be shown as a tooltip and read to screen readers.
      </li>
    </ol>
    <p>
      Set <code>data-oj-binding-provider=&quot;none&quot;</code> when the element has no Knockout
      dependencies and does not need to wait for <code>applyBindings</code> before initializing.
    </p>
  </>
);
