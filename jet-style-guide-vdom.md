# Oracle JET VDOM Architecture Style Guide

This style guide outlines best practices for developing web applications using Oracle JET with Virtual DOM (VDOM) architecture. It aims to ensure consistency, maintainability, and efficiency in development workflows by providing guidelines for coding standards, component architecture, state management, event handling, and more. The guide is based on official Oracle JET documentation and incorporates examples from the current project's codebase.

## Introduction to Oracle JET VDOM Architecture

Oracle JET VDOM architecture leverages a Virtual DOM engine, powered by Preact, to enhance performance and reactivity in web applications. Key benefits include:

- **Performance**: VDOM minimizes direct DOM manipulations by computing differences and updating only the necessary parts of the live DOM.
- **Reactivity**: Components update efficiently in response to state changes, ensuring a smooth user experience.
- **Modularity**: Encourages the creation of reusable UI components, promoting a modular design.

For detailed information, refer to the official Oracle JET documentation on VDOM architecture, which provides extensive guidance on building responsive web apps and components.

## Project Setup

### Setting Up a VDOM Project

To start a new Oracle JET VDOM project, use the Oracle JET Command-Line Interface (CLI). The following command scaffolds a basic VDOM app:

```bash
ojet create my-vdom-app --template=basic --vdom
```
This sets up a project with a pre-configured structure, including essential files and directories for VDOM development. After scaffolding, navigate to the app directory and run:

```bash
cd my-vdom-app
ojet build
ojet serve
```
This builds and serves the app locally for development and testing.

### Directory Structure

The typical directory structure for a VDOM app includes:

- `src/`: Source files for the application, including components and styles.
- `src/components/`: Custom VDOM components.
- `src/styles/`: CSS files for styling.
- `node_modules/`: Dependencies installed via npm, including Oracle JET libraries.

Understanding this structure is crucial for organizing your codebase effectively.

## Component Structure and Naming Conventions

### Functional Components with Preact

In Oracle JET VDOM architecture, components are typically written as functional components using Preact. A basic component structure looks like:

```typescript
import { h } from 'preact';

export const MyComponent = () => {
  return <div>My Component Content</div>;
};
```
### Naming Conventions

- **Component Names**: Use PascalCase for component names (e.g., `MyComponent`).
- **Props**: Use camelCase for props (e.g., `myProp`).
- **File Names**: Match the file name to the component name, using kebab-case (e.g., `my-component.tsx`).

### Using `ComponentProps` for Type Safety

To ensure type safety when defining component properties, use `ComponentProps` from Preact. This is particularly important for Oracle JET custom elements to access and type-check their properties correctly.

```typescript
import { ComponentProps } from 'preact';

type InputTextProps = ComponentProps<"oj-c-input-text">;

export const MyInputComponent = (props: InputTextProps) => {
  return <oj-c-input-text {...props} />;
};
```
Using `ComponentProps` ensures that the properties passed to Oracle JET components are correctly typed, reducing runtime errors and improving code maintainability. This practice is strongly recommended for all custom components interacting with Oracle JET elements.

## State Management

### Using Preact Hooks

State management in VDOM components is handled using Preact hooks such as `useState` and `useEffect`. Here's an example of managing state in a component:

```typescript
import { h } from 'preact';
import { useState } from 'preact/hooks';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```
### Best Practices

- **Minimize State Updates**: Only update state when necessary to avoid unnecessary re-renders.
- **Use `useMemo` for Expensive Computations**: Optimize performance by memoizing expensive calculations.
- **Avoid Direct DOM Manipulation**: Let Preact handle DOM updates through state changes.

## Event Handling

### Importance of External Event Handlers

Inline event handlers should be avoided as they can clutter the JSX and make the code harder to read and maintain. Instead, define event handlers as external methods to improve code organization and reusability. This is a critical best practice for Oracle JET VDOM development.

### Defining External Event Handlers

Here's an example of defining an external event handler method:

```typescript
import { h } from 'preact';
import { useState } from 'preact/hooks';
import 'oj-c/button';

export const MyButtonComponent = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    console.log('Button clicked!');
  };

  return (
    <div>
      <oj-c-button onojAction={handleClick} label="Click Me"></oj-c-button>
      {clicked && <p>Button was clicked!</p>}
    </div>
  );
};
```
In this example, `handleClick` is defined externally, making the code cleaner and easier to test or reuse. This approach is strongly recommended over inline event handlers like `onojAction={() => { ... }}`.

### Event Handling with Type Safety

When handling events for Oracle JET components, ensure type safety by referencing the appropriate event type:

```typescript
import { ComponentProps } from 'preact';
import 'oj-c/input-text';
import { CInputTextElement } from 'oj-c/input-text';

type InputTextProps = ComponentProps<"oj-c-input-text">;

export const MyInputText = (props: InputTextProps) => {
  const handleValueChanged = (event: CInputTextElement.valueChanged<string>) => {
    console.log('Value changed to:', event.detail.value);
  };

  return <oj-c-input-text {...props} onvalueChanged={handleValueChanged} />;
};
```
## Styling and Layout

### Using Oracle JET CSS Classes

Oracle JET provides a set of CSS classes for consistent styling across components. Use classes like `oj-typography-heading-sm` for headings and `oj-sm-margin-4x-vertical` for spacing:

```typescript
import { h } from 'preact';

export const StyledComponent = () => {
  return (
    <div>
      <h2 class="oj-typography-heading-sm">Header</h2>
      <div class="oj-sm-margin-4x-vertical">Content with vertical margin</div>
    </div>
  );
};
```
### Responsive Design

Leverage Oracle JET's responsive utilities to ensure your app works across different screen sizes. Use classes like `oj-md-6` for medium-sized screens to control layout:

```typescript
import { h } from 'preact';

export const ResponsiveLayout = () => {
  return (
    <div class="oj-flex">
      <div class="oj-md-6 oj-sm-12">Column 1</div>
      <div class="oj-md-6 oj-sm-12">Column 2</div>
    </div>
  );
};
```
## Data Providers and Dynamic Content

### Using Data Providers

Oracle JET provides data providers for managing dynamic content in components like lists and tables. Use `MutableArrayDataProvider` for simple arrays:

```typescript
import { h } from 'preact';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import 'oj-c/select-single';

const data = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' }
];
const dataProvider = new MutableArrayDataProvider(data, { keyAttributes: 'value' });

export const SelectComponent = () => {
  return (
    <oj-c-select-single data={dataProvider} labelHint="Select Option" />
  );
};
```
### Performance Considerations

Avoid re-creating data providers on every render by using `useMemo` or maintaining them in state to prevent unnecessary updates and maintain scroll positions in collection components.

## Accessibility

### Best Practices

Ensure accessibility by setting appropriate properties on Oracle JET components. For example, use `labelHint` to provide an `aria-label` for screen readers:

```typescript
import { h } from 'preact';
import 'oj-c/input-text';

export const AccessibleInput = () => {
  return <oj-c-input-text labelHint="Username" />;
};
```
Always test your components with accessibility tools to ensure compliance with standards like WCAG.

## Testing and Debugging

### Unit and Component Testing

Use Jest and Preact Testing Library for testing VDOM components. Structure tests to verify component behavior without relying on implementation details:

```typescript
import { render } from '@testing-library/preact';
import { MyComponent } from '../my-component';

test('renders MyComponent correctly', () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText('My Component Content')).toBeInTheDocument();
});
```
### Debugging with Preact Developer Tools

Install Preact Developer Tools as a browser extension to inspect component hierarchies and state in your browser's developer tools. Ensure to include `import 'preact/debug';` in debug mode for enhanced debugging capabilities.

## Code Examples

Below are examples drawn from the project's `/src/content/examples` folder to illustrate best practices in Oracle JET VDOM development. These examples demonstrate proper component structure, state management, and event handling with external methods.

### Form Component Example

Referencing `/src/content/examples/form/test1.tsx`, this example shows a form component using `ComponentProps` for type safety and external event handlers:

```typescript
import { CInputTextElement } from "oj-c/input-text";
import { CButtonElement } from "oj-c/button";
```
These imports allow for proper typing of event handlers and properties, as seen in the event handler definition:

```typescript
const testingHandler2 = (e: CInputTextElement.valueChanged<string>) => {
  console.log("event2: ", e);
};
```
This practice ensures that event details are correctly typed, reducing errors and improving code clarity.

#### Correcting Inline Event Handlers to External Methods

In `test1.tsx`, some event handlers are defined inline, which is not recommended. For instance:

```typescript
<oj-button
  id="refresh_button"
  label={myLabel}
  onojAction={() => console.log(myLabel)}
></oj-button>
```
To adhere to best practices, this should be refactored to use an external event handler method:

```typescript
const handleRefreshClick = () => {
  console.log(myLabel);
};

// Then in the JSX:
<oj-button
  id="refresh_button"
  label={myLabel}
  onojAction={handleRefreshClick}
/>
```
This refactoring improves code readability and makes the handler easier to test or reuse. All event handlers in your Oracle JET VDOM components should follow this external method pattern.

### Additional Example: Job Application Form

Referencing `/src/components/content/examples/form/jobapplication.tsx`, this file provides a comprehensive example of a job application form using multiple Oracle JET components. It showcases form layout, input fields, and state management, serving as a model for structuring complex forms, ensuring type safety, and managing user input with external event handlers.

#### State Management for Form Fields

The `jobapplication.tsx` file manages state for various form fields using `useState`, demonstrating a granular approach to state management:

```typescript
const [firstName, setFirstName] = useState<string>();
const [lastName, setLastName] = useState<string>();
// ... other state variables for form fields
```
This approach adheres to the best practice of minimizing state updates to only when necessary, as each state variable is specific to a form field.

#### External Event Handlers with `useCallback`

All event handlers in `jobapplication.tsx` are defined externally using `useCallback` to optimize performance by memoizing the function definitions. This aligns with the emphasized practice of avoiding inline event handlers:

```typescript
const handleFirstNameChange = useCallback((e: CInputTextElement.valueChanged<string | null | undefined>) => {
  setFirstName(e.detail.value as string);
}, []);

// Similarly for other form fields
const handleLastNameChange = useCallback((e: CInputTextElement.valueChanged<string | null | undefined>) => {
  setLastName(e.detail.value as string);
}, []);
```
These handlers are then passed to the respective components, maintaining code readability and reusability:

```typescript
<oj-c-input-text
  id="firstname"
  labelHint="First Name"
  required={true}
  value={firstName}
  onvalueChanged={handleFirstNameChange}
/>
```
#### Type Safety for Events

The example demonstrates type safety by using specific event types from Oracle JET components, ensuring that event details are correctly typed:

```typescript
const handleStateChange = useCallback((e: CSelectSingleElement.valueChanged<string,selectType>) => {
  setState(e.detail.value as string);
}, []);
```
This practice reduces runtime errors and improves code maintainability, complementing the use of `ComponentProps` for property typing.

#### Complex Form Layout and Data Providers

The form uses `oj-c-form-layout` for organizing fields into a responsive grid and employs data providers for dropdown selections, adhering to best practices for dynamic content:

```typescript
const statesDP = new MutableArrayDataProvider(statesArray, { keyAttributes: "value" });

// In the JSX:
<oj-c-select-single
  id="state"
  labelHint="State"
  value={state}
  data={statesDP}
  itemText="label"
  required={true}
  onvalueChanged={handleStateChange}
/>
```
This example serves as a model for structuring complex forms, ensuring type safety, and managing user input with external event handlers. It illustrates how to apply the principles discussed in this style guide to real-world scenarios within your codebase. Ensure to review and adapt these examples to maintain consistency with the emphasized practices of using `ComponentProps`-like typing and external event handlers.

## API Documentation References

For detailed API information on Oracle JET components, refer to the following HTML documentation files located in `C:\Users\JABROCK\Documents\JET_Projects\AI resource project\API docs`. These files provide in-depth descriptions, properties, methods, and events for various Oracle JET elements, serving as valuable resources for developers:

- `Element_ _oj-accordion_.html`: Documentation for the `oj-accordion` component.
- `Element_ _oj-action-card_.html`: Documentation for the `oj-action-card` component.
- `Element_ _oj-c-action-card_.html`: Documentation for the `oj-c-action-card` Core Pack component.
- `Element_ _oj-c-area-chart_.html`: Documentation for the `oj-c-area-chart` Core Pack component.

These references complement the style guide by offering detailed technical specifications for implementing Oracle JET components in your VDOM applications. Developers are encouraged to consult these documents for specific API details when working with individual components.
