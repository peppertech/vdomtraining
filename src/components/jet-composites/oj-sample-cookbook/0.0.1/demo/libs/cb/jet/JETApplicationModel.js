define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JETApplicationModel {
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
            throw "Invalid Invocation";
        }
        ;
        getApplicationFunctionsResource() {
            throw "Invalid Invocation";
        }
        ;
        getPageFunctionsResource(page) {
            throw "Invalid Invocation";
        }
        ;
        getPageDescriptorResource(page) {
            throw "Invalid Invocation";
        }
        ;
        getPageTemplate(page) {
            throw "Invalid Invocation";
        }
        ;
        getFlowFunctionsResource(page) {
            throw "Invalid Invocation";
        }
        ;
        getFlowDescriptorResource(page) {
            throw "Invalid Invocation";
        }
        ;
        getUserRoles() {
            throw "Invalid Invocation";
        }
        ;
    }
    exports.default = JETApplicationModel;
});
