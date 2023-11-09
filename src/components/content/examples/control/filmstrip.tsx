import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojfilmstrip";

const FilmStrip = () => {
	const [chemicals] = useState([
		{ name: "Hydrogen" },
		{ name: "Helium" },
		{ name: "Lithium" },
		{ name: "Beryllium" },
		{ name: "Boron" },
		// ... other chemicals
	]);
	const [navArrowPlacement, setNavArrowPlacement] = useState("adjacent");
	const [navArrowVisibility, setNavArrowVisibility] = useState("auto");

	return (
		<oj-film-strip
			id="filmStrip"
			aria-label="Set of chemicals"
			arrow-placement={navArrowPlacement}
			arrow-visibility={navArrowVisibility}
		>
			{chemicals.map((chemical, index) => (
				<div
					key={index}
					class={`
            oj-panel
            demo-filmstrip-item
            oj-bg-info-30
            oj-sm-margin-2x
            oj-helper-text-align-center
            oj-typography-bold
            oj-text-color-primary
          `}
					style={{ display: index < 3 ? "" : "none" }}
				>
					<span>{chemical.name}</span>
				</div>
			))}
		</oj-film-strip>
	);
};

export default FilmStrip;
