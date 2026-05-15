import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Buttonset Single allows a user to select the state of one or more related options.</p><p>
  This demo shows the layout width settings of Buttons in JET Buttonsets. 
  By default, the layout-width of buttonsets fit their contents.  This can be changed 
  using the buttonset layout-width property.  
</p>

<ul>
  <li>
    Auto: The width of each Button is automatically determined to fit its contents. The overall
    width of the Buttonset can also be specified for further width control. 
  </li>
  <li>
    Equal: The width of the Buttonset is equally distributed to all contained Buttons. The overall
    width of the Buttonset defaults to 100%. Set the
    <code class="prettyprint">max-width</code>
    (recommended) or
    <code class="prettyprint">width</code>
    of the Buttonset for further width control. 
  </li>
</ul>

<p>
  For icon-only Buttonsets where the icons are already the same size, applications may prefer to
  make the buttonset auto-width, using layout-width="auto", to sidestep the need to specify an exact width or max-width.
</p>`;

export const buttonsetsingleButtonsetWidthcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
