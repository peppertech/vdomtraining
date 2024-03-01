define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "preact", "ojs/ojtrain"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const stepArray = [
        { label: "Step One", id: "stp1", disabled: false },
        { label: "Step Two", id: "stp2", disabled: false },
        { label: "Step Three", id: "stp3", disabled: true },
        { label: "Step Four", id: "stp4", disabled: true },
        { label: "Step Five", id: "stp5", disabled: true },
    ];
    const Train = () => {
        const [selectedStep, setSelectedStep] = (0, hooks_1.useState)("stp1");
        const [selectedStepLabel, setSelectedStepLabel] = (0, hooks_1.useState)("Step One");
        const trainRef = (0, hooks_1.useRef)(null);
        const update = (event) => {
            var _a;
            const selectedStep = (_a = trainRef === null || trainRef === void 0 ? void 0 : trainRef.current) === null || _a === void 0 ? void 0 : _a.getStep(event.detail.value);
            if (selectedStep != null) {
                setSelectedStep(event.detail.value);
                setSelectedStepLabel(selectedStep.label);
            }
            for (let i = 0; i <= stepArray.length - 1; i++) {
                const previousStepId = event.detail.previousValue;
                const step = stepArray[i];
                if (step.id == selectedStep.id && i < stepArray.length - 1) {
                    stepArray[i + 1].disabled = false;
                    step.messageType = undefined;
                }
                if (step.id == previousStepId) {
                    step.messageType = "confirmation";
                }
            }
        };
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("oj-train", { ref: trainRef, id: "lineartrain", class: "oj-train-stretch oj-sm-margin-4x-horizontal", onselectedStepChanged: update, selectedStep: selectedStep, steps: stepArray }), (0, jsx_runtime_1.jsx)("div", { class: "oj-sm-margin-4x-vertical", children: (0, jsx_runtime_1.jsx)("p", { class: "oj-helper-text-align-center", children: `You are on ${selectedStepLabel}` }) })] }));
    };
    exports.default = Train;
});
