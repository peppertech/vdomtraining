import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/action-card";
import "oj-c/avatar";
import "../../../shared/demo-profile-card-layout";
import { DemoProfileCardLayout } from "../collection/core-pack-card-view";

type EmployeeCard = {
  name: string;
  initials: string;
  image: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location?: string;
};

type DepartmentCard = {
  deptName: string;
  deptCount: string;
  image: string;
  name: string;
  managerType: string;
};

const dept: Readonly<DepartmentCard> = {
  deptName: "Application Development",
  deptCount: "75 Employees",
  name: "Deb Raphaely",
  managerType: "Purchasing Director",
  image: "images/hcm/placeholder-female-01.png",
};

const employee: Readonly<EmployeeCard> = {
  name: "Deb Raphaely",
  image: "images/hcm/placeholder-female-01.png",
  title: "Purchasing Director",
  initials: "DR",
  department: "Application Development",
  email: "deb.raphaely@example.com",
  phone: "(555) 010-4488",
  location: "Austin, TX",
};

const styles = `
  .demo-card-content {
    width: 25rem;
    height: 15rem;
  }

  .demo-card-2 {
    padding: 8px;
    display: flex;
    align-items: center;
  }

  .demo-application {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 180px;
    padding: 8px;
  }

  .demo-scrollable {
    width: 10rem;
    height: 10rem;
  }

  .demo-scrollable-content {
    padding: 8px;
    overflow: auto;
  }
`;

const toDomId = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const ActionCardCorePack = () => {
  const [actionHandler, setActionHandler] = useState<string>("None yet");

  const cardAction = useCallback((source: string) => {
    setActionHandler(source);
  }, []);

  return (
    <div id="card-container">
      <style>{styles}</style>
      <div class="oj-flex oj-sm-flex-items-initial">
        <oj-c-action-card
          id={toDomId(employee.name)}
          class="oj-flex-item oj-sm-margin-2x demo-card-content"
          onojAction={() => cardAction(employee.name)}
        >
          <DemoProfileCardLayout
            name={employee.name}
            initials={employee.initials}
            image={employee.image}
            work-title={employee.title}
            department={employee.department}
            email={employee.email}
            phone={employee.phone}
            location={employee.location}
          />
        </oj-c-action-card>
        <div class="oj-sm-margin-2x">
          <oj-c-action-card
            id={toDomId(dept.deptName)}
            onojAction={() => cardAction(dept.deptName)}
          >
            <div class="demo-application">
              <span class="oj-typography-body-lg">{dept.deptName}</span>
              <span class="oj-text-color-secondary">{dept.deptCount}</span>
              <div class="demo-card-2">
                <oj-c-avatar
                  class="oj-flex-item"
                  size="sm"
                  src={dept.image}
                ></oj-c-avatar>
                <div class="oj-flex-item oj-sm-padding-2x oj-sm-align-items-center">
                  <div>{dept.name}</div>
                  <span class="oj-text-color-secondary">{dept.managerType}</span>
                </div>
              </div>
            </div>
          </oj-c-action-card>
        </div>
        <div class="oj-sm-margin-2x">
          <oj-c-action-card
            id="scrollable"
            class="demo-scrollable"
            onojAction={() => cardAction("Scrollable")}
          >
            <div class="demo-scrollable-content">
              <p>
                This child content is larger than the parent card, so the card
                automatically becomes scrollable.
              </p>
              <p>More text hidden by the overflow.</p>
            </div>
          </oj-c-action-card>
        </div>
      </div>
      <p id="changelog" class="oj-typography-bold oj-sm-padding-4x">
        Event:
        <span id="results">{actionHandler}</span>
      </p>
    </div>
  );
};

export { ActionCardCorePack };
