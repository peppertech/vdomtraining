import { ComponentProps } from 'preact';
import { FormContextProps } from '@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext';
import type { TextArea } from 'oj-c/text-area';
type TextAreaProps = ComponentProps<typeof TextArea>;
type Props = {
    propContainerReadonly: TextAreaProps['containerReadonly'];
    propLabelWrapping: TextAreaProps['labelWrapping'];
    propReadonly: TextAreaProps['readonly'];
    propUserAssistanceDensity: TextAreaProps['userAssistanceDensity'];
};
export declare function useMergedFormContext({ propContainerReadonly, propLabelWrapping, propReadonly, propUserAssistanceDensity }: Props): {
    containerProps: FormContextProps;
    readonlyValue: boolean | undefined;
    uadValue: import("@oracle/oraclejet-preact/dist/types/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
};
export {};
