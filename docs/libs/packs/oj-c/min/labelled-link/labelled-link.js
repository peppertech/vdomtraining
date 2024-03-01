define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_LabelledLink", "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "../utils/UNSAFE_focusTabUtils/index", "./useLabelledLinkPreact", "css!oj-c/labelled-link/labelled-link-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_LabelledLink_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useTabbableMode_1, Layout_1, ojvcomponent_1, compat_1, hooks_1, index_1, useLabelledLinkPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelledLink = void 0;
    const LabelledLinkImpl = (props, ref) => {
        const containerProps = {
            isFormLayout: props.containerReadonly !== undefined,
            isReadonly: props.containerReadonly,
            labelWrapping: props.labelWrapping
        };
        const accessibleProps = {
            UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
        };
        const preactProps = (0, useLabelledLinkPreact_1.useLabelledLinkPreact)(props);
        const rootRef = (0, hooks_1.useRef)(null);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => {
                if (rootRef.current?.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
            },
            focus: () => (0, index_1.focusFirstTabStop)(rootRef.current)
        }));
        const { columnSpan = 1 } = props;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_LabelledLink_1.LabelledLink, { ...preactProps }) }) }) }));
    };
    exports.LabelledLink = (0, ojvcomponent_1.registerCustomElement)('oj-c-labelled-link', (0, compat_1.forwardRef)(LabelledLinkImpl), "LabelledLink", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "href": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "target": { "type": "string" }, "text": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } } }, "events": { "ojAction": {} }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby"] }, "methods": { "blur": {}, "focus": {} } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, {
        consume: [UNSAFE_useTabbableMode_1.TabbableModeContext]
    });
});
