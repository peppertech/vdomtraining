// @ts-nocheck
import 'preact';

export const dialogDimensionsDescription = (
  <>
    <p>A dialog displays a popup window that provides information and gathers input from the application user.</p><p>
      Dialog dimensions -
      {" "}
      <code className={"prettyprint"}>width, height, min-width, max-width, min-height</code>
      {" "}
      and
      {" "}
      <code className={"prettyprint"}>max-height</code>
      {" "}
      can be configured using the element style attribute. For example, to create a dialog that cannot
      be resized smaller than 12rem x 14rem, or larger than 22rem x 24rem, use the following style with
      class/id selector:
    </p>
    <p>
      <code className={"prettyprint"}>
        .myDialogStyle {'{'} width: 20rem; height: 15rem; min-width 12rem; max-width: 22rem; min-height:
        14rem; max-height: 24rem; {'}'}
      </code>
    </p>
  </>
);
