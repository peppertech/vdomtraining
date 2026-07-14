import "css!./demo.css";
import "oj-c/action-card";
import "ojs/ojlabel";
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";
import "../../../../../../jet-composites/demo-dept-card-layout/loader";
import "../../../../../../jet-composites/demo-profile-card-layout/loader";

type ActionCardActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-action-card">["onojAction"]>
>[0];

export const ActionCardContentActionCardcorepack = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  const dept = useMemo(
    () => ({
      deptName: "Application Development",
      deptCount: "75 Employees",
      name: "Deb Raphaely",
      image: "/styles/images/hcm/placeholder-female-01.png",
    }),
    [],
  );
  const employee = useMemo(
    () => ({
      name: "Deb Raphaely",
      image: "/styles/images/hcm/placeholder-female-01.png",
      title: "Purchasing Director",
      managerType: "Manager",
    }),
    [],
  );

  const actionHandler = (event: ActionCardActionEvent) => {
    setLogMsg(
      `Action handler invoked - ${(event.currentTarget as HTMLElement).id}`,
    );
  };

  return (
    <div id="card-container">
      <div class="oj-flex oj-sm-flex-items-initial">
        <oj-c-action-card
          id={employee.name}
          class="oj-flex-item oj-sm-margin-2x"
          onojAction={actionHandler}
        >
          <demo-profile-card-layout
            name={employee.name}
            initials="DR"
            image={employee.image}
            workTitle={employee.title}
          />
        </oj-c-action-card>
        <div class="oj-sm-margin-2x">
          <oj-c-action-card id={dept.deptName} onojAction={actionHandler}>
            <demo-dept-card-layout
              deptName={dept.deptName}
              deptCount={dept.deptCount}
              image={dept.image}
              name={dept.name}
            />
          </oj-c-action-card>
        </div>
      </div>
      <div class="oj-sm-padding-4x-vertical">
        <oj-label for="changelog">Event:</oj-label>
        <span id="changelog">{logMsg}</span>
      </div>
    </div>
  );
};

export default ActionCardContentActionCardcorepack;
