import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/action-card";


type ActionShortcut = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
};

const shortcuts: ActionShortcut[] = [
  {
    id: 1,
    title: "Create Project",
    subtitle: "Start a new initiative with prebuilt templates.",
    icon: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
  },
  {
    id: 2,
    title: "Share Update",
    subtitle: "Notify stakeholders with the latest progress.",
    icon: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
  },
  {
    id: 3,
    title: "Schedule Review",
    subtitle: "Plan the next design or code walkthrough.",
    icon: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
  },
];

const ActionCardCorePack = () => {
  const [lastAction, setLastAction] = useState<string>("None yet");

  const handleAction = useCallback((title: string) => {
    setLastAction(title);
  }, []);

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-margin-4x-vertical oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">
          Quick Actions (oj-c-action-card)
        </h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Redwood Core Pack action cards with rich icons and actionable
          shortcuts.
        </p>
      </header>

      <div class="oj-sm-margin-4x-top oj-sm-flex oj-sm-flex-wrap oj-sm-column-gap-4x oj-sm-row-gap-4x">
        {shortcuts.map((item) => (
          <oj-c-action-card
            key={item.id}
            onojAction={() => handleAction(item.title)}
            class="oj-sm-flex-0"
          >
            <div class="oj-sm-padding-3x oj-sm-width-18">
              <div class="oj-text-color-secondary oj-typography-body-xs">
                Shortcut
              </div>
              <div class="oj-sm-margin-1x-top">
                <span class={item.icon} aria-hidden="true"></span>
              </div>
              <h3 class="oj-typography-heading-xs oj-sm-margin-0 oj-sm-margin-2x-top">
                {item.title}
              </h3>
              <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
                {item.subtitle}
              </p>
            </div>
          </oj-c-action-card>
        ))}
      </div>

      <footer class="oj-sm-margin-4x-top oj-typography-body-sm">
        <strong>Last action:</strong> {lastAction}
      </footer>
    </section>
  );
};

export { ActionCardCorePack };
