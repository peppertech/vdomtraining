import "css!./demo.css";
import { TruncatingText } from "oj-c/truncating-text";
import type { ComponentProps } from "preact";

type Hyphens = NonNullable<ComponentProps<typeof TruncatingText>["hyphens"]>;

const SAMPLE_TEXT = "panel with the long word antidisestablishmentarianism";
const HYphen_OPTIONS: ReadonlyArray<{ label: string; hyphens: Hyphens }> = [
  { label: 'hyphens="none"', hyphens: "none" },
  { label: 'hyphens="auto"', hyphens: "auto" }
];

export const TruncatingTextHyphenscorepack = () => (
  <div>
    {HYphen_OPTIONS.map(({ label, hyphens }) => (
      <div key={hyphens}>
        <h6>{label}</h6>
        <p class="truncating-text-hyphens-demo-width oj-panel oj-bg-warning-30">
          <TruncatingText hyphens={hyphens} value={SAMPLE_TEXT} />
        </p>
      </div>
    ))}
  </div>
);

export default TruncatingTextHyphenscorepack;
