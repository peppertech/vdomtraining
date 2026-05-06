define(["require", "exports", "jquery", "ojs/ojaccordion", "ojs/ojcollapsible"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ComponentModel {
        constructor(context) {
            this.props = context.properties;
            this.element = context.element;
            this.model = {};
        }
        connected(context) {
            context.element.addEventListener('ojExpand', function () {
                $('oj-sample-cookbook-editor:visible').each(function (index, item) { item.refresh(); });
            });
        }
        ;
    }
    exports.default = ComponentModel;
});
