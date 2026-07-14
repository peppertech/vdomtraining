import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  Modal dialogs are the default. Modal dialogs require interaction before control can be returned to
  the outer window.
</p>
<p>
  This example also shows the use of slots (
  <code class="prettyprint">'body'</code>
  and
  <code class="prettyprint">'footer'</code>
  ), which are used to identify different content areas of the dialog:
</p>
<ul>
  <li>
    <code class="prettyprint">slot='body'</code>
    - identifies dialog body content area.
  </li>
  <li>
    <code class="prettyprint">slot='footer'</code>
    - identifies dialog footer content area.
  </li>
</ul>
<p>
  Note that the dialog also supports a
  <code class="prettyprint">'header'</code>
  slot, which can be used to for user-defined headers.
</p>
<p>
  This and other dialog demos use a button to launch the dialog - the button's click handler calls
  the dialog's
  <code class="prettyprint">open</code>
  method. However, in practice, you will likely open the dialog based on application state.
</p>
<p>
  While the header close icon and its close handler are provided by default, the "OK" button (in the
  footer) is user-defined. Also note that the "OK" button has a user-defined close handler.
</p>`;

export const dialogModalcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
