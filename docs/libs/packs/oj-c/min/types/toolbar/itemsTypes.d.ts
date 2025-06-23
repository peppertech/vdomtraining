import { ComponentProps } from 'preact';
import { Button } from 'oj-c/button';
import { MenuButton, MenuSelection } from 'oj-c/menu-button';
import { SplitMenuButton } from 'oj-c/split-menu-button';
import { MenuIcon } from 'oj-c/utils/PRIVATE_ItemsMenu/menuTypes';
import { ButtonsetSingle } from 'oj-c/buttonset-single';
import { ButtonsetMultiple } from 'oj-c/buttonset-multiple';
import { ToggleButton } from 'oj-c/toggle-button';
import { ProgressButton } from 'oj-c/progress-button';
type ButtonIcons = {
    startIcon?: MenuIcon;
    endIcon?: MenuIcon;
};
export type ToolbarItems = ToolbarButton | ToolbarMenuButton | ToolbarSplitMenuButton | ToolbarButtonsetSingle | ToolbarButtonsetMultiple | ToolbarToggleButton | ToolbarProgressButton | ToolbarSeparator;
type ToolbarButtonProps = Pick<ComponentProps<typeof Button>, 'chroming' | 'disabled' | 'display' | 'label' | 'tooltip'> & ButtonIcons;
type ToolbarButton = {
    type: 'button';
    key: string;
    onAction?: () => void;
} & ToolbarButtonProps;
type ToolbarMenuButtonProps = Pick<ComponentProps<typeof MenuButton>, 'chroming' | 'disabled' | 'display' | 'items' | 'label' | 'tooltip' | 'suffix'> & ButtonIcons;
type ToolbarMenuButton = {
    type: 'menu-button';
} & ToolbarMenuButtonProps;
type ToolbarSplitMenuButtonProps = Pick<ComponentProps<typeof SplitMenuButton>, 'chroming' | 'disabled' | 'items' | 'label' | 'tooltip'>;
type ToolbarSplitMenuButton = {
    type: 'split-menu-button';
    key: string;
    onAction?: () => void;
} & ToolbarSplitMenuButtonProps;
type ToolbarButtonsetSingleProps = Pick<ComponentProps<typeof ButtonsetSingle>, 'chroming' | 'disabled' | 'display' | 'items'>;
type ToolbarButtonsetSingle = {
    type: 'buttonset-single';
    key: string;
} & ToolbarButtonsetSingleProps;
type ToolbarButtonsetMultipleProps = Pick<ComponentProps<typeof ButtonsetMultiple>, 'chroming' | 'disabled' | 'display' | 'items'>;
type ToolbarButtonsetMultiple = {
    type: 'buttonset-multiple';
    key: string;
} & ToolbarButtonsetMultipleProps;
type ToolbarToggleButtonProps = Pick<ComponentProps<typeof ToggleButton>, 'chroming' | 'disabled' | 'display' | 'label' | 'tooltip'> & ButtonIcons;
type ToolbarToggleButton = {
    type: 'toggle-button';
    key: string;
} & ToolbarToggleButtonProps;
type ToolbarProgressButtonProps = Pick<ComponentProps<typeof ProgressButton>, 'chroming' | 'disabled' | 'display' | 'label' | 'tooltip' | 'isLoading'> & ButtonIcons;
type ToolbarProgressButton = {
    type: 'progress-button';
    key: string;
    onAction?: () => void;
} & ToolbarProgressButtonProps;
type ToolbarSeparator = {
    type: 'separator';
};
export type ToolbarSelection = Record<string, MenuSelection> | Array<string> | string | boolean;
export type ToolbarValueUpdateDetail<T> = {
    previousValue?: T;
    value: T;
};
export type SelectToolbarItemDetail<T extends ToolbarSelection> = {
    value: ToolbarValueUpdateDetail<T>['value'];
    toolbarSelectionGroupKey: string;
};
export type ItemChroming = 'borderless' | 'outlined';
export type ItemSizes = 'sm' | 'md' | 'lg';
export interface ToolbarActionDetail {
    key: string;
}
export type ToolbarSelectionDetail = SelectToolbarItemDetail<ToolbarSelection>;
export {};
