import 'ojs/ojactioncard';
import { ActionCardElement } from 'ojs/ojactioncard';
import 'ojs/ojlabel';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-dept-card-layout/loader';
import '../../../../../../jet-composites/demo-profile-card-layout/loader';

export const ActioncardProfiledept = () => {
  const [logMsg, setLogMsg] = useState<string>('none');

  const dept = useMemo(() => ({
      deptName: 'Application Development',
      deptCount: '75 Employees',
      name: 'Deb Raphaely',
      image: '/styles/images/hcm/placeholder-female-01.png'
  }), []);
  const employee = useMemo(() => ({
      name: 'Deb Raphaely',
      image: '/styles/images/hcm/placeholder-female-01.png',
      title: 'Purchasing Director',
      managerType: 'Manager'
  }), []);

  const actionHandler = (event: ActionCardElement.ojAction) => {
      setLogMsg('Action handler invoked - ' + (event.currentTarget as HTMLElement).id);
  };

  return (
      <div id="card-container">
            <div class="oj-flex oj-sm-flex-items-initial">
                    <oj-action-card id={employee.name} class="oj-flex-item oj-sm-margin-2x" onojAction={actionHandler}>
                              <demo-profile-card-layout name={employee.name} initials="DR" image={employee.image} workTitle={employee.title} />
                          </oj-action-card>
                    <div class="oj-sm-margin-2x">
                              <oj-action-card id={dept.deptName} onojAction={actionHandler} class="oj-bg-warning-30">
                                          <demo-dept-card-layout deptName={dept.deptName} deptCount={dept.deptCount} image={dept.image} name={dept.name} />
                                      </oj-action-card>
                          </div>
                </div>
            <div class="oj-sm-padding-4x-vertical">
                    <oj-label for="changelog">Event:</oj-label>
                    <span id="changelog">{logMsg}</span>
                </div>
        </div>
    );
};

export default ActioncardProfiledept;
