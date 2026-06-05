// @ts-nocheck
import { h } from 'preact';

export const popupModalDescription = (
  <>
    <p>A popup temporarily 'pops up' content in the foreground.</p><p>
      This demo shows the usage of popup's
      <code className={"prettyprint"}>modality</code>
      property. When set to
      <code className={"prettyprint"}>modal</code>
      , the user input of the page behind the popup is blocked
    </p>
    <p>
      The demo also shows the effect of the
      <code className={"prettyprint"}>auto-dismiss</code>
      property. The
      <code className={"prettyprint"}>none</code>
      value prevents the popup from closing when the user clicks outside of the popup area.
    </p>
  </>
);
