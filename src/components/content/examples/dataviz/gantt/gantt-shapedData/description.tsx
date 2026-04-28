// @ts-nocheck
import { h } from 'preact';

export const ganttShapedDataDescription = (
  <>
    <p>A gantt displays scheduling information graphically, making it easier to plan, coordinate, and track various tasks and resources.</p><p>
      This demo shows how to create a JET Gantt with a dataProvider that contains data that has already
      been shaped for the gantt.
    </p>
    <p>
      Performance can improve in many cases by using shaped data, because the gantt can be rendered
      without requiring data mapping templates (e.g.
      <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#taskMappingTemplate"}>taskMappingTemplate</a>
      ).
    </p>
  </>
);
