define(["require", "exports", "preact/jsx-runtime", "text!./data/peopleData.json", "ojs/ojfilmstrip"], function (require, exports, jsx_runtime_1, peopleData) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const navArrowPlacement = "adjacent";
    const navArrowVisibility = "auto";
    const people = JSON.parse(peopleData);
    const getInitials = (name) => {
        let firstlast = name.split(" ");
        let firstInitial = firstlast[0].charAt(0).toUpperCase();
        let lastInital = firstlast[firstlast.length - 1].charAt(0).toUpperCase();
        return firstInitial + lastInital;
    };
    const FilmStrip = () => {
        return ((0, jsx_runtime_1.jsx)("oj-film-strip", { id: "filmStrip", "aria-label": "Set of avatars", arrowPlacement: navArrowPlacement, arrowVisibility: navArrowVisibility, children: people.map((person, index) => ((0, jsx_runtime_1.jsx)("oj-avatar", { src: person.image, initials: person.image ? "" : getInitials(person.name), size: "xxl", shape: "square", "aria-label": person.name }, index))) }));
    };
    exports.default = FilmStrip;
});
