import { h, type ComponentProps } from "preact";
import "oj-c/labelled-link";
import "oj-c/form-layout";

export default function LabelledLinkStatesExample() {
  return (
    <div id="container">
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-labelled-link
          labelHint="Labelled link"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="Labelled link (Custom text)"
          href="https://www.oracle.com"
          target="_blank"
          text="Go to external source"
              containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="Labelled link (Long link text)"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
          text="This is very long scrolling link text to demonstrate how the labelled link component handles long text in a form layout. You are able to scroll left and right to see all of the text."
        ></oj-c-labelled-link>
      </oj-c-form-layout>

      <h4>States outside oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-labelled-link
            labelHint="Labelled link"
            href="https://www.oracle.com"
            target="_blank"
          ></oj-c-labelled-link>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-labelled-link
            labelHint="Labelled link (Custom text)"
            href="https://www.oracle.com"
            text="Go to external source"
            target="_blank"
          ></oj-c-labelled-link>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal oj-md-margin-6x-vertical">
          {/* @ts-ignore lineClamp is not yet present in local typings */}
          <oj-c-labelled-link
            labelHint="Labelled link (Line Clamp)"
            href="https://www.oracle.com"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra consequat odio at posuere. Curabitur suscipit arcu ac commodo tincidunt. Etiam rutrum placerat enim, et tempor elit sollicitudin id."
            target="_blank"
            lineClamp={2}
          ></oj-c-labelled-link>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-2x-horizontal oj-md-margin-6x-vertical">
          <oj-c-labelled-link
            labelHint="Labelled link (Middle Truncation)"
            href="https://www.someverylongtextinaurlandwilltruncatewithoutenoughspace.com"
            target="_blank"
            {...({ truncation: "middle" } as ComponentProps<"oj-c-labelled-link">)}
          ></oj-c-labelled-link>
        </div>
      </div>

      <h4>Label Edge</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-labelled-link
          labelHint="Label edge inside"
          labelEdge="inside"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="Label edge top"
          labelEdge="top"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="Label edge start"
          labelEdge="start"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
      </oj-c-form-layout>

      <h4>Text Align</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-labelled-link
          labelHint="Start align"
          textAlign="start"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="End align"
          textAlign="end"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
        <oj-c-labelled-link
          labelHint="Right align"
          textAlign="right"
          href="https://www.oracle.com"
          target="_blank"
          containerReadonly={false}
        ></oj-c-labelled-link>
      </oj-c-form-layout>
    </div>
  );
}
