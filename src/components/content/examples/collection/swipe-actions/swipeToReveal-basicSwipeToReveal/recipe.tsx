// @ts-nocheck
import { h } from 'preact';

export const swipeToRevealBasicSwipeToRevealRecipe = (
  <>
    <ol>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>
        In the item template, add the oj-swipeactions-container style class to the root of the item.
      </li>
      <li>In the item template, add the oj-swipe-actions tag with the applicable slots.</li>
      <li>
        Use the on-oj-action to specify handler when an action is selected in the swipe action bar.
      </li>
      <li>Use the oj-menu tag to create a JET menu to display when More menu item is chosen.</li>
    </ol>
  </>
);
