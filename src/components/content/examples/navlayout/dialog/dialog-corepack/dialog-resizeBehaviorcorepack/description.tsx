import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  The demo show how changing the dialog's resize behavior option can affect the dialog. The
  following describes the different settings of the
  <code class="prettyprint">resize-behavior</code>
  property:
</p>
<table class="dialogDemo">
  <tr>
    <th>Option Setting</th>
    <th class="padding-10">Resizable</th>
  </tr>
  <tr>
    <td><code class="prettyprint">resize-behavior: 'resizable'</code></td>
    <td class="align-center">yes</td>
  </tr>
  <tr>
    <td><code class="prettyprint">resize-behavior: 'none'</code></td>
    <td class="align-center">no</td>
  </tr>
</table>
<p></p>
<p>
  The dialog's default
  <code class="prettyprint">resize-behavior</code>
  value is
  <code class="prettyprint">'none'</code>
</p>`;

export const dialogResizeBehaviorcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
