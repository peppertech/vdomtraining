// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojListView } from 'ojs/ojlistview';
import { ojMenu } from 'ojs/ojmenu';
import { ojSwipeActions } from 'ojs/ojswipeactions';
import "css!./demo.css";
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojswipeactions';

export const SwipeToRevealBasicSwipeToReveal = () => {
  const [allItems, setAllItems] = useState([
    { id: 'email_1', title: 'Meeting Invite: Product direction', from: 'Amy Bartlet', image: '/styles/images/listItemImages/placeholder-female-01.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum.' },
    { id: 'email_2', title: 'Re: Latest market analysis from XYZ', from: 'Nina Evans', image: '/styles/images/listItemImages/placeholder-female-02.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
    { id: 'email_3', title: 'Feedback from architecture review', from: 'James Marlow', image: '/styles/images/listItemImages/placeholder-male-01.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
    { id: 'email_4', title: 'Customer success stories', from: 'Julia Nayar', image: '/styles/images/listItemImages/placeholder-female-03.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
    { id: 'email_5', title: 'AD: Honey Harvest for 2015', from: 'Bruce Ernst', image: '/styles/images/listItemImages/placeholder-male-02.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
    { id: 'email_6', title: 'Friend looking for internship', from: 'Julia Chen', image: '/styles/images/listItemImages/placeholder-female-04.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
    { id: 'email_7', title: 'Re: Feedback from architecture review', from: 'Nina Evans', image: '/styles/images/listItemImages/placeholder-female-02.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
    { id: 'email_8', title: 'Re: Customer success stories', from: 'Julia Chen', image: '/styles/images/listItemImages/placeholder-female-04.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' }
  ]);
  const [action, setAction] = useState('No action taken yet');
  const currentItemRef = useRef(null);

  const dataProvider = useMemo(
    () => new ArrayDataProvider(allItems, { keyAttributes: 'id' }),
    [allItems]
  );

  const renderOptions = (data: any) => (data.id === 'email_3' ? 'archive' : 'read');
  const remove = (key: any) => setAllItems((items: any) => items.filter((current: any) => current.id !== key));

  const doAction = (nextAction: any) => {
    if (currentItemRef.current != null) {
      setAction(`Handle ${nextAction} action on: ${currentItemRef.current}`);
    }

    if (nextAction === 'trash') {
      remove(currentItemRef.current);
    } else if (nextAction === 'more') {
      const menu = document.getElementById('moremenu');
      menu?.open();
    }
  };

  const handleAction = (event: any, context: any) => {
    currentItemRef.current = context.data.id;
    doAction(event.target.value);
  };

  const handleMenuItemAction = (event: any) => {
    doAction(event.detail.selectedValue);
  };

  const startTemplateRenderer = (item: any) =>
    renderOptions(item.data) === 'read' ? (
      <oj-option value="read">
        Unread
        <span class="oj-ux-ico-email-unread" slot="startIcon" />
      </oj-option>
    ) : (
      <oj-option value="archive" class="oj-swipeactions-danger">
        Archive
        <span class="oj-ux-ico-archive" slot="startIcon" />
      </oj-option>
    );

  const endTemplateRenderer = () => (
    <>
      <oj-option class="oj-swipeactions-neutral" value="more">
        More
        <span class="oj-ux-ico-overflow-horiz" slot="startIcon" />
      </oj-option>
      <oj-option class="oj-swipeactions-attention" value="flag">
        Flag
        <span class="oj-ux-ico-flag" slot="startIcon" />
      </oj-option>
      <oj-option class="oj-swipeactions-danger oj-swipeactions-default" value="trash">
        Trash
        <span class="oj-ux-ico-trash" slot="startIcon" />
      </oj-option>
    </>
  );

  const itemTemplateRenderer = (item: any) => (
    <li class="oj-swipeactions-container">
      <oj-swipe-actions onojAction={(event: any) => handleAction(event, item)}>
        <oj-list-item-layout>
          <oj-avatar slot="leading" size="xs" src={item.data.image} />
          <span class="oj-typography-body-md oj-text-color-primary">{item.data.from}</span>
          <span slot="secondary" class="oj-line-clamp-1 oj-typography-body-sm oj-text-color-secondary">{item.data.title}</span>
          <div slot="tertiary" class="oj-line-clamp-2 oj-typography-body-xs oj-text-color-secondary">{item.data.content}</div>
          <span slot="action" class="oj-typography-body-sm oj-text-color-secondary">Yesterday</span>
        </oj-list-item-layout>
        <template slot="start" render={() => startTemplateRenderer(item)} />
        <template slot="end" render={endTemplateRenderer} />
      </oj-swipe-actions>
    </li>
  );

  return (
    <div id="listviewContainer">
      <span class="oj-typography-bold">{action}</span>
      <oj-list-view id="listview" class="demo-list" data={dataProvider} aria-label="listview with swipe actions">
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-list-view>
      <oj-menu
        id="moremenu"
        aria-label="More Actions"
        onojMenuAction={handleMenuItemAction}
        {...({ 'open-options.display': 'sheet', 'open-options.launcher': 'listview' } as any)}
      >
        <oj-option id="reply">Reply</oj-option>
        <oj-option id="forward">Forward</oj-option>
        <oj-option id="move">Move...</oj-option>
      </oj-menu>
    </div>
  );
};

export default SwipeToRevealBasicSwipeToReveal;
