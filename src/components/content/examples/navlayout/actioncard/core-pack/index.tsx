/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import type { ComponentChildren, FunctionComponent } from "preact";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import ActionCardCorePack from "./actioncard-core-pack";
import { actioncardCorePackDescription } from "./actioncard-core-pack-description";
import { actioncardCorePackRecipe } from "./actioncard-core-pack-recipe";

type DemoDefinition = {
  componentType: string;
  packLabel?: string;
  title: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const initialDemo: DemoDefinition = {
  componentType: "oj-c-action-card",
  packLabel: "Core Pack",
  title: "Action Card",
  description: actioncardCorePackDescription,
  recipe: actioncardCorePackRecipe,
  Component: ActionCardCorePack,
};

export default function ActionCardCorePackDemoWrapper() {
  const SelectedDemoComponent = initialDemo.Component;

  return (
    <main class="oj-web-applayout-max-width oj-web-applayout-content oj-sm-padding-4x">
      <DemoLayoutTemplate
        componentType={initialDemo.componentType}
        packLabel={initialDemo.packLabel}
        demoName={initialDemo.title}
        description={initialDemo.description}
        recipe={initialDemo.recipe}
        demo={<SelectedDemoComponent />}
      />
    </main>
  );
}
