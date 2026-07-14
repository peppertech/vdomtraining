import 'preact';
import type { ComponentChildren } from "preact";

export type RichRadioSetDemoId =
  | "overview"
  | "basic"
  | "user-assistance"
  | "layout";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const richRadioSetDocs: Record<RichRadioSetDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of{" "}
          <code>oj-c-rich-radioset</code>, including states, label edge, help,
          messages, and layout size variations.
        </p>
        <p>
          It mirrors the cookbook states demo while fitting the recipe-page
          pattern used across the VDOM examples.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Show enabled, disabled, and readonly rich radiosets to compare the
          primary state variations.
        </li>
        <li>
          Use <code>labelEdge</code>, help props, and{" "}
          <code>messagesCustom</code> so the page also works as a compact
          behavior reference.
        </li>
        <li>
          Include multiple <code>layout</code> sizes to show how the radio
          cards adapt across visual densities.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to create a basic{" "}
          <code>oj-c-rich-radioset</code> using an array of card-style options.
        </p>
        <p>
          The selected value updates automatically as the user chooses a card.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-radioset</code>.</li>
        <li>
          Bind the <code>options</code> prop to an array of rich option items
          that define the cards.
        </li>
        <li>
          Set the initial <code>value</code> and update it as the user changes
          selection.
        </li>
        <li>
          Provide <code>labelHint</code> so the component remains accessible.
        </li>
      </ol>
    ),
  },
  "user-assistance": {
    description: (
      <>
        <p>
          This demo shows user assistance for <code>oj-c-rich-radioset</code>.
        </p>
        <p>
          The state can be toggled among enabled, disabled, and readonly to see
          how assistance behaves in each mode.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-radioset</code>.</li>
        <li>
          Set component-level assistance through <code>help</code> or{" "}
          <code>helpHints</code>.
        </li>
        <li>
          Pair the demo with a small state control so the same example can be
          compared in enabled, disabled, and readonly modes.
        </li>
      </ol>
    ),
  },
  layout: {
    description: (
      <>
        <p>
          This demo shows the different layout and media options for{" "}
          <code>oj-c-rich-radioset</code>.
        </p>
        <p>
          The examples compare thumbnail, avatar, icon, and no-media cards
          across <code>xl</code>, <code>md</code>, and <code>sm</code> layouts.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Add an <code>oj-c-rich-radioset</code>.</li>
        <li>
          Bind the <code>options</code> prop to arrays that model the media
          style you want to showcase.
        </li>
        <li>
          Set the <code>layout</code> prop to <code>xl</code>, <code>md</code>,
          or <code>sm</code> to compare card sizing.
        </li>
        <li>
          Use thumbnail media for <code>xl</code>, thumbnail or avatar for{" "}
          <code>md</code>, and thumbnail, avatar, icon, or no media for{" "}
          <code>sm</code>.
        </li>
      </ul>
    ),
  },
};
