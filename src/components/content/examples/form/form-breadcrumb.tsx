import { Fragment } from "preact";

type FormBreadcrumbItem = {
  label: string;
  onSelect?: () => void;
  current?: boolean;
};

type NestedFormHomeProps = {
  onBreadcrumbChange?: (items: FormBreadcrumbItem[] | null) => void;
  onNavigateFormsHome?: () => void;
};

type FormBreadcrumbProps = {
  items: FormBreadcrumbItem[];
  ariaLabel?: string;
};

export const formatCorePackLabel = (label: string, isCorePack?: boolean) =>
  `${label}${isCorePack ? " (Core Pack)" : ""}`;

export function FormBreadcrumb({
  items,
  ariaLabel = "Form component breadcrumb",
}: FormBreadcrumbProps) {
  return (
    <nav class="breadcrumb-wrapper" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && (
            <span
              class="breadcrumb-wrapper__chevron oj-ux-ico-chevron-right"
              aria-hidden="true"
            ></span>
          )}
          <span
            class={`breadcrumb-wrapper__item${
              item.current
                ? " breadcrumb-wrapper__item--current"
                : item.onSelect
                  ? " breadcrumb-wrapper__item--link"
                  : ""
            }`}
            {...(item.current ? { "aria-current": "page" } : {})}
            {...(item.onSelect
              ? {
                  role: "button",
                  tabIndex: 0,
                  onClick: item.onSelect,
                  onKeyDown: (event: KeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      item.onSelect?.();
                    }
                  },
                }
              : {})}
          >
            {item.label}
          </span>
        </Fragment>
      ))}
    </nav>
  );
}

export type { FormBreadcrumbItem, NestedFormHomeProps };
