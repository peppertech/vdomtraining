define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pre710DemoVersionHandler {
        constructor() {
        }
        getDemoConfigUrlSuffix(componentId, demoId) {
            return 'demo/demo-' + componentId + '-' + demoId + '.json';
        }
        getDemoDescUrlSuffix(componentId, demoId, resourceType) {
            return 'demo/cookbook/' + componentId + '/' + demoId + '/description' + resourceType + '.html';
        }
        getDemoUrl(componentId, demoId, resourceType) {
            return 'demo/demo-' + componentId + '-' + demoId + resourceType + '.html';
        }
        getRecipeUrl(componentId, demoId, resourceType) {
            return 'demo/cookbook/' + componentId + '/' + demoId + '/recipe' + resourceType + '.html';
        }
        isSingleDemoFile() {
            return true;
        }
        ;
    }
    exports.default = Pre710DemoVersionHandler;
});
