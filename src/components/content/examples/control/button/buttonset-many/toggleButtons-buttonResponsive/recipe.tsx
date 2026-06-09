// @ts-nocheck
import { h } from 'preact';

export const toggleButtonsButtonResponsiveRecipe = (
  <>
    <ul>
      <li>
        Create Knockout observables to monitor screen size changes. See the Responsive Javascript:
        Framework Queries demo for details.
      </li>
      <li>
        For component attributes that should vary by screen size, such as
        {" "}
        <code className={"prettyprint"}>display</code>, define computed observables that return the
        desired value of those attributes as a function of the screen size.
      </li>
      <li>Bind the component attributes to those computed observables.</li>
      <li>
        To replace the Buttonset with a completely different component at smaller screen sizes, use
        Knockout&apos;s <code className={"prettyprint"}>if</code> and
        {" "}
        <code className={"prettyprint"}>ifnot</code> bindings as shown. The two components should share
        the same model.
      </li>
      <li>
        Apply an explicit width and/or a width override class to the Buttonset if needed. See the
        {" "}
        <a href={"#"}>Buttonset Width demo</a> for details.
      </li>
    </ul>
  </>
);
