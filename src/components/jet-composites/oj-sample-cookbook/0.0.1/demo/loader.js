define(["require", "exports", "./viewModel", "ojs/ojcomposite", "text!./component.json", "text!./view.html", "css!./styles", "ojs/ojcomposite", "oj-sample-cookbook/editor/loader", "oj-sample-cookbook/recipe/loader", "oj-sample-cookbook/download/loader"], function (require, exports, viewModel_1, Composite, metadata, view) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Composite.register('oj-sample-cookbook-demo', {
        view: view,
        viewModel: viewModel_1.default,
        metadata: JSON.parse(metadata)
    });
});
