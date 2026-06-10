import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojavatar';
import 'ojs/ojlistview';
import 'ojs/ojactioncard';
import { ojListView } from 'ojs/ojlistview';
import "css!./demo.css";

type BadgeEndbadgeItem = {
    id: string;
    image: string;
    model: string;
    name: string;
    status: string;
    cost: string;
};

export const BadgeEndbadge = () => {
    const data1 = useMemo<BadgeEndbadgeItem[]>(() => [
        {
            id: 'id1',
            image: '/styles/images/listItemImages/rake.png',
            model: '2351654564',
            name: '22-tine steel leaf rake',
            status: 'Not Available',
            cost: '$25.50'
        },
        {
            id: 'id2',
            image: '/styles/images/listItemImages/shrubrake.png',
            model: '2351654297',
            name: 'Collector series 8in, Poly Shrub Rake',
            status: 'In Stock',
            cost: '$19.99'
        },
        {
            id: 'id3',
            image: '/styles/images/listItemImages/specialtyrake.png',
            model: '2351654982',
            name: '15in, Adjustable Thatch Rake',
            status: 'In Stock',
            cost: '$40.00'
        }
    ], []);
    const dataProvider1 = useMemo(() => new ArrayDataProvider<BadgeEndbadgeItem["id"], BadgeEndbadgeItem>(data1, {
        keyAttributes: 'id'
    }), [data1]);
    const getBadgeClass = (status: string) => {
        switch (status) {
            case 'Not Available':
                return 'oj-badge oj-badge-warning oj-badge-end';
            case 'In Stock':
                return 'oj-badge oj-badge-success oj-badge-end';
            default:
                return 'oj-badge';
        }
    };
    const itemTemplateRenderer = (item: ojListView.ItemTemplateContext<BadgeEndbadgeItem["id"], BadgeEndbadgeItem>) => {
        return <li>
                                                <oj-action-card>
                                                                <div class="demo-wrapper">
                                                                                  <div class="demo-badge-position"><span class={getBadgeClass(item.data.status)}>{item.data.status}</span></div>
                                                                                  <img class="demo-image" src={item.data.image} alt="trailing image"/>
                                                                                  <div class="oj-sm-padding-4x-top oj-sm-padding-6x-start oj-bg-neutral-0">
                                                                                                      <div class="oj-typography-body-xs oj-text-color-secondary">Gardening</div>
                                                                                                      <div class="oj-typography-body-sm oj-typography-semi-bold">{item.data.name}</div>
                                                                                                      <div class="oj-typography-body-xs oj-typography-semi-bold">{item.data.cost}</div>
                                                                                                      <div class="oj-typography-body-sm oj-sm-padding-4x-top oj-sm-padding-6x-bottom">{'PN ' + item.data.model}</div>
                                                                                                  </div>
                                                                              </div>
                                                            </oj-action-card>
                                            </li>;
    };
    const ojListViewProps: Partial<ComponentProps<'oj-list-view'>> = { gridlines: {
            item: "visible"
        } };
    return (<div id="endbadge">
            <oj-list-view id="listviewimage1" aria-label="list with list item layout" data={dataProvider1} display="card" {...ojListViewProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-list-view>
        </div>);
};
export default BadgeEndbadge;
