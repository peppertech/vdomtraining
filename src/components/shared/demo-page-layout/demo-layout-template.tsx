/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import type { ComponentChildren } from "preact";
import "css!./demo-layout-template.css";

type Props = Readonly<{
  componentType?: string;
  packLabel?: string;
  demoName?: string;
  description?: ComponentChildren;
  recipe?: ComponentChildren;
  demo?: ComponentChildren;
}>;

export function DemoLayoutTemplate({
  componentType,
  packLabel,
  demoName,
  description,
  recipe,
  demo,
}: Props) {
  return (
    <article class="demo-layout-template">
      <header class="demo-layout-template__header">
        {demoName && (
          <h1 class="demo-layout-template__title oj-typography-heading-sm">
            {demoName}
          </h1>
        )}
        {(componentType || packLabel) && (
          <div class="demo-layout-template__eyebrow">
            {componentType && (
              <span class="demo-layout-template__component-type">
                {componentType}
              </span>
            )}
            {packLabel && (
              <span class="oj-sm-margin-2x-horizontal oj-link-subtle-primary oj-badge oj-badge-sm oj-badge-success">
                {packLabel}
              </span>
            )}
          </div>
        )}

        {description && (
          <div class="demo-layout-template__description oj-typography-body-md">
            {description}
          </div>
        )}
      </header>

      <section
        aria-labelledby="demo-layout-template-demo-heading"
        class="demo-layout-template__demo-section"
      >
        <div>{demo}</div>
      </section>

      <section
        aria-labelledby="demo-layout-template-recipe-heading"
        class="demo-layout-template__recipe-section"
      >
        <h2
          id="demo-layout-template-recipe-heading"
          class="oj-typography-heading-md"
        >
          Recipe
          <hr/>
        </h2>
        <div class="demo-layout-template__recipe-body">{recipe}</div>
      </section>
    </article>
  );
}
