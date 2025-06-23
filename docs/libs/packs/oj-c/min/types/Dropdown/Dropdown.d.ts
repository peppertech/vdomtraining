import { Dropdown as PreactDropdown } from '@oracle/oraclejet-preact/UNSAFE_Dropdown';
import { ComponentProps } from 'preact';
type PreactDropdownProps = ComponentProps<typeof PreactDropdown>;
declare function Dropdown({ anchorRef, isOpen, children, onClose, initialFocus }: Pick<PreactDropdownProps, 'anchorRef' | 'isOpen' | 'children' | 'onClose' | 'initialFocus'>): import("preact").JSX.Element;
export { Dropdown };
