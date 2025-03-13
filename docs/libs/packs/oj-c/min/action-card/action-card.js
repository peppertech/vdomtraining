var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ActionCard", "preact", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "css!oj-c/action-card/action-card-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ActionCard_1, preact_1, ojvcomponent_1, compat_1, hooks_1, UNSAFE_useTabbableMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    let ActionCard = class ActionCard extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.actionCardRef = (0, preact_1.createRef)();
        }
        render({ children, onOjAction }) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(FunctionalActionCard, { ref: this.actionCardRef, onAction: onOjAction, width: "100%", height: "100%", children: children }) }));
        }
        click() {
            this.actionCardRef.current?.click();
        }
        blur() {
            this.actionCardRef.current?.blur();
        }
        focus() {
            this.actionCardRef.current?.focus();
        }
    };
    exports.ActionCard = ActionCard;
    ActionCard._metadata = { "slots": { "": {} }, "events": { "ojAction": { "bubbles": true } }, "methods": { "click": {}, "blur": {}, "focus": {} } };
    ActionCard._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    ActionCard._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.ActionCard = ActionCard = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-action-card')
    ], ActionCard);
    const FunctionalActionCard = (0, compat_1.forwardRef)((props, ref) => {
        const actionCardRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => actionCardRef.current?.focus(),
            blur: () => actionCardRef.current?.blur(),
            click: () => actionCardRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_ActionCard_1.ActionCard, { ref: actionCardRef, ...props });
    });
});
