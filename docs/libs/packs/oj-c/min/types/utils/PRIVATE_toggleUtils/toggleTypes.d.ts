export type ToggleIcon = {
    type?: 'class';
    class: string;
} | {
    type: 'img';
    src: string;
};
export type ToggleItem = {
    label: string;
    value: string;
    disabled?: boolean;
    startIcon?: ToggleIcon;
    endIcon?: ToggleIcon;
};
