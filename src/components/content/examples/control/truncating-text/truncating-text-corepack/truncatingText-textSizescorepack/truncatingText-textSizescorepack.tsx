import "css!./demo.css";
import { TruncatingText } from "oj-c/truncating-text";
import type { ComponentProps } from "preact";

type Size = NonNullable<ComponentProps<typeof TruncatingText>["size"]>;

const SIZE_OPTIONS: ReadonlyArray<Size> = ["inherit", "2xs", "xs", "sm", "md", "lg", "xl"];

export const TruncatingTextTextSizescorepack = () => (
  <div>
    {SIZE_OPTIONS.map((size) => (
      <div key={size}>
        <TruncatingText size={size} value={size} />
      </div>
    ))}
  </div>
);

export default TruncatingTextTextSizescorepack;
