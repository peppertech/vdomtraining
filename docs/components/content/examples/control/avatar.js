define(["require", "exports", "preact/jsx-runtime", "text!./data/peopleData.json", "ojs/ojavatar"], function (require, exports, jsx_runtime_1, PeopleData) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const people = JSON.parse(PeopleData);
    const sizes = ["lg", "md", "sm", "xs"];
    const getInitials = (name) => {
        let firstlast = name.split(" ");
        let firstInitial = firstlast[0].charAt(0).toUpperCase();
        let lastInital = firstlast[firstlast.length - 1].charAt(0).toUpperCase();
        return firstInitial + lastInital;
    };
    const Avatar = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [sizes.map((item, idx) => {
                    return ((0, jsx_runtime_1.jsx)("oj-avatar", { role: "img", src: people[idx].image, initials: getInitials(people[idx].name), size: item, shape: "square", "aria-label": people[idx].name, title: people[idx].image }));
                }), sizes.map((item, idx) => {
                    return ((0, jsx_runtime_1.jsx)("oj-avatar", { role: "img", src: people[idx].image, initials: getInitials(people[idx].name), size: item, shape: "circle", "aria-label": people[idx].name, title: people[idx].image }));
                })] }));
    };
    exports.default = Avatar;
});
