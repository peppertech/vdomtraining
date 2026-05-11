import { h } from 'preact';

export const inputSearchSuggestionsRecipe = (
  <>
    <ul>
      <li>
        Create an <code className={'prettyprint'}>oj-input-search</code> element.
      </li>
      <li>
        Specify an <code>aria-label</code> attribute to make the element accessible.
      </li>
      <li>
        Bind the <code>on-oj-value-action</code> attribute to a listener that will conduct a
        search on the given text when received. The ojValueAction event is fired when pressing
        Enter or selecting a suggestion from the dropdown.
      </li>
      <li>
        Create an <code>ArrayDataProvider</code> from an array where each item contains an object
        with the required <code>label</code> field.
      </li>
      <li>
        Bind the <code>suggestions</code> attribute to the <code>ArrayDataProvider</code>.
      </li>
      <li>
        For purposes of illustration, when the 'Simulate Fetch Delay' checkbox is checked, this
        demo wraps the <code>ArrayDataProvider</code> in a demo{' '}
        <code>DemoDelayingDataProvider</code> and binds it to the <code>suggestions</code>{' '}
        attribute instead.
      </li>
    </ul>
  </>
);
