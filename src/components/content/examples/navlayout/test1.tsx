import { useCallback, useRef, useState } from 'preact/hooks';
import 'ojs/ojdialog';
import { ojDialog } from 'ojs/ojdialog';
import 'oj-c/button';
import 'ojs/ojtreeview';
import { ojTreeView } from 'ojs/ojtreeview';
import { KeySetImpl } from 'ojs/ojkeyset';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

export function Test1() {
  const dialogRef = useRef<ojDialog>(null);
  const openDialog = useCallback(() => {
    dialogRef.current?.open();
  }, []);

  const expandedItem = new KeySetImpl(['links', 'oracle', 'asia']);

  const jsonData = [
    {
      "title": "News",
      "id": "news"
    },
    {
      "title": "Blogs",
      "id": "blogs",
      "children": [
        {
          "title": "Today",
          "id": "today"
        },
        {
          "title": "Yesterday",
          "id": "yesterday"
        },
        {
          "title": "Archive",
          "id": "archive"
        }
      ]
    },
    {
      "title": "Links",
      "id": "links",
      "children": [
        {
          "title": "Oracle",
          "id": "oracle",
          "children": [
            {
              "title": "USA",
              "id": "usa",
              "children": [
                {
                  "title": "Northeast",
                  "id": "northeast"
                },
                {
                  "title": "Midwest",
                  "id": "midwest"
                },
                {
                  "title": "South",
                  "id": "south"
                },
                {
                  "title": "West",
                  "id": "west"
                }
              ]
            },
            {
              "title": "Europe",
              "id": "europe"
            },
            {
              "title": "Asia",
              "id": "asia",
              "children": [
                {
                  "title": "Japan",
                  "id": "japan"
                },
                {
                  "title": "China",
                  "id": "china"
                },
                {
                  "title": "India",
                  "id": "india"
                },
                {
                  "title": "abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg",
                  "id": "longname"
                }
              ]
            }
          ]
        },
        {
          "title": "IBM",
          "id": "ibm"
        },
        {
          "title": "Microsoft",
          "id": "microsoft"
        }
      ]
    }
  ]
  const data = new ArrayTreeDataProvider<string, { title: string }>(jsonData, { keyAttributes: 'id' });

  const renderTreeNode = useCallback((treeNode: ojTreeView.ItemTemplateContext<string, { title: string }>) => {
    return <>
      <span className="oj-treeview-item-icon"></span>
      <span className="oj-treeview-item-text">{treeNode.data.title}</span>
    </>
  }, []);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <p>Repeatedly open and close the dialog using ESC.  Eventually the initial scrollbar position will be incorrect.</p>
      <oj-c-button onojAction={openDialog} label="Open Dialog" />
      <div>
        <oj-dialog ref={dialogRef} cancelBehavior='escape' dialogTitle="Dialog">
          <div slot="body">
            <oj-tree-view data={data} expanded={expandedItem} style="height: 300px;">
              <template slot="itemTemplate" render={renderTreeNode}></template>
            </oj-tree-view>
          </div>
        </oj-dialog>
      </div>
    </div>
  )
};