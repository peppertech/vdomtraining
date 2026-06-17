import { h } from "preact";
import type { ComponentProps } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "oj-c/buttonset-single";
import "oj-c/radioset";

type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
type ToggleItems = NonNullable<ComponentProps<"oj-c-buttonset-single">["items"]>;
type LayoutWidth = NonNullable<ComponentProps<"oj-c-buttonset-single">["layoutWidth"]>;

const layoutWidthItems = [
  { value: "auto", label: "Fit contents (default)" },
  { value: "equal", label: "Equal widths" }
];

const maxWidthItems = [
  { value: "false", label: "None" },
  { value: "true", label: "max-width: 400px" }
];

const getViewportWidth = () => (typeof window === "undefined" ? 1280 : innerWidth);

const getResponsiveItemLabels = (width: number): ToggleItems => {
  if (width < 768) {
    return [
      { value: "Home", label: "Home" },
      { value: "Guide", label: "Guide" },
      { value: "Lib", label: "Lib" }
    ];
  }

  return [
    { value: "Home", label: "Home", startIcon: { class: "oj-ux-ico-home" } },
    {
      value: "Guide",
      label: "Reference Guide",
      startIcon: { class: "oj-ux-ico-education" }
    },
    { value: "Lib", label: "Library", startIcon: { class: "oj-ux-ico-library" } }
  ];
};

export const ButtonsetsingleButtonsetWidthcorepack = () => {
  const [layoutWidthState, setLayoutWidthState] = useState<LayoutWidth>("auto");
  const [maxWidthState, setMaxWidthState] = useState("false");
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(getViewportWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemLabels = useMemo(() => getResponsiveItemLabels(viewportWidth), [viewportWidth]);
  const maxWidth = maxWidthState === "true" ? "400px" : undefined;

  const handleLayoutWidthChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "auto" || event.detail.value === "equal") {
      setLayoutWidthState(event.detail.value);
    }
  };

  const handleMaxWidthChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "true" || event.detail.value === "false") {
      setMaxWidthState(event.detail.value);
    }
  };

  return (
    <div id="buttonset-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          direction="row"
          value={layoutWidthState}
          labelHint="Layout Width"
          aria-controls="buttonsetwidths"
          options={layoutWidthItems}
          onvalueChanged={handleLayoutWidthChanged}
        />
        <oj-c-radioset
          labelHint="Buttonset Width"
          direction="row"
          value={maxWidthState}
          aria-controls="buttonsetwidths"
          options={maxWidthItems}
          onvalueChanged={handleMaxWidthChanged}
        />
      </div>

      <div id="buttonsetwidths" class="oj-sm-margin-4x-bottom">
        <p class="oj-typography-bold">Borderless Buttonset</p>
        <oj-c-buttonset-single
          id="borderless"
          value="Home"
          chroming="borderless"
          items={itemLabels}
          maxWidth={maxWidth}
          layoutWidth={layoutWidthState}
          aria-label="Choose only one item."
        />
      </div>

      <div class="oj-sm-margin-4x-bottom">
        <p class="oj-typography-bold">Outlined Buttonset</p>
        <oj-c-buttonset-single
          id="outlined"
          value="Home"
          items={itemLabels}
          maxWidth={maxWidth}
          layoutWidth={layoutWidthState}
          aria-label="Choose only one item."
        />
      </div>
    </div>
  );
};

export default ButtonsetsingleButtonsetWidthcorepack;
