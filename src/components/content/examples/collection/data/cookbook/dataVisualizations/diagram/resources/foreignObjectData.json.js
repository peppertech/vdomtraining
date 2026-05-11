define([], function () { return { __esModule: true, default: {
  "nodes": [
    {
      "id": "Orders",
      "type": "Table",
      "nodes": [
        {
          "id": "orderId",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "customerID",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "dateOrdered",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "status",
          "type": "column",
          "nodeType": "string"
        },
        {
          "id": "orderAmount",
          "type": "column",
          "nodeType": "number"
        }
      ]
    },
    {
      "id": "OrderDetails",
      "type": "Table",
      "nodes": [
        {
          "id": "orderDetailsId",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "orderId (foreign_key)",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "productId (foreign_key)",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "quantity",
          "type": "column",
          "nodeType": "number"
        }
      ]
    },
    {
      "id": "Products",
      "type": "Table",
      "nodes": [
        {
          "id": "productId",
          "type": "column",
          "nodeType": "number"
        },
        {
          "id": "productName",
          "type": "column",
          "nodeType": "string"
        },
        {
          "id": "description",
          "type": "column",
          "nodeType": "string"
        },
        {
          "id": "unitPrice",
          "type": "column",
          "nodeType": "number"
        }
      ]
    }
  ],
  "links": [
    {
      "id": "link0",
      "startTable": "Orders",
      "endTable": "OrderDetails",
      "startNode": "orderId (foreign_key)",
      "endNode": "orderId"
    },
    {
      "id": "link1",
      "startTable": "OrderDetails",
      "endTable": "Products",
      "endNode": "productId",
      "startNode": "productId (foreign_key)"
    }
  ]
}
 }; });

