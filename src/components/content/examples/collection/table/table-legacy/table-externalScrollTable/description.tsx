// @ts-nocheck
import { h } from 'preact';

export const tableExternalScrollTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows how the Table's scroll-policy-options.scroller attribute can enable applications to use 'loadMoreOnScroll' functionality with a single page scrollbar.</p>
    <br />
    <br />
    <p>scroll-policy-options.scroller :</p>
    <ul>
      <li>When specified, the Table will listen to the scroll events of the scroller element to determine when to load more data.</li>
      <li>To specify the HTML body itself, set 'html' as the scroller element. (Most common on mobile devices).</li>
      <li>
        The Table
        {" "}
        <b>must not</b>
        {" "}
        have a constrained height or width. It can have minimum sizes specified, but nothing that prevents it from growing in size in either direction.
      </li>
      <li>
        The scroller element specified
        {" "}
        <b>must</b>
        {" "}
        have horizontal
        {" "}
        <b>AND</b>
        {" "}
        vertical scrolling enabled (ie. overflow: 'auto').
      </li>
      <li>
        The scroller element
        {" "}
        <b>must</b>
        {" "}
        be an ancestor of the Table at some level in the DOM tree.
      </li>
      <li>
        No other elements between the Table and scroller element can manage overflow. They
        {" "}
        <b>all must have</b>
        {" "}
        overflow: 'visible' (which is the default value for an element). Otherwise, the Table's 'sticky' elements will not 'stick' to the correct element bounds.
      </li>
    </ul>
    <br />
    <p>scroll-policy-options.scroller-offset-[dir] (top, bottom, start, end) :</p>
    <ul>
      <li>Used to specify a directional offset where the logical viewport of the Table should differ from the scroller element's bounds.</li>
      <li>For example, in the demo below there is a 100px tall 'sticky' header always shown between the Table and the top of the scroller element specified. Due to this, scroll-policy-options.scroller-offset-top='100' is set on the Table to notify it of this element. Otherwise, the Table's column headers would not know to become 'sticky' at the correct location. Similarly, scroll-policy-options.scroller-offset-bottom='100' is also needed due to the presence of the bottom banner in the demo below.</li>
      <li>Similarly, the demo below also shows panels along each side of the page which are 100px wide. Due to this, scroll-policy-options.scroller-offset-start='100' and scroll-policy-options.scroller-offset-end='100' are set to ensure any frozen columns 'stick' at the proper horizontal locations.</li>
    </ul>
    <br />
    <p>Managing page content positioning with horizontal overflow :</p>
    <ul>
      <li>Applications should be aware that when using an external scroller, the Table can (and will) become wider than the viewport's width depending on the number of columns defined. When this occurs, other content on the page should be positioned in a way that handles this behavior gracefully.</li>
      <li>For example, the sample page content in the demo below has 'position: sticky' set on it as well as a value of 'left: 0' (or 'right: 0' for RTL). This prevents the page content from scrolling horizontally on the page when the Table becomes wider than the viewport.</li>
      <li>Another potential option would be to setup the page content of an application to always stretch to match the width that the Table grows to. This would allow the page content to scroll horizontally when the Table becomes wider than the viewport, and may be preferred in some cases.</li>
    </ul>
  </>
);
