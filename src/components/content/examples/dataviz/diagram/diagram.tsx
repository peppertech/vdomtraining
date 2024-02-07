import { ComponentProps } from "preact";
import "ojs/ojdiagram";
import { ojDiagram } from "ojs/ojdiagram";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as data from "text!../data/diagramDataSample.json";
import layout = require("./DemoCircleLayout");
import { ColorAttributeGroupHandler } from "ojs/ojattributegrouphandler";

type Node = {
  id: string;
  category: string;
};

type Link = {
  id: string;
  category: string;
  start: string;
  end: string;
};
const colorHandler = new ColorAttributeGroupHandler();
const layoutFunc = layout.circleLayoutWithLayoutArgs(150);
const getShape = (category: string) => {
  const shape =
    category === "0" ? "star" : category === "1" ? "diamond" : "circle";
  return shape;
};

type DiagProps = ComponentProps<"oj-diagram">;
const overviewProps: DiagProps["overview"] = {
  rendered: "on",
  valign: "top",
  halign: "start",
  fitArea: "canvas",
  preserveAspectRatio: "none",
  width: 175,
};
const styleDefaults: DiagProps["styleDefaults"] = {
  nodeDefaults: { icon: { width: 50, height: 50 } },
  linkDefaults: { endConnectorType: "arrow" },
};

const linkDataProvider: MutableArrayDataProvider<Link["id"], Link> =
  new MutableArrayDataProvider(JSON.parse(data).links, {
    keyAttributes: "id",
  });
const nodeDataProvider: MutableArrayDataProvider<Node["id"], Node> =
  new MutableArrayDataProvider(JSON.parse(data).nodes, {
    keyAttributes: "id",
  });

const nodeTemplate = (node: any) => {
  return (
    <oj-diagram-node
      label={node.data.id}
      shortDesc={`Node ${node.data.id} Category ${node.data.category}`}
      icon={{
        color: colorHandler.getValue(node.data.category),
        shape: getShape(node.data.category),
      }}></oj-diagram-node>
  );
};

const linkTemplate = (link: any) => {
  return (
    <oj-diagram-link
      startNode={link.data.start}
      endNode={link.data.end}
      shortDesc={`Link ${link.data.id} Category ${link.data.category} connects ${link.data.start} to ${link.data.endNode}`}
      color={colorHandler.getValue(link.data.category)}></oj-diagram-link>
  );
};
const Diagram = () => {
  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-diagram
        id="diagram1"
        class="oj-panel oj-panel-border-radius-0 oj-sm-padding-0"
        panning={"fixed"}
        zooming="auto"
        maxZoom={3}
        nodeData={nodeDataProvider}
        linkData={linkDataProvider}
        layout={layoutFunc}
        overview={overviewProps}
        styleDefaults={styleDefaults}>
        <template
          slot="nodeTemplate"
          data-oj-as="node"
          render={nodeTemplate}></template>
        <template
          slot="linkTemplate"
          data-oj-as="link"
          render={linkTemplate}></template>
      </oj-diagram>
    </div>
  );
};
export default Diagram;
