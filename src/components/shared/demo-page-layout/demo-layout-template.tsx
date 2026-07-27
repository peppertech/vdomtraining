/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import "css!./demo-layout-template.css";
import type { ComponentChildren, FunctionComponent } from "preact";
import {
  TsxPlayground,
  type PlaygroundConfig,
} from "../code-playground/tsx-playground";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import {
  nextAppliedPlayground,
  type AppliedPlayground,
} from "./applied-playground-state";

let playgroundScopeSequence = 0;

type Props = Readonly<{
  componentType?: string;
  packLabel?: string;
  demoName?: string;
  description?: ComponentChildren;
  recipe?: ComponentChildren;
  demo?: ComponentChildren;
  playground?: PlaygroundConfig;
}>;

export function DemoLayoutTemplate({
  componentType,
  packLabel,
  demoName,
  description,
  recipe,
  demo,
  playground,
}: Props) {
  const [appliedPlayground, setAppliedPlayground] =
    useState<AppliedPlayground>();
  const playgroundScopeRef = useRef(
    `tsx-playground-${playgroundScopeSequence++}`,
  );
  const updatePlaygroundComponent = useCallback(
    (component: FunctionComponent | undefined) => {
      setAppliedPlayground((current) =>
        nextAppliedPlayground(current, component),
      );
    },
    [],
  );

  useEffect(() => setAppliedPlayground(undefined), [playground?.initialSource]);
  const PlaygroundDemo = appliedPlayground?.Component;

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
        <div
          key={appliedPlayground?.revision ?? "original"}
          class="demo-layout-template__demo-body"
          data-tsx-playground-scope={
            playground ? playgroundScopeRef.current : undefined
          }
        >
          {PlaygroundDemo ? <PlaygroundDemo /> : demo}
        </div>
      </section>

      {playground && (
        <TsxPlayground
          ariaLabel={`${demoName ?? componentType ?? "Component"} code editor`}
          initialSource={playground.initialSource}
          fileName={playground.fileName}
          runtimeBindings={playground.runtimeBindings}
          supportingFiles={playground.supportingFiles}
          cssScope={playgroundScopeRef.current}
          infoContent={recipe}
          onComponentChange={updatePlaygroundComponent}
        />
      )}

      {!playground && (
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
          <div class="demo-layout-template__recipe-body oj-typography-body-md">
            {recipe}
          </div>
        </section>
      )}
    </article>
  );
}
