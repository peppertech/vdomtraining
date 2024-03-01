define(["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAssistiveText = void 0;
    function determineAssistiveText(help, validatorHint, helpHints, converterHint, displayOptions, userAssistanceDensity) {
        const helpHintsDef = userAssistanceDensity !== 'compact' ? helpHints?.definition : undefined;
        return (help?.instruction ||
            (displayOptions?.validatorHint === 'none' ? undefined : validatorHint) ||
            helpHintsDef ||
            (displayOptions?.converterHint === 'none' ? undefined : converterHint));
    }
    function determineSyncValidatorHints(validators) {
        if (!validators.length) {
            return undefined;
        }
        const syncHints = validators
            .map((validator) => typeof validator.getHint === 'function'
            ? validator.getHint()
            : undefined)
            .filter(Boolean);
        return syncHints.join('\n');
    }
    function useAssistiveText({ addBusyState, converter, displayOptions, help, helpHints, userAssistanceDensity, validators }) {
        const [validatorHint, setValidatorHint] = (0, hooks_1.useState)(!validators || !validators.length ? undefined : determineSyncValidatorHints(validators));
        const staleIdentity = (0, hooks_1.useRef)();
        (0, hooks_1.useEffect)(() => {
            if (!validators || !validators.length) {
                setValidatorHint(undefined);
                return;
            }
            setValidatorHint(determineSyncValidatorHints(validators));
            const asyncHints = validators
                .map((validator) => validator.hint)
                .filter(Boolean);
            const localStaleIdentity = (staleIdentity.current = Symbol());
            const resolver = addBusyState?.('resolving the async validator hints');
            Promise.allSettled(asyncHints).then((hints) => {
                setValidatorHint((currentHints) => {
                    const treatedHints = hints
                        .map((result) => (result.status === 'fulfilled' ? result.value : undefined))
                        .filter(Boolean);
                    if (localStaleIdentity !== staleIdentity.current || !treatedHints.length) {
                        return currentHints;
                    }
                    return [currentHints, ...treatedHints].join('\n');
                });
                resolver?.();
            });
        }, [validators]);
        const helpSourceText = userAssistanceDensity !== 'compact'
            ? helpHints?.sourceText
            : helpHints?.definition || helpHints?.sourceText;
        return {
            assistiveText: determineAssistiveText(help, validatorHint, helpHints, converter?.getHint?.() ?? undefined, displayOptions, userAssistanceDensity),
            helpSourceLink: helpHints?.source,
            helpSourceText
        };
    }
    exports.useAssistiveText = useAssistiveText;
});
