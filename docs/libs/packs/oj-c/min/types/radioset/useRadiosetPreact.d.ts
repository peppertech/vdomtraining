import { ComponentProps } from 'preact';
import { Radioset } from './radioset';
type RadiosetProps = ComponentProps<typeof Radioset>;
export declare function useRadiosetPreact({ direction, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged, ...otherProps }: RadiosetProps, addBusyState: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    radiosetProps: Omit<import("@oracle/oraclejet-preact/hooks/UNSAFE_useTestId").TestIdProps & {
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
        onCommit: (detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string | number | undefined>) => void;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: string | number | undefined;
    }, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
