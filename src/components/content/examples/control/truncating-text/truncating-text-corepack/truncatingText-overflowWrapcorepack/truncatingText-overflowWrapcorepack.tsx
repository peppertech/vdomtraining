import type { ComponentProps } from "preact";
import "css!./demo.css";
import { TruncatingText } from "oj-c/truncating-text";

type OverflowWrap = NonNullable<ComponentProps<typeof TruncatingText>["overflowWrap"]>;

const SAMPLE_TEXT = "panel with the long word antidisestablishmentarianism.";
const OVERFLOW_WRAP_OPTIONS: ReadonlyArray<{ label: string; overflowWrap: OverflowWrap }> = [
  { label: 'overflow-wrap="normal"', overflowWrap: "normal" },
  { label: 'overflow-wrap="breakWord"', overflowWrap: "breakWord" },
  { label: 'overflow-wrap="anywhere"', overflowWrap: "anywhere" }
];

export const TruncatingTextOverflowWrapcorepack = () => (
  <div>
    {OVERFLOW_WRAP_OPTIONS.map(({ label, overflowWrap }) => (
      <div key={overflowWrap}>
        <h6>{label}</h6>
        <p class="demo-width oj-panel oj-bg-warning-30">
          <TruncatingText overflowWrap={overflowWrap} value={SAMPLE_TEXT} />
        </p>
      </div>
    ))}
  </div>
);

export default TruncatingTextOverflowWrapcorepack;
