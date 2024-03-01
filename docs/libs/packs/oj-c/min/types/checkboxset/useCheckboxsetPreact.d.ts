import { ComponentProps } from 'preact';
import { Checkboxset } from './checkboxset';
import { ValueUpdateDetail } from '@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail';
type CheckboxsetProps = ComponentProps<typeof Checkboxset>;
export declare function useCheckboxsetPreact({ 'aria-describedby': ariaDescribedBy, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }: CheckboxsetProps, addBusyState: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    checkboxsetProps: Omit<{
        'aria-describedby'?: string | undefined;
        assistiveText?: string | undefined;
        children: import("preact").ComponentChildren;
        columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
        direction?: "row" | "column" | undefined;
        helpSourceLink?: string | undefined;
        helpSourceText?: string | undefined;
        isRequired?: boolean | undefined;
        isReadonly?: boolean | undefined;
        isDisabled?: boolean | undefined;
        label: string;
        labelEdge?: "none" | "start" | "top" | "inside" | undefined;
        labelStartWidth?: import("@oracle/oraclejet-preact/utils/UNSAFE_size").Size | undefined;
        messages?: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        onCommit: (detail: ValueUpdateDetail<Set<string | number>>) => void;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: Set<string | number> | undefined;
    }, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
