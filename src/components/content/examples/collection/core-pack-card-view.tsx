import { h, ComponentProps } from "preact";
import { useMemo } from "preact/hooks";
import "oj-c/card-view";
import "ojs/ojavatar";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as peopleData from "text!./data/peopleData.json";
import { CCardViewElement } from "oj-c/card-view";
import "../../../shared/demo-profile-card-layout";

type Employee = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

const employees = JSON.parse(peopleData as string) as Employee[];

type ProfileCardLayoutProps = ComponentProps<"demo-profile-card-layout">;

const DemoProfileCardLayout = (props: ProfileCardLayoutProps) => (
  <demo-profile-card-layout {...props}></demo-profile-card-layout>
);

const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const CorePackCardView = () => {
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Employee["id"], Employee>(employees, {
        keyAttributes: "id",
      }),
    [],
  );

  return (
    <div id="componentDemoContent">
      <div id="cardviewContainer">
        <oj-c-card-view
          id="cardview"
          aria-label="basic cardview"
          data={dataProvider}
          scrollPolicyOptions={{ fetchSize: employees.length }}
        >
          <template
            slot="itemTemplate"
            render={(item: CCardViewElement.ItemTemplateContext<Employee["id"], Employee>) => {
              const person = item.data;
              const initials = getInitials(person.name);
              return (
                <div class="oj-panel">
                  <DemoProfileCardLayout
                    class="oj-complete"
                    name={person.name}
                    work-title={person.title}
                    initials={initials}
                    image={person.image}
                    department={person.department}
                  />
                </div>
              );
            }}
          ></template>
        </oj-c-card-view>
      </div>
    </div>
  );
};

export default CorePackCardView;
export { DemoProfileCardLayout };
