define(["require", "exports", "preact/compat"], function (require, exports, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processTemplate = exports.processNodeTemplate = void 0;
    const getValidProp = (prop) => {
        return prop[0].toLowerCase() !== prop[0]
            ? prop.toLowerCase().replace(/-./g, (c) => c[1].toUpperCase())
            : prop;
    };
    const resolveProps = (props) => {
        return Object.keys(props).reduce((resolvedProps, prop) => {
            if (prop === 'children')
                return resolvedProps;
            resolvedProps[getValidProp(prop)] = props[prop];
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
