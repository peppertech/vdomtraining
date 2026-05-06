define(["require", "exports", "jquery", "ojs/ojresponsiveknockoututils", "ojs/ojresponsiveutils"], function (require, exports, $, ResponsiveKnockoutUtils, ResponsiveUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Model {
        connected() {
        }
        constructor(context) {
            var ele = context.element;
            if (!ele.hasAttribute('id')) {
                //@ts-ignore
                $(ele).uniqueId();
            }
            var elementId = $(ele).attr('id');
            this.labelId = elementId + '_lbl';
            this.showHelp = ele.hasAttribute('on-help');
            var smQuery = ResponsiveUtils.getFrameworkQuery("sm-only");
            if (smQuery) {
                this.small = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            }
            this.getButtonSetId = function () {
                return elementId + '_btnset';
            };
            this.getButtonId = function (prefix) {
                return prefix + '_btn';
            };
            this.onhelp = function (model, event) {
                context.element.dispatchEvent(new CustomEvent('help', { detail: { origEvent: event }, bubbles: false }));
            };
            this.refresh = function () {
                var listElement = ele.querySelector('oj-buttonset-one');
                if (listElement) {
                    listElement.refresh();
                }
                else {
                    listElement = ele.querySelector('oj-select-one');
                }
                if (listElement) {
                    listElement.refresh();
                }
            };
        }
    }
    exports.default = Model;
});
