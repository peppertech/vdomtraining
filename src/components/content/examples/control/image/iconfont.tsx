import "preact";

const IconFont = () => {
  const iconClasses = [
    "oj-ux-ico-heart-s",
    "oj-icon-color-primary",
    "oj-icon-color-secondary",
    "oj-icon-color-disabled",
    "oj-icon-color-danger",
    "oj-icon-color-warning",
    "oj-icon-color-success",
    "oj-icon-color-info",
  ];

  const icons = iconClasses.map((iconClass, index) => (
    <div class="oj-flex-item oj-sm-padding-2x-horizontal" key={index}>
      <span
        class={`${iconClass} oj-ux-icon-size-6x`}
        role="img"
        aria-label={iconClass.replace(/oj-|icon-|color-|-s/g, " ")}></span>
    </div>
  ));

  return <div class="oj-flex oj-sm-flex-items-initial">{icons}</div>;
};

export default IconFont;
