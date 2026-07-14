import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import 'preact';

export default function FormLayoutLegacyNestedExample() {
  return (
    <div id="form-container">
      <oj-form-layout labelEdge="start">
        <oj-input-text id="control1" value="text" labelHint="row 1" />
        <oj-label id="row2group" labelId="row2grouplabel">
          row 2
        </oj-label>
        <oj-form-layout aria-labelledby="row2grouplabel" labelEdge="inside">
          <oj-input-text id="nestedcontrol1" value="text" labelHint="nested row 1" />
          <oj-input-text id="nestedcontrol2" value="text" labelHint="nested row 2" />
          <oj-input-text id="nestedcontrol3" value="text" labelHint="nested row 3" />
        </oj-form-layout>
        <oj-input-text id="control3" value="text" labelHint="row 3" />
      </oj-form-layout>
    </div>
  );
}
