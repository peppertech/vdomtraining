define(["require", "exports", "preact/jsx-runtime", "preact", "@oracle/oraclejet-preact/hooks/UNSAFE_useId", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useInputGroupContext", "@oracle/oraclejet-preact/UNSAFE_UserAssistance", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormFieldContext", "@oracle/oraclejet-preact/UNSAFE_Flex", "@oracle/oraclejet-preact/UNSAFE_Label", "@oracle/oraclejet-preact/UNSAFE_LabelValueLayout", "@oracle/oraclejet-preact/hooks/UNSAFE_useFocusWithin", "../../editable-value/UNSAFE_useAssistiveText/useAssistiveText"], function (require, exports, jsx_runtime_1, preact_1, UNSAFE_useId_1, UNSAFE_useFormContext_1, UNSAFE_useInputGroupContext_1, UNSAFE_UserAssistance_1, UNSAFE_useFormFieldContext_1, UNSAFE_Flex_1, UNSAFE_Label_1, UNSAFE_LabelValueLayout_1, UNSAFE_useFocusWithin_1, useAssistiveText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputGroup = void 0;
    const normalizeLabelEdge = (edge) => (edge === 'inside' ? 'top' : edge);
    const normalizeDensity = (density) => {
        return density === 'efficient' || density === 'reflow' ? density : undefined;
    };
    function InputGroup({ id, children, labelHint, displayOptions, help, helpHints, readonly, containerReadonly, labelWrapping, labelStartWidth, onBlur, onFocus, isRequiredShown, userAssistanceId, messagesCustom, disabled = false, labelEdge: labelEdgeProp, userAssistanceDensity: userAssistanceDensityProp, ...otherProps }) {
        const labelEdge = normalizeLabelEdge(labelEdgeProp);
        const userAssistanceDensity = normalizeDensity(userAssistanceDensityProp);
        const uaFromHook = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity
        });
        const assistiveTextProps = disabled === true ? {} : uaFromHook;
        const { focusProps } = (0, UNSAFE_useFocusWithin_1.useFocusWithin)({
            onBlurWithin: onBlur,
            onFocusWithin: onFocus
        });
        const { focusProps: groupFocusProps, isFocused } = (0, UNSAFE_useFocusWithin_1.useFocusWithin)();
        const isStartTop = labelHint !== undefined && (labelEdge === 'start' || labelEdge === 'top');
        const containerProps = {
            isFormLayout: containerReadonly !== undefined,
            isReadonly: containerReadonly,
            labelWrapping
        };
        const childrenArray = (0, preact_1.toChildArray)(children).filter(Boolean);
        const wrappedChildren = childrenArray.map((inputChild, index) => {
            const last = index === childrenArray.length - 1;
            return ((0, jsx_runtime_1.jsx)(UNSAFE_useInputGroupContext_1.InputGroupContext.Provider, { value: { index, last }, children: inputChild }));
        });
        const innerContent = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ...focusProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_Flex_1.Flex, { children: wrappedChildren }) }), !readonly && !disabled && ((0, jsx_runtime_1.jsx)(UNSAFE_useFormFieldContext_1.FormFieldContext.Provider, { value: { isFocused }, children: (0, jsx_runtime_1.jsx)(UNSAFE_UserAssistance_1.InlineUserAssistance, { id: userAssistanceId, messages: messagesCustom, userAssistanceDensity: userAssistanceDensity, isRequiredShown: isRequiredShown, ...assistiveTextProps }) }))] }));
        const labelId = 'group_label_' + (0, UNSAFE_useId_1.useId)();
        const labelComp = isStartTop && ((0, jsx_runtime_1.jsx)(UNSAFE_Label_1.Label, { ...assistiveTextProps, id: labelId, userAssistanceDensity: userAssistanceDensity, variant: labelEdge, children: labelHint }));
        const inputGroupChildren = isStartTop ? ((0, jsx_runtime_1.jsx)(UNSAFE_LabelValueLayout_1.LabelValueLayout, { label: labelComp, labelEdge: labelEdge, labelStartWidth: labelStartWidth, children: innerContent })) : (innerContent);
        return ((0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)("div", { id: id, role: "group", ...groupFocusProps, ...(labelEdge === 'none' ? { 'aria-label': labelHint } : { 'aria-labelledby': labelId }), ...(otherProps['aria-describedby'] !== undefined
                    ? { 'aria-describedby': otherProps['aria-describedby'] }
                    : {}), children: inputGroupChildren }) }));
    }
    exports.InputGroup = InputGroup;
});
