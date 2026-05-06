define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DefaultDemoVersionHandler {
        constructor() {
        }
        getContentPath(iscorepack, isCorepackComponent) {
            return (iscorepack || isCorepackComponent) ? 'content_corepack/' : 'content/';
        }
        getDemoConfigUrlSuffix(componentId, demoId, iscorepack) {
            let isCorepackComponent = componentId.lastIndexOf("Corepack") > -1;
            componentId = isCorepackComponent ? componentId.replace("Corepack", "") : componentId;
            return this.getContentPath(iscorepack, isCorepackComponent) + componentId + '-' + demoId + '/config.json';
        }
        getDemoDescUrlSuffix(componentId, demoId, resourceType, iscorepack) {
            let isCorepackComponent = componentId.lastIndexOf("Corepack") > -1;
            componentId = isCorepackComponent ? componentId.replace("Corepack", "") : componentId;
            return this.getContentPath(iscorepack, isCorepackComponent) + componentId + '-' + demoId + '/description' + resourceType + '.html';
        }
        getDemoUrl(componentId, demoId, resourceType, iscorepack) {
            let isCorepackComponent = componentId.lastIndexOf("Corepack") > -1;
            componentId = isCorepackComponent ? componentId.replace("Corepack", "") : componentId;
            return this.getContentPath(iscorepack, isCorepackComponent) + componentId + '-' + demoId + '/demo' + resourceType + '.html';
        }
        getRecipeUrl(componentId, demoId, resourceType, iscorepack) {
            let isCorepackComponent = componentId.lastIndexOf("Corepack") > -1;
            componentId = isCorepackComponent ? componentId.replace("Corepack", "") : componentId;
            return this.getContentPath(iscorepack, isCorepackComponent) + componentId + '-' + demoId + '/recipe' + resourceType + '.html';
        }
        isSingleDemoFile() {
            return false;
        }
        ;
    }
    exports.default = DefaultDemoVersionHandler;
});
