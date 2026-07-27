import { strictEqual } from "node:assert";
import type { FunctionComponent } from "preact";
import { nextAppliedPlayground } from "./applied-playground-state";

const FirstPreview: FunctionComponent = () => null;
const SecondPreview: FunctionComponent = () => null;

const firstApply = nextAppliedPlayground(undefined, FirstPreview);
strictEqual(firstApply?.Component, FirstPreview);
strictEqual(firstApply?.revision, 1);

const secondApply = nextAppliedPlayground(firstApply, SecondPreview);
strictEqual(secondApply?.Component, SecondPreview);
strictEqual(secondApply?.revision, 2);

strictEqual(nextAppliedPlayground(secondApply, undefined), undefined);
