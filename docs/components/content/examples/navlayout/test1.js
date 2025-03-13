define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojkeyset", "ojs/ojarraytreedataprovider", "ojs/ojdialog", "oj-c/button", "ojs/ojtreeview"], function (require, exports, jsx_runtime_1, hooks_1, ojkeyset_1, ArrayTreeDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test1 = void 0;
    function Test1() {
        const dialogRef = (0, hooks_1.useRef)(null);
        const openDialog = (0, hooks_1.useCallback)(() => {
            var _a;
            (_a = dialogRef.current) === null || _a === void 0 ? void 0 : _a.open();
        }, []);
        const expandedItem = new ojkeyset_1.KeySetImpl(['links', 'oracle', 'asia']);
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
        ];
        const data = new ArrayTreeDataProvider(jsonData, { keyAttributes: 'id' });
        const renderTreeNode = (0, hooks_1.useCallback)((treeNode) => {
            return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "oj-treeview-item-icon" }), (0, jsx_runtime_1.jsx)("span", { className: "oj-treeview-item-text", children: treeNode.data.title })] });
        }, []);
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsx)("p", { children: "Repeatedly open and close the dialog using ESC.  Eventually the initial scrollbar position will be incorrect." }), (0, jsx_runtime_1.jsx)("oj-c-button", { onojAction: openDialog, label: "Open Dialog" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("oj-dialog", { ref: dialogRef, cancelBehavior: 'escape', dialogTitle: "Dialog", children: (0, jsx_runtime_1.jsx)("div", { slot: "body", children: (0, jsx_runtime_1.jsx)("oj-tree-view", { data: data, expanded: expandedItem, style: "height: 300px;", children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderTreeNode }) }) }) }) })] }));
    }
    exports.Test1 = Test1;
    ;
});
