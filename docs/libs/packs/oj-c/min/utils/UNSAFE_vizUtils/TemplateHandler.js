define(["require", "exports", "preact/compat"], function (require, exports, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processTemplate = exports.processNodeTemplate = void 0;
    const PRIVATE_VALUE_KEY = '__oj_private_do_not_use_value';
    const PRIVATE_CHECKED_KEY = '__oj_private_do_not_use_checked';
    const convertPrivatePropFromPreact = (prop, value) => {
        if (prop === PRIVATE_VALUE_KEY) {
            return { prop: 'value', value: typeof value !== 'symbol' ? value : undefined };
        }
        if (prop === PRIVATE_CHECKED_KEY) {
            return { prop: 'checked', value: typeof value !== 'symbol' ? value : undefined };
        }
        return { prop, value };
    };
    const getValidProp = (prop) => {
        return prop[0].toLowerCase() !== prop[0]
            ? prop.toLowerCase().replace(/-./g, (c) => c[1].toUpperCase())
            : prop;
    };
    const resolveProps = (props) => {
        return Object.keys(props).reduce((resolvedProps, origProp) => {
            if (origProp === 'children')
                return resolvedProps;
            const { prop, value } = convertPrivatePropFromPreact(origProp, props[origProp]);
            resolvedProps[getValidProp(prop)] = value;
            return resolvedProps;
        }, {});
    };
    const processNodeTemplate = (datum, template, context, templateName) => {
        const children = template(context);
        const node = compat_1.Children.toArray(children).find((child) => {
            if (!child || !child.props) {
                return;
            }
            return (child.props?.children?.type || child.type) === templateName;
        });
        const props = node?.type === templateName ? node.props : (node?.props?.children).props;
        const key = datum.key || datum.metadata?.key;
        return props
            ? { ...resolveProps(props), key, id: key, _itemData: datum.data }
            : { key, id: key, _itemData: datum.data };
    };
    exports.processNodeTemplate = processNodeTemplate;
    const processTemplate = (data, template, getContext, templateName) => {
        return data.map((datum, index) => (0, exports.processNodeTemplate)(datum, template, getContext(datum, index), templateName));
    };
    exports.processTemplate = processTemplate;
});
