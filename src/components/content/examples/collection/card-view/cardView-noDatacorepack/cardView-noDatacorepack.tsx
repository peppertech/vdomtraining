import "css!./demo.css";
import "oj-c/card-view";
import * as preact from 'preact';
import { useMemo } from "preact/hooks";
import "../../../../../jet-composites/demo-profile-card-layout/loader";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface EmployeeData {
  id: number;
  image: string;
  initials: string;
  name: string;
  title: string;
}

type CardItemContext = {
  data: EmployeeData;
  isTabbable?: boolean;
  item: { data: EmployeeData; metadata: { key: EmployeeData["id"] } };
};

const EMPTY_EMPLOYEES: EmployeeData[] = [];

const renderCard: import("ojs/ojvcomponent").TemplateSlot<CardItemContext> = (context) => (
  <div class="oj-panel">
    {preact.h("demo-profile-card-layout", {
      name: context.data.name,
      workTitle: context.data.title,
      initials: context.data.initials,
      image: context.data.image,
    })}
  </div>
);

const renderNoData: import("ojs/ojvcomponent").TemplateSlot<{}> = () => (
  <div class="oj-flex oj-sm-align-items-center demo-nodata-content">
    <div class="oj-flex oj-sm-align-items-center oj-sm-flex-direction-column demo-nodata-inner">
      <span>No matches found</span>
    </div>
  </div>
);

export const CardViewNoDatacorepack = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData["id"], EmployeeData>(EMPTY_EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  return (
    <>
      <h5>List of Employees</h5>
      <hr />
      <oj-c-card-view
        id="cardview"
        class="demo-card-view"
        aria-label="cardview with no data"
        data={dataProvider}
      >
        <template slot="itemTemplate" render={renderCard} />
        <template slot="noData" render={renderNoData} />
      </oj-c-card-view>
    </>
  );
};

export default CardViewNoDatacorepack;
