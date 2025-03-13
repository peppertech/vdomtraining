define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Skeleton", "ojs/ojvcomponent"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Skeleton_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Skeleton = void 0;
    const SkeletonImpl = ({ height, width, borderRadius }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Skeleton_1.Skeleton, { height: height, width: width, borderRadius: borderRadius }) }));
    };
    exports.Skeleton = (0, ojvcomponent_1.registerCustomElement)('oj-c-skeleton', SkeletonImpl, "Skeleton", { "properties": { "height": { "type": "number|string" }, "width": { "type": "number|string" }, "borderRadius": { "type": "number|string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
