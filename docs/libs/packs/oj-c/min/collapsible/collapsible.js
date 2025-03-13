define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Collapsible", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojcontext", "css!oj-c/collapsible/collapsible-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Collapsible_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collapsible = void 0;
    exports.Collapsible = (0, ojvcomponent_1.registerCustomElement)('oj-c-collapsible', ({ id, children, header, disabled = false, expanded = false, iconPosition = 'start', variant = 'basic', ...props }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const didMountRef = (0, hooks_1.useRef)(false);
        const hasBeenExpanded = (0, hooks_1.useRef)(expanded);
        const resolveBusyState = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return Context.getContext(rootRef.current)
                .getBusyContext()
                ?.addBusyState({
                description: `oj-c-collapsible: id='${id}' is ${desc}.`
            });
        }, [id]);
        (0, hooks_1.useEffect)(() => {
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (expanded) {
                hasBeenExpanded.current = true;
            }
            if (resolveBusyState.current) {
                resolveBusyState.current();
            }
            resolveBusyState.current = addBusyState('animating');
        }, [expanded, addBusyState]);
        const toggleHandler = async (event) => {
            let target = event.target;
            for (; target && target !== rootRef?.current; target = target.parentElement) {
                if (target.getAttribute('data-oj-clickthrough') === 'disabled') {
                    return;
                }
            }
            const beforeProp = event.value ? props.onOjBeforeExpand : props.onOjBeforeCollapse;
            try {
                await beforeProp?.(event);
                props.onExpandedChanged?.(event.value);
            }
            catch (_) {
            }
        };
        const transitionEndHandler = (event) => {
            const expandedProp = event.value ? props.onOjExpand : props.onOjCollapse;
            expandedProp?.(event);
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_Collapsible_1.Collapsible, { header: header, iconPosition: iconPosition, variant: variant, isExpanded: expanded, isDisabled: disabled, onToggle: toggleHandler, onTransitionEnd: transitionEndHandler, children: (expanded || hasBeenExpanded.current) && children }) }));
    }, "Collapsible", { "slots": { "": {}, "header": {} }, "properties": { "disabled": { "type": "boolean" }, "expanded": { "type": "boolean", "writeback": true }, "iconPosition": { "type": "string", "enumValues": ["end", "start"] }, "variant": { "type": "string", "enumValues": ["basic", "horizontal-rule"] } }, "events": { "ojBeforeCollapse": { "cancelable": true }, "ojBeforeExpand": { "cancelable": true }, "ojCollapse": {}, "ojExpand": {} }, "extension": { "_WRITEBACK_PROPS": ["expanded"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["id"] } }, { "disabled": false, "expanded": false, "iconPosition": "start", "variant": "basic" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
