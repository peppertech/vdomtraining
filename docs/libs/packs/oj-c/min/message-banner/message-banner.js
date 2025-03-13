define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MessageBanner", "@oracle/oraclejet-preact/hooks/UNSAFE_useMessagesContext", "ojs/ojvcomponent", "preact/hooks", "../hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojcontext", "css!oj-c/message-banner/message-banner-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MessageBanner_1, UNSAFE_useMessagesContext_1, ojvcomponent_1, hooks_1, useDataProvider_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageBanner = void 0;
    const severityOrder = {
        error: 0,
        warning: 1,
        info: 2,
        confirmation: 3,
        none: 4
    };
    const severityLevels = Object.keys(severityOrder).length;
    const severitySort = ({ data: dataA }, { data: dataB }) => {
        const severityA = dataA.severity ? severityOrder[dataA.severity] : severityLevels;
        const severityB = dataB.severity ? severityOrder[dataB.severity] : severityLevels;
        if (severityA !== severityB) {
            return severityA - severityB;
        }
        if (dataA.timestamp && dataB.timestamp) {
            const valueA = new Date(dataA.timestamp).valueOf();
            const valueB = new Date(dataB.timestamp).valueOf();
            return valueB - valueA;
        }
        return 0;
    };
    function MessageBannerImpl({ data, detailTemplateValue, messageTemplates, type = 'section', sorting = 'severity', onOjClose }) {
        const prevData = (0, hooks_1.useRef)(data);
        const rootRef = (0, hooks_1.useRef)();
        const [dpKey, setDpKey] = (0, hooks_1.useState)(0);
        const addBusyState = (0, hooks_1.useCallback)((description = 'MessageBanner: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const messagesContext = (0, hooks_1.useMemo)(() => ({ addBusyState }), [addBusyState]);
        if (data != prevData.current) {
            setDpKey((dpKey) => dpKey + 1);
            prevData.current = data;
        }
        const { data: dataArr } = (0, useDataProvider_1.useDataProvider)({
            data,
            addBusyState
        });
        const sortedData = (0, hooks_1.useMemo)(() => {
            if (sorting === 'off')
                return dataArr;
            const dataCopy = [...dataArr];
            return dataCopy.sort(severitySort);
        }, [dataArr, sorting]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useMessagesContext_1.MessagesContext.Provider, { value: messagesContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_MessageBanner_1.MessageBanner, { data: sortedData, detailRendererKey: detailTemplateValue, renderers: messageTemplates, variant: type, onClose: onOjClose }, `dp-${dpKey}`) }) }));
    }
    exports.MessageBanner = (0, ojvcomponent_1.registerCustomElement)('oj-c-message-banner', MessageBannerImpl, "MessageBanner", { "properties": { "data": { "type": "DataProvider" }, "type": { "type": "string", "enumValues": ["page", "section"] }, "detailTemplateValue": { "type": "string|function" }, "sorting": { "type": "string", "enumValues": ["off", "severity"] } }, "extension": { "_DYNAMIC_SLOT": { "prop": "messageTemplates", "isTemplate": 1 } }, "events": { "ojClose": {} } }, { "type": "section", "sorting": "severity" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
