import { Sheet as PreactSheet } from '@oracle/oraclejet-preact/UNSAFE_Sheet';
import { ComponentProps } from 'preact';
type PreactSheetProps = ComponentProps<typeof PreactSheet>;
declare function Sheet({ isOpen, children, onClose, initialFocus }: Pick<PreactSheetProps, 'isOpen' | 'children' | 'onClose' | 'initialFocus'>): import("preact").JSX.Element;
export { Sheet };
