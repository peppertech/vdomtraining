define(["require", "exports", "../vbdt/platform/api/Listenable", "../vbdt/preview-core/dtrt/Channel", "../vbdt/preview-core/dtrt/CommandKeys"], function (require, exports, Listenable_1, Channel_1, CommandKeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const HANDSHAKE_TIMEOUT = 60000 * 2;
    const APPLICATION_READY_COMMAND_TIMEOUT = 60000;
    class HandshakeHandler {
        constructor(iframeId) {
            this.iframeId = iframeId;
        }
        getConnectionEstablishedPromise() {
            return this.connectionEstablishedPromise;
        }
        initialize() {
            const self = this;
            this.connectionEstablishedPromise = new Promise(function (fulfil, reject) {
                self.fulfil = fulfil;
                self.reject = reject;
            });
            setTimeout(function () {
                self.reject(`No handshake in ${HANDSHAKE_TIMEOUT}ms`);
            }, HANDSHAKE_TIMEOUT);
        }
        handleCommand(command) {
            if (command.getCommandId() === CommandKeys_1.default.DESIGN_TIME.COMMAND_HANDSHAKE) {
                const iframeURL = command.payload.iframeURL;
                this.fulfil(iframeURL);
                return Promise.resolve(this.iframeId);
            }
            return null;
        }
    }
    class ActivePageChanged {
        constructor(runtimeConnector) {
            this.runtimeConnector = runtimeConnector;
        }
        handleCommand(command) {
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_ACTIVE_PAGE_UPDATED) {
                this.runtimeConnector.fireEvent(command.getCommandId(), command.getPayload());
                return Promise.resolve();
            }
            return null;
        }
    }
    class GetPageDescriptor {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_PAGE_DESCRIPTOR) {
                return this.applicationModel
                    .getPageDescriptorResource(command.getPayload())
                    .then(function (resource) {
                    return resource.getContent();
                })
                    .catch(function (err) {
                    if (err) {
                        err.xhr = err.xhr || { status: 404 };
                    }
                    return Promise.reject(err);
                });
            }
            return null;
        }
    }
    class GetFlowDescriptor {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_FLOW_DESCRIPTOR) {
                return this.applicationModel
                    .getFlowDescriptorResource(command.getPayload())
                    .then(function (resource) {
                    return resource.getContent();
                });
            }
            return null;
        }
    }
    class GetPageTemplate {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_PAGE_TEMPLATE) {
                return this.applicationModel.getPageTemplate(command.getPayload());
            }
            return null;
        }
    }
    class GetPageFunctions {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_PAGE_FUNCTIONS) {
                return this.applicationModel
                    .getPageFunctionsResource(command.getPayload())
                    .then(function (resource) {
                    return resource.getContent();
                });
            }
            return null;
        }
    }
    class GetApplicationDescriptor {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_APPLICATION_DESCRIPTOR) {
                return this.applicationModel.getApplicationDescriptor();
            }
            return null;
        }
    }
    class GetApplicationFunctions {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_APPLICATION_FUNCTIONS) {
                return this.applicationModel
                    .getApplicationFunctionsResource()
                    .then(function (resource) {
                    return resource.getContent();
                });
            }
            return null;
        }
    }
    class GetModuleDescriptor {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_MODULE_DESCRIPTOR) {
                return this.applicationModel
                    .getModuleDescriptorResource(command.getPayload())
                    .then(function (resource) {
                    return resource.getContent();
                });
            }
            return null;
        }
    }
    class GetModuleFunctions {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_MODULE_FUNCTIONS) {
                return this.applicationModel
                    .getModuleFunctionsResource(command.getPayload())
                    .then(function (resource) {
                    return resource.getContent();
                });
            }
            return null;
        }
    }
    class GetFlowFunctions {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_FLOW_FUNCTIONS) {
                return this.applicationModel
                    .getFlowFunctionsResource(command.getPayload())
                    .then(function (resource) {
                    return resource.getContent();
                });
            }
            return null;
        }
    }
    class NotifyError {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            //             if (command.getCommandId() === CommandKeys.DESIGN_TIME.COMMAND_NOTIFY_ERROR) {
            //                 return this.applicationModel.notifyError(command.getPayload());
            //             }
            return null;
        }
    }
    class CanNavigateToPage {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_CAN_NAVIGATE_TO_PAGE) {
                return this.applicationModel.canNavigateToPage(command.getPayload());
            }
            return null;
        }
    }
    class CanNavigateToUrl {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_CAN_NAVIGATE_TO_URL) {
                return this.applicationModel.canNavigateToUrl(command.getPayload());
            }
            return null;
        }
    }
    class CanNavigateBack {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_CAN_NAVIGATE_BACK) {
                return this.applicationModel.canNavigateBack(command.getPayload());
            }
            return null;
        }
    }
    class GetUserRoles {
        constructor(applicationModel) {
            this.applicationModel = applicationModel;
        }
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() === CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_USER_ROLES) {
                return Promise.resolve(this.applicationModel.getUserRoles());
            }
            return null;
        }
    }
    class RuntimeConnectorPluginBase {
        constructor(applicationModel) {
            this._applicationModel = applicationModel;
        }
        _getApplication() {
            return this._applicationModel.clientApplication.application;
        }
        __getPlugins() {
            //             return ManifestUtils.getImplementations('platform/spi/app/RuntimeConnectorPlugin', {}, this._getApplication());
        }
    }
    class ServiceWorkerRequireConfig extends RuntimeConnectorPluginBase {
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            //             if (command.getCommandId() === CommandKeys.DESIGN_TIME.COMMAND_GET_SERVICE_WORKER_REQUIRE_CONFIG) {
            //                 return this.__getPlugins().then(plugins => plugins.reduce((acc, plugin) => acc || plugin.getServiceWorkerRequireConfig(), null));
            //             }
            return Promise.resolve([]);
        }
    }
    class ServiceWorkerPlugins extends RuntimeConnectorPluginBase {
        handleCommand(command) {
            // eslint-disable-line class-methods-use-this
            if (command.getCommandId() ===
                CommandKeys_1.default.DESIGN_TIME.COMMAND_GET_SERVICE_WORKER_PLUGINS) {
                //                 return this.__getPlugins().then(plugins => plugins.reduce((acc, plugin) => {
                //                     plugin.getServiceWorkerPlugins().forEach(swPlugin => acc.push(swPlugin));
                //                     return acc;
                //                 }, []));
            }
            return Promise.resolve([[]]);
        }
    }
    /**
     * Provides basic means of communication with the runtime VBCS application.
     */
    class RuntimeConnector extends Listenable_1.default {
        /**
         * Creates a new instance of RuntimeConnector.
         *
         * @param {string} params.iframeId
         * @param {ResourceManager} params.resourceManager
         * @param {TranslationBundleManager} params.translationBundleManager
         *
         * @returns {Window}
         */
        constructor(params) {
            super();
            this.handshakeHandler = new HandshakeHandler(params.iframeId);
            this.handshakeHandler.initialize();
            const applicationModel = params.applicationModel;
            this.applicationModel = applicationModel;
            const translationBundleManager = params.translationBundleManager;
            this.channel = new Channel_1.default({
                identity: params.iframeId,
                iframeGetter() {
                    if (params.iframeId) {
                        let iframe = document.getElementById(params.iframeId);
                        return iframe ? iframe.contentWindow : null;
                    }
                    else {
                        return null;
                    }
                },
                commandHandlers: [
                    this.handshakeHandler,
                    new ActivePageChanged(this),
                    new GetPageDescriptor(applicationModel),
                    new GetFlowDescriptor(applicationModel),
                    new GetPageTemplate(applicationModel),
                    new GetApplicationDescriptor(applicationModel),
                    new GetApplicationFunctions(applicationModel),
                    new GetModuleDescriptor(applicationModel),
                    new GetModuleFunctions(applicationModel),
                    new GetFlowFunctions(applicationModel),
                    new GetPageFunctions(applicationModel),
                    new NotifyError(applicationModel),
                    new CanNavigateToPage(applicationModel),
                    new CanNavigateToUrl(applicationModel),
                    new CanNavigateBack(applicationModel),
                    new GetUserRoles(applicationModel),
                    new ServiceWorkerRequireConfig(applicationModel),
                    new ServiceWorkerPlugins(applicationModel)
                    //                     translationBundleManager,
                ]
            });
        }
        getApplicationModel() {
            return this.applicationModel;
        }
        dispose() {
            var self = this;
            // first dispose the RT->DT channel (living in RT context)
            return this.channel
                .run(CommandKeys_1.default.RUN_TIME.COMMAND_DISCONNECT)
                .then(function () {
                self.disposeChannel();
            });
        }
        disposeChannel() {
            this.channel.dispose();
        }
        waitForConnection() {
            return this.handshakeHandler.getConnectionEstablishedPromise();
        }
        /**
         * Reset the connector to initial state.
         * Needs to be called when the iframe gets reloaded
         */
        resetConnection() {
            this.handshakeHandler.initialize();
        }
        getChannel() {
            return this.channel;
        }
        /**
         * Gets promise of application ready status.
         *
         * @returns {Promise<boolean>}
         */
        isApplicationReady() {
            return this.channel
                .run(CommandKeys_1.default.RUN_TIME.COMMAND_GET_APPLICATION_READY, {}, APPLICATION_READY_COMMAND_TIMEOUT)
                .then(function (response) {
                return response.ready;
            });
        }
        /**
         * Gets promise of a container (app page, flow page etc.) ready status.
         *
         * @param {String} containerPath
         * @returns {Promise<boolean>}
         */
        isContainerReady(containerPath) {
            return this.channel
                .run(CommandKeys_1.default.RUN_TIME.COMMAND_GET_CONTAINER_READY, { containerPath }, APPLICATION_READY_COMMAND_TIMEOUT)
                .then(function (response) {
                return response.ready;
            });
        }
        /**
         * Gets promise of page ready status.
         *
         * @returns {Promise<boolean>}
         */
        isPageReady() {
            return this.channel
                .run(CommandKeys_1.default.RUN_TIME.COMMAND_GET_PAGE_READY, {}, APPLICATION_READY_COMMAND_TIMEOUT)
                .then(function (response) {
                return response.ready;
            });
        }
        /**
         * Gets promise of the runtime application active page.
         *
         * @returns {Promise<string>}
         */
        getActivePageId() {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_GET_ACTIVE_PAGE);
        }
        /**
         * Navigates runtime application to the given pageId.
         *
         * @param {string} pageId
         * @returns {Promise}
         */
        navigateToPage(pageId) {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_NAVIGATE_TO_PAGE, pageId);
        }
        /**
         * Refreshes active page template+descriptor+functions module.
         *
         * @returns {Promise}
         */
        refreshPage() {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_RELOAD_ACTIVE_PAGE);
        }
        /**
         * Refreshes page template.
         *
         * @returns {Promise}
         */
        refreshPageTemplate() {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_PAGE_TEMPLATE);
        }
        /**
         * Refreshes page template.
         *
         * @returns {Promise}
         */
        refreshPageDescriptor() {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_PAGE_DESCRIPTOR);
        }
        /**
         * Refreshes page functions module.
         *
         * @returns {Promise}
         */
        refreshPageFunctions() {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_PAGE_FUNCTIONS);
        }
        /**
         * Refreshes container as a whole.
         *
         * @param {String} containerPath
         * @returns {Promise}
         */
        refreshContainer(containerPath) {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_CONTAINER, {
                containerPath
            });
        }
        /**
         * Refreshes container's JSON descriptor.
         *
         * @param {String} containerPath
         * @returns {Promise}
         */
        refreshContainerDescriptor(containerPath) {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_CONTAINER_DESCRIPTOR, { containerPath });
        }
        /**
         * Refreshes container's JS functions.
         *
         * @param {String} containerPath
         * @returns {Promise}
         */
        refreshContainerFunctions(containerPath) {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_CONTAINER_FUNCTIONS, { containerPath });
        }
        /**
         * Refreshes container's HTML template.
         *
         * @param {String} containerPath
         * @returns {Promise}
         */
        refreshContainerTemplate(containerPath) {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_CONTAINER_TEMPLATE, { containerPath });
        }
        /**
         * Refreshes a translation bundle used by the runtime.
         * @param {String} path the path to the bundle.
         * @param {Objet} content  the new bundle content.
         * @return {Promise}
         */
        refreshTranslationBundle(path, content) {
            return this.channel.run(CommandKeys_1.default.RUN_TIME.COMMAND_REFRESH_TRANSLATION_BUNDLE, { path, content });
        }
        /**
         * Gets promise of a container (app page, flow page etc.) ready status.
         *
         * @param {String} containerPath
         * @returns {Promise<boolean>}
         */
        getIframeMetrics() {
            try {
                var iframe = document.getElementById("iFrameDemo");
                if (iframe.contentWindow.document.body) {
                    return Promise.resolve({
                        clientHeight: iframe.contentWindow.document.body.clientHeight,
                        offsetHeight: iframe.contentWindow.document.body.offsetHeight
                    });
                }
                return Promise.resolve(null);
            }
            catch (err) {
                return this.channel
                    .run(CommandKeys_1.default.RUN_TIME.COMMAND_GET_IFRAME_METRICS)
                    .then(function (response) {
                    return response;
                });
            }
        }
        applyChanges(changes) {
            return this.channel
                .run(CommandKeys_1.default.RUN_TIME.COMMAND_APPLY_CHANGES, changes)
                .then(function (response) {
                return response;
            });
        }
    }
    exports.default = RuntimeConnector;
    RuntimeConnector.EVENT_ACTIVE_PAGE_CHANGED = "active-page-updated";
});
