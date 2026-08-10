import "oj-c/form-layout";
import "oj-c/input-text";
import 'preact';

export default function FormLayoutCorePackSharedColumnExample() {
  return (
    <div id="form-container">
      <style>
        {`
          .demo-column-width {
            width: 6rem;
          }
        `}
      </style>
      <oj-c-form-layout labelEdge="inside">
          <oj-c-input-text value="column not shared" labelHint="one" />

          <div class="oj-flex">
            <div class="oj-flex-item oj-sm-3 oj-sm-padding-2x-end oj-md-padding-3x-end">
              <oj-c-input-text value="25%" labelHint="two.a" />
            </div>
            <div class="oj-flex-item oj-sm-9 oj-sm-padding-2x-start oj-md-padding-3x-start">
              <oj-c-input-text value="75%" labelHint="two.b" />
            </div>
          </div>

          <oj-c-input-text value="column not shared" labelHint="three" />

          <div class="oj-flex-bar">
            <div class="oj-flex-bar-start oj-sm-padding-2x-end oj-md-padding-3x-end demo-column-width">
              <oj-c-input-text value="6rem" labelHint="four.a" />
            </div>
            <div class="oj-flex-bar-middle oj-sm-padding-2x-start oj-md-padding-3x-start">
              <oj-c-input-text value="rest of column" labelHint="four.b" />
            </div>
          </div>
      </oj-c-form-layout>
    </div>
  );
}
