import { FunctionalComponent } from "preact"
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import 'ojs/ojlistview';
import { CListViewElement } from 'oj-c/list-view';
import { DragHandle } from 'oj-c/drag-handle';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { ojListView } from 'ojs/ojlistview';

type Option = {
  description: string

}

type Props = {
  fieldOptions?: Option
}

interface DataProps {
  id: number;
  name: string;
  title: string;
  image: string;
  description?: string;
}
const data: DataProps[] = [
  {
    id: 1,
    name: 'Chris Black',
    title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    image: '../images/hcm/placeholder-male-01.png',
    description: "something goes here"
  },
  {
    id: 2,
    name: 'Christine Cooper',
    title: 'Senior Principal Escalation Manager',
    image: '../images/hcm/placeholder-female-01.png',
  },
  {
    id: 3,
    name: 'Chris Benalamore',
    title: 'Area Business Operations Director EMEA & JAPAC',
    image: '../images/hcm/placeholder-male-03.png',
  },
  {
    id: 4,
    name: 'Christopher Johnson',
    title: 'Vice-President HCM Application Development',
    image: '../images/hcm/placeholder-male-04.png',
  },
  {
    id: 5,
    name: 'Samire Christian',
    title: 'Consulting Project Technical Manager',
    image: '../images/hcm/placeholder-male-05.png',
  },
  {
    id: 6,
    name: 'Kurt Marchris',
    title: 'Customer Service Analyst',
    image: '../images/hcm/placeholder-male-06.png',
  },
  {
    id: 7,
    name: 'Zelda Christian Cooperman',
    title: 'Senior Principal Escalation Manager',
    image: "../images/hcm/placeholder-female-02.png",
  },
];
export const ListViewTest3: FunctionalComponent<Props> = ({ fieldOptions }: Props) => {
  const dataProvider = new MutableArrayDataProvider(data, {
    keyAttributes: 'id',
  });



  const itemTemplate: CListViewElement.RenderItemTemplate<DataProps['id'], DataProps> = (
    item
  ) => {
    const testing = () => {}
    const quaternarySlot = () => {
      return (fieldOptions?.description === "include" && item.data.description) ? <div slot="quaternary" class="oj-typography-body-sm oj-text-color-secondary">
        <div class=" oj-sp-attachments2-listview-description oj-line-clamp-3">
          {item.data.description}
        </div>
      </div> : ""
    }
    return (
      <oj-list-item-layout>
        <div id="_primaryText"
          class="oj-typography-body-md oj-text-color-primary oj-sp-attachments2-listview-title">
          {item.data.title}
        </div>
        <div slot="secondary" class="oj-line-clamp-2 oj-typography-body-sm oj-sp-attachments2-listview-fileSize">
          file size
        </div>
        <div slot="action">
          <oj-c-button id="editRecommendationButton" display="icons" label="Edit Recommendation"
            size="sm" chroming="borderless" onojAction={testing}>
            <span className="oj-ux-ico-edit-inline-s" slot="startIcon"></span>
          </oj-c-button>
        </div>
        {quaternarySlot()}
      </oj-list-item-layout>
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-list-view
        aria-label="Employees"
        data={dataProvider}
        id="listview"
      >
        <template slot='itemTemplate' render={itemTemplate} />
      </oj-list-view>
    </div>
  );
}