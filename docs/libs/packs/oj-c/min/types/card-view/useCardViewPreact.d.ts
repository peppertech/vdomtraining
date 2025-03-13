import { ComponentProps } from 'preact';
import { CardGridView as PreactCardGridView } from '@oracle/oraclejet-preact/UNSAFE_CardGridView';
import { CardViewProps } from './card-view';
type PreactCardViewProps = ComponentProps<typeof PreactCardGridView>;
export declare const useCardViewPreact: <K extends string | number, D>({ "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, data: propData, gutterSize, focusBehavior, selected, onSelectedChanged, scrollPolicyOptions, selectionMode, initialAnimation, columns: corePackColumns, reorderable, onOjReorder, skeletonTemplate }: Partial<CardViewProps<K, D>>, addBusyState: (desc?: string) => () => void, isClickthroughDisabled: (target: EventTarget | null) => boolean) => {
    status: "error" | "loading" | "success";
    cardViewProps: PreactCardViewProps;
};
export {};
