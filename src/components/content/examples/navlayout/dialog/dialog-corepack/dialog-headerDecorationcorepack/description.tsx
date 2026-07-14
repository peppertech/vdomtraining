import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  The demo show how changing the dialog's header decoration option can affect the dialog. The
  following describes the different settings of the
  <code class="prettyprint">header-decoration</code>
  property:
</p>
<table class="dialogDemo">
  <tr>
    <th>Attribute Setting</th>
    <th class="padding-10">Header Decoration</th>
  </tr>
  <tr>
    <td><code class="prettyprint">header-decoration="on"</code></td>
    <td class="align-center">
      a texture strip is displayed at the top of the dialog header (Redwood theme only)
    </td>
  </tr>
  <tr>
    <td><code class="prettyprint">header-decoration="off"</code></td>
    <td class="align-center">no header decoration is displayed</td>
  </tr>
</table>
<br />
<p>
  The dialog's default
  <code class="prettyprint">header-decoration</code>
  value is
  <code class="prettyprint">'on'</code>
</p>`;

export const dialogHeaderDecorationcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
