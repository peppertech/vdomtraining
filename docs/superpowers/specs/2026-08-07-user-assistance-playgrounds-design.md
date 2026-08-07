# Form User Assistance Cookbook Playgrounds Design

## Scope

Enable the shared editable cookbook playground for the five registered Form
User Assistance recipes: Help, Converter Hint and Messages, Validator Hints
and Messages, Display Options, and Inline Messages. The unregistered
`multipleMessagesInline` source remains out of scope.

## Architecture

Each registered demo receives a sibling `*-source.ts` raw-loader wrapper. The
registration in `userAssistance/index.tsx` imports those wrappers and attaches
a `playground` configuration to the matching recipe item, which is then
rendered by the existing `RecipePageTemplate` and `DemoLayoutTemplate` path.

The source modules currently default-export arrow components. Refactor the
five registered modules to named default function components so their literal
TSX source satisfies the shared playground compiler. The named exports have
no consumers, and the refactor does not alter component behavior.

## Dependencies

There are no local runtime helper modules, CSS, JSON, or text assets.
Converter Hint and Messages needs `ColorConverter` as a runtime binding from
`ojs/ojconverter-color`. Add exact trusted imports for that module and the
type-only `ojs/ojmessaging` module used by Inline Messages. Other Preact and
JET imports are already trusted.

## Verification

A focused Node regression test will assert the five registrations, source
wrappers, named default functions, Converter binding, and narrow imports. The
implementation also runs TypeScript and whitespace checks. Interactive
cookbook behavior will be exercised when a controllable browser is available.
