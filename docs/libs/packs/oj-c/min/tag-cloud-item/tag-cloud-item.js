define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloudItem = exports.TagCloudItemDefaults = void 0;
    exports.TagCloudItemDefaults = {
        categories: []
    };
    exports.TagCloudItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-tag-cloud-item', ({ categories = exports.TagCloudItemDefaults.categories, ...props }) => {
        return null;
    }, "TagCloudItem", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "label": { "type": "string" }, "value": { "type": "number|null" }, "url": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "categories": [] }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
