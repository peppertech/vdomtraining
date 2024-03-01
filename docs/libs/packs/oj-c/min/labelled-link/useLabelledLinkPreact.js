define(["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLabelledLinkPreact = void 0;
    function useLabelledLinkPreact({ 'aria-describedby': ariaDescribedBy, href, labelEdge, labelHint, labelStartWidth, target, text, textAlign, userAssistanceDensity, onOjAction }) {
        const onClickHandler = (0, hooks_1.useCallback)((event) => {
            if (href === undefined) {
                event.preventDefault();
                onOjAction?.();
            }
        }, [href, onOjAction]);
        return {
            'aria-describedby': ariaDescribedBy,
            children: text,
            href: href ?? '#',
            label: labelHint,
            labelEdge: labelEdge,
            labelStartWidth: labelStartWidth,
            target: target,
            textAlign: textAlign,
            userAssistanceDensity: userAssistanceDensity,
            onClick: onClickHandler
        };
    }
    exports.useLabelledLinkPreact = useLabelledLinkPreact;
});
