define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBApplicationModel {
        constructor(resourceManager, demoAppId, demoConfig) {
            this._RM = resourceManager;
            this._demoAppId = demoAppId;
            this._demoConfig = demoConfig;
        }
        ;
        getDemoAppId() {
            return this._demoAppId;
        }
        ;
        getDemoConfig() {
            return this._demoConfig;
        }
        ;
        getApplicationDescriptor() {
            return this._RM.getResource('app-flow.json').then(function (result) {
                return result.getContent();
            });
        }
        ;
        getApplicationFunctionsResource() {
            return this._RM.getResource('app-flow.js');
        }
        ;
        getPageFunctionsResource(page) {
            return this._RM.getResource(page + '-page.js');
        }
        ;
        getPageDescriptorResource(page) {
            return this._RM.getResource(page + '-page.json');
        }
        ;
        getPageTemplate(page) {
            return this._RM.getResource(page + '-page.html').then(function (result) {
                return result.getContent();
            });
        }
        ;
        getFlowFunctionsResource(page) {
            return this._RM.getResource(page + '-flow.js');
        }
        ;
        getFlowDescriptorResource(page) {
            return this._RM.getResource(page + '-flow.json');
        }
        ;
        getUserRoles() {
            return ['approle.authenticated.user'];
        }
        ;
    }
    exports.default = VBApplicationModel;
});
