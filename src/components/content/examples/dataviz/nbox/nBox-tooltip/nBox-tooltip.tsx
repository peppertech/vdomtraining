import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojnbox';
import { ojNBox } from 'ojs/ojnbox';
import 'preact';
import type { ComponentProps } from 'preact';
import { useCallback,useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Employee = {
  name: string;
  position: string;
  department: string;
  role: 'Manager' | 'Individual Contributor';
  experience: string;
  performance: string;
  potential: string;
  image?: string;
  initials?: string;
  background?: string;
};

const employees = JSON.parse(jsonDataText as string) as Employee[];

type NodeTemplateContext = {
  data: Employee;
};

type TooltipContent = {
  element: HTMLDivElement;
  labelText: Element;
  secondaryLabelText: Element;
  roleText: Element;
};

export const NBoxTooltip = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler({
      Manager: '#195f74',
      'Individual Contributor': '#32925e'
  }), []);
  const data = employees;
  const tooltipContent = useMemo<TooltipContent>(() => {
      const element = document.createElement('div');
      element.innerHTML =
        '<div id="labelText" class="oj-sm-padding-2x bold"></div><div id="secondaryLabelText" class="oj-sm-padding-2x"></div><div id="roleText" class="oj-sm-padding-2x"></div>';

      return {
        element,
        labelText: element.children[0],
        secondaryLabelText: element.children[1],
        roleText: element.children[2]
      };
  }, []);
  const rows = useMemo(() => [
      {
          id: '0'
      },
      {
          id: '1'
      },
      {
          id: '2'
      }
  ], []);
  const columns = useMemo(() => [
      {
          id: '0'
      },
      {
          id: '1'
      },
      {
          id: '2'
      }
  ], []);
  const cells = useMemo(() => [
      {
          row: '0',
          column: '0',
          shortDesc: 'Low Potential, Poor Performance'
      },
      {
          row: '0',
          column: '1',
          shortDesc: 'Low Potential, Fair Performance'
      },
      {
          row: '0',
          column: '2',
          shortDesc: 'Low Potential, Good Performance'
      },
      {
          row: '1',
          column: '0',
          shortDesc: 'Medium Potential, Poor Performance'
      },
      {
          row: '1',
          column: '1',
          shortDesc: 'Medium Potential, Fair Performance'
      },
      {
          row: '1',
          column: '2',
          shortDesc: 'Medium Potential, Good Performance'
      },
      {
          row: '2',
          column: '0',
          shortDesc: 'High Potential, Poor Performance'
      },
      {
          row: '2',
          column: '1',
          shortDesc: 'High Potential, Fair Performance'
      },
      {
          row: '2',
          column: '2',
          shortDesc: 'High Potential, Good Performance'
      }
  ], []);
  const dataProvider = useMemo(() => new ArrayDataProvider<Employee['name'], Employee>(data, {
      keyAttributes: 'name'
  }), [data]);

  const getColor = (role: string) => {
      return colorHandler.getValue(role);
  };

  const tooltipFunction = useCallback((dataContext: ojNBox.TooltipContext<Employee['name']>) => {
      const parentElement = dataContext.parentElement as HTMLElement;
      const employee = data.find((item) => item.name === dataContext.id);

      parentElement.style.borderColor = dataContext.indicatorColor;
      tooltipContent.labelText.textContent = dataContext.label;
      tooltipContent.secondaryLabelText.textContent = dataContext.secondaryLabel;
      tooltipContent.roleText.textContent = employee?.role ?? '';

      return {
          insert: tooltipContent.element
      };
  }, [data, tooltipContent]);

  const nboxTooltipProps = useMemo(
    () =>
      ({
        'tooltip.renderer': tooltipFunction
      }) as unknown as Partial<ComponentProps<'oj-n-box'>>,
    [tooltipFunction]
  );

  const nodeTemplateRenderer = (current: NodeTemplateContext) => {
    const employee = current.data;

    return (
      <oj-n-box-node
        label={employee.name}
        secondaryLabel={employee.position}
        row={employee.potential}
        column={employee.performance}
        shortDesc={`${employee.name} - ${employee.position}`}
        indicatorColor={getColor(employee.role)}
        icon={{
          source: employee.image ? `images/hcm/placeholder-${employee.image}.png` : '',
          initials: employee.initials,
          background: employee.background
        }}
      />
    );
  };

  return (
      <oj-n-box
        id="nbox-container"
        animationOnDataChange="auto"
        data={dataProvider}
        rows={rows}
        columns={columns}
        cells={cells}
        rowsTitle="Potential"
        columnsTitle="Performance"
        {...nboxTooltipProps}
      >
            <template slot="nodeTemplate" render={nodeTemplateRenderer} />
        </oj-n-box>
    );
};

export default NBoxTooltip;
