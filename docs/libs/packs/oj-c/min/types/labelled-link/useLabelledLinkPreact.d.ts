import type { LabelledLink } from '@oracle/oraclejet-preact/UNSAFE_LabelledLink';
import { ComponentProps } from 'preact';
import type { LabelledLinkProps } from './labelled-link';
type PreactLabelledLinkProps = ComponentProps<typeof LabelledLink>;
export declare function useLabelledLinkPreact({ 'aria-describedby': ariaDescribedBy, href, labelEdge, labelHint, labelStartWidth, target, text, textAlign, userAssistanceDensity, onOjAction }: LabelledLinkProps): PreactLabelledLinkProps;
export {};
