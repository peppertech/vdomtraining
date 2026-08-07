# Component Validation Cookbook Playgrounds Design

## Scope

Enable the shared editable cookbook playground for all twelve registered
Component Validation recipes. Set Async Validators (`async-validators`) as the
default recipe. No unregistered sources are in scope.

## Architecture

Every registered TSX source receives a sibling `*-source.ts` raw-loader
wrapper. The Component Validation registration imports every wrapper and adds
matching `playground` metadata, allowing the existing `RecipePageTemplate` and
`DemoLayoutTemplate` path to use the shared `TsxPlayground`.

The twelve demos currently default-export arrow components. Refactor them to
named default functions without changing component bodies; this is required by
the playground compiler. Their named exports have no consumers.

## Runtime Dependencies

Async Validators receives `IntlDateTimeConverter`, `IntlNumberConverter`,
`Context`, `AsyncNumberRangeValidator`, and `AsyncDateRestrictionValidator`.
Converter Property Change receives `IntlDateTimeConverter` and
`NumberConverter`. The remaining validator-based demos receive only the
applicable `AsyncRegExpValidator` or `AsyncNumberRangeValidator`; Messages
Custom and Value Property Change require no runtime bindings.

Add only the missing exact trusted JET modules: `ojs/ojconverter-datetime`,
`ojs/ojconverter-nativenumber`, `ojs/ojvalidator-daterestriction`,
`ojs/ojasyncvalidator-daterestriction`, `ojs/ojcontext`, and
`ojs/ojselectcombobox`. There are no local helper, CSS, JSON, or text assets.

## Verification

A focused Node test will cover the twelve wrappers, metadata entries, default
selection, named default functions, runtime bindings, and trusted imports.
The implementation will run TypeScript and whitespace verification. Interactive
cookbook behavior will be exercised when a controllable browser is available.
