// @ts-nocheck
import { h } from 'preact';

export const barChartAttrGroupsDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      This demo shows how to use ColorAttributeGroupHandler to color a JET bar chart by group and
      display the attribute groups in the legend.
    </p>

    <ul>
      <li>
        You can switch between the 2017 and 2018 datasets. From 2017 to 2018 Root Beer and Sunkist were
        dropped to be replaced by Coke and Fanta.
      </li>

      <li>
        If you choose to reset the colors between data changes, the same 5 colors will be used for both
        data sets. But if you choose to not reset the colors, all 7 products used between the 2 years
        will have their own distinct color.
      </li>

      <li>
        For resetting the colors between data changes, a new attribute group handler is created every
        time which resets the color palette.
      </li>

      <li>
        <b>Not resetting</b>
        {" "}
        the palette ensures that items that are common to both years will be colored consistently
        between data changes, whereas
        {" "}
        <b>resetting</b>
        {" "}
        the color palette doesn't guarantee this.
      </li>
    </ul>
  </>
);
