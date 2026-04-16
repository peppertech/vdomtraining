/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import type { ComponentChildren, FunctionComponent } from "preact";
import FormLayoutBasic from "./form-layout";
import { formLayoutBasicDescription } from "./form-layout-description";
import { formLayoutBasicRecipe } from "./form-layout-recipe";
import { DemoLayoutTemplate } from "../../../../shared/demo-page-layout/demo-layout-template";

type DemoDefinition = {
  componentType: string;
  title: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const initialDemo: DemoDefinition = {
  componentType: "oj-form-layout",
  title: "Form Layout",
  description: formLayoutBasicDescription,
  recipe: formLayoutBasicRecipe,
  Component: FormLayoutBasic,
};

export default function FormLayoutDemoWrapper() {
  const SelectedDemoComponent = initialDemo.Component;

  return (
    <main class="oj-web-applayout-max-width oj-web-applayout-content oj-sm-padding-4x">
      <DemoLayoutTemplate
        componentType={initialDemo.componentType}
        demoName={initialDemo.title}
        description={initialDemo.description}
        recipe={initialDemo.recipe}
        demo={<SelectedDemoComponent />}
      />
    </main>
  );
}
