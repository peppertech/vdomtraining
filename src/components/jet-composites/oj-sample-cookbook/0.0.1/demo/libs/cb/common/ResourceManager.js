define(["require", "exports", "./Resource"], function (require, exports, Resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Loads Resource files related to demo Application
     * @return {ResourceManager}
     */
    class ResourceManager {
        constructor(basePath, host, protocol) {
            this._cache = {};
            this.basePath = basePath;
            this.host = host;
            this.protocol = protocol;
        }
        ;
        getResource(id) {
            return this._cache[id] ? Promise.resolve(this._cache[id]) :
                this._loadResource(id).then((result) => {
                    this._cache[id] = new Resource_1.default(id, result);
                    return this._cache[id];
                });
        }
        ;
        getResources(fileIds) {
            var promises = [];
            for (var i = 0; i < fileIds.length; i++) {
                promises.push(this.getResource(fileIds[i]));
            }
            return Promise.all(promises);
        }
        ;
        _loadResource(id) {
            return new Promise((res) => {
                var url;
                if (id.indexOf('/') === 0) {
                    url = this.protocol + '//' + this.host + this.basePath + id.substring(1);
                }
                else {
                    url = this.protocol + '//' + this.host + this.basePath + id;
                }
                // @ts-ignore
                require(['text!' + url], (data) => {
                    res(data);
                });
            });
        }
        clearCache() {
            this._cache = {};
        }
    }
    exports.default = ResourceManager;
});
