define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "@oracle/oraclejet-preact/UNSAFE_ConveyorBelt", "@oracle/oraclejet-preact/hooks/UNSAFE_useUser", "ojs/ojvcomponent", "preact/hooks", "preact/compat", "./conveyorBeltItem", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "css!oj-c/conveyor-belt/conveyor-belt-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, UNSAFE_ConveyorBelt_1, UNSAFE_useUser_1, ojvcomponent_1, hooks_1, compat_1, conveyorBeltItem_1, useDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConveyorBelt = void 0;
    function isDataProvider(items) {
        return (items && 'fetchFirst' in items) || false;
    }
    const ConveyorBeltPreactWrapper = (0, compat_1.forwardRef)(({ addBusyState, onScrollPositionChanged, items, itemTemplate, children, ...rest }, ref) => {
        const conveyorRef = (0, hooks_1.useRef)(null);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            scrollElementIntoView: (element) => conveyorRef.current?.scrollElementIntoView(element),
            scrollPrevious: () => conveyorRef.current?.scrollPrevious(),
            scrollNext: () => conveyorRef.current?.scrollNext()
        }), []);
        const isFromDataProvider = isDataProvider(items);
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isFromDataProvider ? items : undefined,
            addBusyState
        });
        const dataArr = (0, hooks_1.useMemo)(() => {
            const clonedOptions = !isFromDataProvider && items
                ? [...items].map((item) => {
                    const metadata = { key: item.key };
                    return {
                        key: item.key,
                        data: {
                            data: item.data,
                            metadata: metadata
                        }
                    };
                })
                : [];
            return isFromDataProvider
                ? Array.isArray(data)
                    ? data.map((item) => {
                        const metadata = { key: item.key };
                        return {
                            key: item.key,
                            data: {
                                data: item.data,
                                metadata: item.metadata ?? metadata
                            }
                        };
                    })
                    : []
                : clonedOptions;
        }, [data, isFromDataProvider, items]);
        const scrollPositionChangedHandler = (value) => {
            if (value)
                onScrollPositionChanged?.(value);
        };
        const childrenContent = itemTemplate
            ? dataArr.map((dataObj, index) => {
                const context = {
                    index: index,
                    data: dataObj.data,
                    metadata: dataObj.data.metadata
                };
                return (0, jsx_runtime_1.jsx)(conveyorBeltItem_1.ConveyorBeltItem, { context: context, itemTemplate: itemTemplate });
            })
            : children;
        return ((0, jsx_runtime_1.jsx)(UNSAFE_ConveyorBelt_1.ConveyorBelt, { onScrollPositionChanged: scrollPositionChangedHandler, ref: conveyorRef, ...rest, children: childrenContent }));
    });
    const ConveyorBeltComp = ({ children, orientation = 'horizontal', ...rest }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const conveyorBeltRef = (0, hooks_1.useRef)(null);
        const busyContextRef = (0, hooks_1.useRef)(Context.getContext(rootRef.current).getBusyContext());
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-conveyor-belt: ${desc}`
            });
        }, []);
        const { direction } = (0, UNSAFE_useUser_1.useUser)();
        const keyDownHandler = (event) => {
            if (event.target !== rootRef.current) {
                return;
            }
            if (orientation === 'horizontal') {
                switch (event.key) {
                    case 'ArrowRight':
                        if (direction === 'rtl') {
                            conveyorBeltRef.current?.scrollPrevious();
                        }
                        else {
                            conveyorBeltRef.current?.scrollNext();
                        }
                        event.preventDefault();
                        break;
                    case 'ArrowLeft':
                        if (direction === 'rtl') {
                            conveyorBeltRef.current?.scrollNext();
                        }
                        else {
                            conveyorBeltRef.current?.scrollPrevious();
                        }
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            }
            else if (orientation === 'vertical') {
                switch (event.key) {
                    case 'ArrowDown':
                        conveyorBeltRef.current?.scrollNext();
                        event.preventDefault();
                        break;
                    case 'ArrowUp':
                        conveyorBeltRef.current?.scrollPrevious();
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            }
        };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            scrollElementIntoView: (element) => conveyorBeltRef.current?.scrollElementIntoView(element)
        }), []);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, onKeyDown: keyDownHandler, children: (0, jsx_runtime_1.jsx)(ConveyorBeltPreactWrapper, { ref: conveyorBeltRef, addBusyState: addBusyState, orientation: orientation, ...rest, children: children }) }));
    };
    exports.ConveyorBelt = (0, ojvcomponent_1.registerCustomElement)('oj-c-conveyor-belt', (0, compat_1.forwardRef)(ConveyorBeltComp), "ConveyorBelt", { "slots": { "": {}, "itemTemplate": { "data": {} } }, "properties": { "scrollPosition": { "type": "number", "writeback": true }, "arrowVisibility": { "type": "string", "enumValues": ["auto", "hidden", "visible"] }, "items": { "type": "Array<object>|DataProvider" }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] } }, "extension": { "_WRITEBACK_PROPS": ["scrollPosition"], "_READ_ONLY_PROPS": [] }, "methods": { "scrollElementIntoView": {} } }, { "orientation": "horizontal" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
