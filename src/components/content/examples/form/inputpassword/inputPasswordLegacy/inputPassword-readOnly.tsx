import { h } from "preact";
import "ojs/ojinputtext";
import "ojs/ojlabel";

export default function InputPasswordReadOnlyExample() {
  return (
    <div id="inputPasswordReadOnly">
      <oj-label for="password-readonly">Readonly oj-input-password component</oj-label>
      <oj-input-password id="password-readonly" value="ReadOnly" readonly />
    </div>
  );
}
