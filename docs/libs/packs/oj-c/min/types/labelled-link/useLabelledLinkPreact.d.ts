import type { LabelledLinkProps } from './labelled-link';
export declare function useLabelledLinkPreact({ 'aria-describedby': ariaDescribedBy, href, labelEdge, labelHint, labelStartWidth, target, text, textAlign, userAssistanceDensity, onOjAction }: LabelledLinkProps): {
    target?: string | undefined;
    onClick?: ((event: Event) => void) | undefined;
    href: string;
    'aria-describedby'?: string | undefined;
} & {
    children?: string | undefined;
    columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
    label: string;
    labelEdge?: "none" | "start" | "top" | "inside" | undefined;
    labelStartWidth?: import("@oracle/oraclejet-preact/utils/UNSAFE_size").Size | undefined;
    textAlign?: "end" | "start" | "right" | undefined;
    userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
};
