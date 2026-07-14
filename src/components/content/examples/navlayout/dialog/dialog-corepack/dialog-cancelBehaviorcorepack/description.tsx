import 'preact';

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  The demo show how changing the dialog's cancel-behavior option can alter the dialog's header
  appearance and alter the cancel behavior. The following describes the different settings of the
  <code class="prettyprint">cancel-behavior</code>
  option:
</p>
<table class="dialogDemo">
  <tr>
    <th class="padding-10">Option Setting</th>
    <th class="padding-10">Close icon is created?</th>
    <th class="padding-10">Escape key closes the dialog?</th>
  </tr>
  <tr>
    <td><code class="prettyprint">cancel-behavior: 'icon'</code></td>
    <td class="align-center">yes</td>
    <td class="align-center">yes</td>
  </tr>
  <tr>
    <td><code class="prettyprint">cancel-behavior: 'escape'</code></td>
    <td class="align-center">no</td>
    <td class="align-center">yes</td>
  </tr>
  <tr>
    <td><code class="prettyprint">cancel-behavior: 'none'</code></td>
    <td class="align-center">no</td>
    <td class="align-center">no</td>
  </tr>
</table>
<p></p>
<p>
  The dialog's default
  <code class="prettyprint">cancel-behavior</code>
  value is
  <code class="prettyprint">none</code>
</p>`;

export const dialogCancelBehaviorcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
