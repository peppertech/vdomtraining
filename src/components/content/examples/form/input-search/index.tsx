/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import type { ComponentChildren, FunctionComponent } from "preact";
import InputSearchBasic from "./input-search";
import { inputSearchBasicDescription } from "./input-search-description";
import { inputSearchBasicRecipe } from "./input-search-recipe";
import { DemoLayoutTemplate } from "../../../../shared/demo-page-layout/demo-layout-template";

type DemoDefinition = {
  componentType: string;
  title: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const initialDemo: DemoDefinition = {
  componentType: "oj-input-search",
  title: "Input Search",
  description: inputSearchBasicDescription,
  recipe: inputSearchBasicRecipe,
  Component: InputSearchBasic,
};

export default function InputSearchDemoWrapper() {
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
