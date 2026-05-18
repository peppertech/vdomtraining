import type { ComponentProps } from "preact";
import "css!./demo.css";
import { TruncatingText } from "oj-c/truncating-text";

type Truncation = NonNullable<ComponentProps<typeof TruncatingText>["truncation"]>;
type LineClamp = NonNullable<ComponentProps<typeof TruncatingText>["lineClamp"]>;

const SAMPLE_TEXT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

const TRUNCATION_OPTIONS: ReadonlyArray<{ label: string; truncation: Truncation }> = [
  { label: 'truncation="none"', truncation: "none" },
  { label: 'truncation="clip"', truncation: "clip" },
  { label: 'truncation="ellipsis"', truncation: "ellipsis" }
];

const LINE_CLAMP_OPTIONS: ReadonlyArray<{ label: string; lineClamp: LineClamp }> = [
  { label: 'line-clamp="1"', lineClamp: 1 },
  { label: 'line-clamp="2"', lineClamp: 2 },
  { label: 'line-clamp="3"', lineClamp: 3 },
  { label: 'line-clamp="4"', lineClamp: 4 }
];

export const TruncatingTextTruncationAndLineClampcorepack = () => (
  <div>
    {TRUNCATION_OPTIONS.map(({ label, truncation }) => (
      <div key={label}>
        <h6>{label}</h6>
        <div class="oj-sm-width-1/5 oj-panel oj-bg-warning-30">
          <TruncatingText truncation={truncation} value={SAMPLE_TEXT} />
        </div>
      </div>
    ))}
    {LINE_CLAMP_OPTIONS.map(({ label, lineClamp }) => (
      <div key={label}>
        <h6>{label}</h6>
        <div class="oj-sm-width-1/5 oj-panel oj-bg-warning-30">
          <TruncatingText lineClamp={lineClamp} value={SAMPLE_TEXT} />
        </div>
      </div>
    ))}
  </div>
);

export default TruncatingTextTruncationAndLineClampcorepack;
