define(["require", "exports", "./viewModel", "ojs/ojcomposite", "text!./component.json", "text!./view.html", "css!./styles", "ojs/ojcomposite"], function (require, exports, viewModel_1, Composite, metadata, view) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Composite.register('oj-sample-cookbook-recipe', {
        view: view,
        viewModel: viewModel_1.default,
        metadata: JSON.parse(metadata)
    });
});
