define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CommandKeys {
    }
    CommandKeys.DESIGN_TIME = {
        COMMAND_HANDSHAKE: 'handshake',
        COMMAND_GET_APPLICATION_DESCRIPTOR: 'get-application-descriptor',
        COMMAND_GET_APPLICATION_FUNCTIONS: 'get-application-functions',
        COMMAND_GET_MODULE_DESCRIPTOR: 'get-module-descriptor',
        COMMAND_GET_MODULE_FUNCTIONS: 'get-module-functions',
        COMMAND_GET_PAGE_DESCRIPTOR: 'get-page-descriptor',
        COMMAND_GET_PAGE_TEMPLATE: 'get-page-template',
        COMMAND_GET_PAGE_FUNCTIONS: 'get-page-functions',
        COMMAND_GET_FLOW_DESCRIPTOR: 'get-flow-descriptor',
        COMMAND_GET_FLOW_FUNCTIONS: 'get-flow-functions',
        COMMAND_ACTIVE_PAGE_UPDATED: 'active-page-updated',
        COMMAND_NOTIFY_ERROR: 'notify-error',
        COMMAND_CAN_NAVIGATE_TO_PAGE: 'can-navigate-to-page',
        COMMAND_CAN_NAVIGATE_TO_URL: 'can-navigate-to-url',
        COMMAND_CAN_NAVIGATE_BACK: 'can-navigate-back',
        COMMAND_GET_USER_ROLES: 'get-user-roles',
        COMMAND_TRANSLATION_BUNDLE_LOADED: 'translation-bundle-loaded',
        COMMAND_GET_SERVICE_WORKER_REQUIRE_CONFIG: 'get-service-worker-require-config',
        COMMAND_GET_SERVICE_WORKER_PLUGINS: 'get-service-worker-plugins',
    };
    /**
     * Keys of Command-s send to runtime time connector
     */
    CommandKeys.RUN_TIME = {
        COMMAND_GET_APPLICATION_READY: 'get-application-ready',
        COMMAND_GET_CONTAINER_READY: 'get-container-ready',
        COMMAND_GET_PAGE_READY: 'get-page-ready',
        COMMAND_GET_ACTIVE_PAGE: 'get-active-page',
        COMMAND_NAVIGATE_TO_PAGE: 'navigate-to-page',
        COMMAND_RELOAD_ACTIVE_PAGE: 'reload-active-page',
        COMMAND_REFRESH_PAGE_TEMPLATE: 'refresh-page-template',
        COMMAND_REFRESH_PAGE_DESCRIPTOR: 'refresh-page-descriptor',
        COMMAND_REFRESH_PAGE_FUNCTIONS: 'refresh-page-functions',
        COMMAND_REFRESH_CONTAINER: 'refresh-container',
        COMMAND_REFRESH_CONTAINER_DESCRIPTOR: 'refresh-container-descriptor',
        COMMAND_REFRESH_CONTAINER_FUNCTIONS: 'refresh-container-functions',
        COMMAND_REFRESH_CONTAINER_TEMPLATE: 'refresh-container-template',
        COMMAND_REFRESH_TRANSLATION_BUNDLE: 'refresh-translation-bundle',
        COMMAND_DISCONNECT: 'disconnect',
        COMMAND_GET_IFRAME_METRICS: 'get-iframe-metrics',
        COMMAND_APPLY_CHANGES: 'apply-changes'
    };
    exports.default = CommandKeys;
});
