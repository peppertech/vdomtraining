import { h } from "preact";
import "ojs/ojdatetimepicker";
import "ojs/ojlabel";

export default function InputDateReadOnlyVdomExample() {
  return (
    <div id="inputDateReadOnlyVdom">
      <oj-label for="readonly-vdom">Read only</oj-label>
      <oj-input-date
        id="readonly-vdom"
        readonly
        class="oj-form-control-max-width-sm"
      />
    </div>
  );
}

