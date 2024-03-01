import Converter = require('ojs/ojconverter');
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
export type DisplayOptions = {
    converterHint?: 'display' | 'none';
    messages?: 'display' | 'none';
    validatorHint?: 'display' | 'none';
};
export type Help = {
    instruction?: string;
};
export type HelpHints = {
    definition?: string;
    source?: string;
    sourceText?: string;
};
export type UseAssistiveTextProps = {
    addBusyState?: (desc: string) => () => void;
    converter?: Converter<unknown>;
    displayOptions?: DisplayOptions;
    help?: Help;
    helpHints?: HelpHints;
    userAssistanceDensity?: 'compact' | 'efficient' | 'reflow';
    validators?: (Validator<unknown> | AsyncValidator<unknown>)[];
};
export declare function useAssistiveText({ addBusyState, converter, displayOptions, help, helpHints, userAssistanceDensity, validators }: UseAssistiveTextProps): {
    assistiveText: string | undefined;
    helpSourceLink: string | undefined;
    helpSourceText: string | undefined;
};
