import { ExtendGlobalProps, registerCustomElement } from "ojs/ojvcomponent";
import { ComponentProps, ComponentType } from "preact";
import componentStrings = require("ojL10n!./resources/nls/my-test-strings");
import "css!./my-test-styles.css";

type Props = Readonly<{
  message?: string;
}>;

/**
 * 
 * @ojmetadata version "1.0.0"
 * @ojmetadata displayName "A user friendly, translatable name of the component"
 * @ojmetadata description "A translatable high-level description for the component"
 * 
 */
function MyTestImpl(
  { message = "Hello from  my-test" }: Props
) {
  return (
    <div>
      <p>{message}</p>
      <div class="test-image" aria-label="testing image" role="img"></div>
      <img src={'resources/images/test.jpg'} aria-label="testing second image"/>
    </div>
  )
}

export const MyTest: ComponentType <
  ExtendGlobalProps < ComponentProps < typeof MyTestImpl>>
> = registerCustomElement(
    "my-test",
  MyTestImpl
);