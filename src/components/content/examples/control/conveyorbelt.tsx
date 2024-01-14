import { ComponentProps } from "preact";
import "ojs/ojconveyorbelt";

type ConveyorBeltProps = ComponentProps<"oj-conveyor-belt">;

type Props = {
  children: preact.ComponentChildren;
  orientation?: ConveyorBeltProps["orientation"];
  arrowVisibility?: ConveyorBeltProps["arrowVisibility"];
  contentParent?: ConveyorBeltProps["contentParent"];
  scrollPosition?: ConveyorBeltProps["scrollPosition"];
};

const ConveyorBelt = ({
  children,
  orientation = "horizontal",
  arrowVisibility,
  contentParent,
  scrollPosition,
}: Props) => {
  return (
    <oj-conveyor-belt
      orientation={orientation}
      arrowVisibility={arrowVisibility}
      contentParent={contentParent}
      scrollPosition={scrollPosition}>
      {children}
    </oj-conveyor-belt>
  );
};

export default ConveyorBelt;
