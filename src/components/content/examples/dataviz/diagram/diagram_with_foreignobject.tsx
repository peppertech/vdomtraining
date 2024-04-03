import "ojs/ojavatar";
import "ojs/ojbutton";
import "ojs/ojlistitemlayout";
import "ojs/ojdiagram";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import DemoContainerLayout = require("./DemoContainerLayout");
import { KeySetImpl } from "ojs/ojkeyset";
import { useEffect, useState } from "preact/hooks";

export function DiagramWithForeignObject() {
  const data = {
    nodes: [
      {
        id: "Orders",
        type: "Table",
        nodes: [
          {
            id: "orderId",
            type: "column",
            nodeType: "number",
          },
          {
            id: "customerID",
            type: "column",
            nodeType: "number",
          },
          {
            id: "dateOrdered",
            type: "column",
            nodeType: "number",
          },
          {
            id: "status",
            type: "column",
            nodeType: "string",
          },
          {
            id: "orderAmount",
            type: "column",
            nodeType: "number",
          },
        ],
      },
      {
        id: "OrderDetails",
        type: "Table",
        nodes: [
          {
            id: "orderDetailsId",
            type: "column",
            nodeType: "number",
          },
          {
            id: "orderId (foreign_key)",
            type: "column",
            nodeType: "number",
          },
          {
            id: "productId (foreign_key)",
            type: "column",
            nodeType: "number",
          },
          {
            id: "quantity",
            type: "column",
            nodeType: "number",
          },
        ],
      },
      {
        id: "Products",
        type: "Table",
        nodes: [
          {
            id: "productId",
            type: "column",
            nodeType: "number",
          },
          {
            id: "productName",
            type: "column",
            nodeType: "string",
          },
          {
            id: "description",
            type: "column",
            nodeType: "string",
          },
          {
            id: "unitPrice",
            type: "column",
            nodeType: "number",
          },
        ],
      },
    ],
    links: [
      {
        id: "link0",
        startTable: "Orders",
        endTable: "OrderDetails",
        startNode: "orderId (foreign_key)",
        endNode: "orderId",
      },
      {
        id: "link1",
        startTable: "OrderDetails",
        endTable: "Products",
        endNode: "productId",
        startNode: "productId (foreign_key)",
      },
    ],
  };

  const nodeDataProvider = new MutableArrayTreeDataProvider(data.nodes, "id", {
    childrenAttribute: "nodes",
  });

  const linkDataProvider = new MutableArrayDataProvider(data.links, {
    keyAttributes: "id",
  });

  const [expandedNodes, setExpandedNodes] = useState(
    new KeySetImpl().add(["OrderDetails", "Products"])
  );

  // const expandedNodes: any = new KeySetImpl().add(["OrderDetails", "Products"]);

  const layoutFunc = DemoContainerLayout.containerLayout;

  const getNodeWidth = (context: any) => {
    return context.state.expanded ? "" + (context.content.w + 40) : "200";
  };
  const getNodeHeight = (context: any, isContainer: boolean) => {
    if (isContainer)
      return context.state.expanded ? "" + (context.content.h + 100) : "58";
    return "70";
  };
  const expandCollapseButtonCallback = (event: any, context: any): any => {
    const { expanded } = context.state;

    const currentNodes = Array.from(expandedNodes.values());
    const updatedNodes = expanded
      ? currentNodes.filter((node) => node !== context.data.id)
      : [...currentNodes, context.data.id];

    const newNodes = new KeySetImpl(updatedNodes);
    setExpandedNodes(newNodes);

    //TODO: The below logic can also be used
    // if (context.state.expanded) {
    //   const currentNodes = expandedNodes.values();
    //   const currentNodes1 = Array.from(currentNodes);
    //   const updatedNodes = currentNodes1.filter(
    //     (node) => node !== context.data.id
    //   );
    //   const newNodes = new KeySetImpl(updatedNodes);
    //   setExpandedNodes(newNodes);
    // } else {
    //   const currentNodes = expandedNodes.values();
    //   const newNodes = new KeySetImpl([...currentNodes, context.data.id]);
    //   setExpandedNodes(newNodes);
    // }
  };

  const renderShortDesc = (node: any): any => {
    return (
      <oj-diagram-node
        showDisclosure="off"
        shortDesc={node.data.type + ": " + node.data.id}
      ></oj-diagram-node>
    );
  };

  const renderNodeContentTemplate = (current: any): any => {
    return (
      <>
        {current.itemData.hasOwnProperty("nodes") ? (
          <svg
            width={getNodeWidth(current)}
            height={getNodeHeight(current, true)}
          >
            <g>
              <foreignObject
                x="0"
                y="0"
                width={getNodeWidth(current)}
                height={getNodeHeight(current, true)}
                // style={{
                //   backgroundColor:
                //     "RGB(var(--oj-palette-neutral-rgb-30)) !important",
                // }}
              >
                <div class="oj-bg-neutral-30 demo-position-static demo-node-dims">
                  <div class="oj-panel oj-sm-padding-0 demo-position-static">
                    <oj-list-item-layout class="oj-listitemlayout-padding-off">
                      <div
                        slot="leading"
                        class="oj-flex oj-sm-flex-direction-row oj-sm-align-items-center"
                      >
                        <oj-avatar
                          role="img"
                          aria-label="database icon"
                          icon-class="oj-ux-ico-database"
                          size="sm"
                          background="green"
                        ></oj-avatar>
                        <div class="oj-flex-item">
                          <oj-button
                            chroming="borderless"
                            display="icons"
                            onojAction={(e) =>
                              expandCollapseButtonCallback(e, current)
                            }
                            class="oj-button-sm"
                            label={
                              current.state.expanded ? "collapse" : "expand"
                            }
                          >
                            <span
                              slot="startIcon"
                              class={
                                current.state.expanded
                                  ? "oj-ux-ico-caret-down"
                                  : "oj-ux-ico-caret-right"
                              }
                            ></span>
                          </oj-button>
                        </div>
                      </div>
                      <div class="oj-flex-item oj-typography-body-sm oj-typography-bold">
                        {current.id}
                      </div>
                    </oj-list-item-layout>
                  </div>
                </div>
              </foreignObject>
              <g transform="translate(20,80)">
                <oj-diagram-child-content></oj-diagram-child-content>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            width={getNodeWidth(current)}
            height={getNodeHeight(current, true)}
          >
            <g>
              <foreignObject
                x="0"
                y="0"
                width="200"
                height="58"
                style={{
                  style:
                    "background-color: RGB(var(--oj-palette-neutral-rgb-30)) !important;",
                }}
              >
                <div class="oj-panel oj-sm-padding-0 demo-position-static">
                  <oj-list-item-layout>
                    <span slot="leading" role="img">
                      {current.itemData.nodeType === "number" && (
                        <oj-avatar
                          role="img"
                          aria-label="numeric property"
                          icon-class="oj-ux-ico-diamond-8"
                          size="xxs"
                          shape="circle"
                          background="blue"
                        ></oj-avatar>
                      )}
                      {current.itemData.nodeType === "string" && (
                        <oj-avatar
                          role="img"
                          aria-label="numeric property"
                          icon-class="oj-ux-ico-diamond-8"
                          size="xxs"
                          shape="circle"
                          background="blue"
                        ></oj-avatar>
                      )}
                    </span>
                    <div class="oj-typography-body-sm">{current.id}</div>
                  </oj-list-item-layout>
                </div>
              </foreignObject>
            </g>
          </svg>
        )}
      </>
    );
  };

  const renderLinkTemplate = (link: any) => {
    return (
      <oj-diagram-link
        startNode={link.data.startNode}
        endNode={link.data.endNode}
        startConnectorType="circle"
        endConnectorType="arrow"
        shortDesc={
          link.data.startNode + " links to " + link.data.endTable + " table"
        }
      ></oj-diagram-link>
    );
  };

  return (
    <div id="diagram-container">
      <oj-diagram
        animationOnDataChange="auto"
        animationOnDisplay="auto"
        nodeData={nodeDataProvider}
        linkData={linkDataProvider}
        layout={layoutFunc}
        maxZoom={2}
        promotedLinkBehavior="full"
        expanded={expandedNodes}
        selectionMode="single"
        aria-label="diagram of database structure for orders"
      >
        <template slot="nodeTemplate" render={renderShortDesc}></template>
        <template
          slot="nodeContentTemplate"
          data-oj-default-focus
          data-oj-default-hover
          data-oj-default-selection
          render={renderNodeContentTemplate}
        ></template>
        <template
          slot="linkTemplate"
          dataoj-as="link"
          render={renderLinkTemplate}
        ></template>
      </oj-diagram>
    </div>
  );
}
