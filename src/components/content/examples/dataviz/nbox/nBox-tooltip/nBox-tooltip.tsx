// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { ojNBox } from 'ojs/ojnbox';
import 'ojs/ojnbox';

export const NBoxTooltip = () => {
  const tooltipElem: any = document.createElement('div');
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler({
      Manager: '#195f74',
      'Individual Contributor': '#32925e'
  }), []);
  const data: any = JSON.parse(jsonData);
  const labelText: any = tooltipElem.children[0];
  const secondaryLabelText: any = tooltipElem.children[1];
  const roleText: any = tooltipElem.children[2];
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
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'name'
  }), [data]);

  const getColor = (role: string) => {
      return colorHandler.getValue(role);
  };

  const tooltipFunction = (dataContext: ojNBox.TooltipContext<string>) => {
      dataContext.parentElement['style'].borderColor = dataContext.indicatorColor;
      labelText.textContent = dataContext.label;
      secondaryLabelText.textContent = dataContext.secondaryLabel;
      roleText.textContent =
          dataContext.indicatorColor == '#195f74' ? 'Manager' : 'Individual Contributor';
      // Return the elem and the chart will append it to the parentElement
      return {
          insert: tooltipElem
      };
  };

  return (
      <oj-n-box id="nbox-container" animation-on-data-change="auto" data={dataProvider} rows={rows} columns={columns} cells={cells} rows-title="Potential" columns-title="Performance" {...{ 'tooltip.renderer': tooltipFunction }}>
            <template slot="nodeTemplate" render={($current) => (
                  <>
                      <oj-n-box-node label={$current.data.name} secondary-label={$current.data.position} row={$current.data.potential} column={$current.data.performance} short-desc={$current.data.name + ' - ' + $current.data.position} indicator-color={getColor($current.data.role)} {...{ 'icon.source': $current.data.image ? 'images/hcm/placeholder-' + $current.data.image + '.png' : '', 'icon.initials': $current.data.initials, 'icon.background': $current.data.background }} />
                  </>
                )} />
        </oj-n-box>
    );
};

export default NBoxTooltip;
