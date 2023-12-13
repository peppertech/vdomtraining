import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojfilmstrip";
import Avatar from "./avatar";

const FilmStrip = () => {
	const [avatars] = useState([
		{ src: "images/hcm/placeholder-female-01.png", ariaLabel: "Person 1" },
		{ src: "images/hcm/placeholder-male-03.png", ariaLabel: "Person 2" },
		{ src: "images/hcm/placeholder-female-01.png", ariaLabel: "Person 3" },
		{ src: "images/hcm/placeholder-male-03.png", ariaLabel: "Person 4" },
		{ src: "images/hcm/placeholder-male-04.png", ariaLabel: "Person 5" },
		{ src: "images/hcm/placeholder-male-05.png", ariaLabel: "Person 6" },
		{ src: "images/hcm/placeholder-male-06.png", ariaLabel: "Person 7" },
	]);
	const [navArrowPlacement, setNavArrowPlacement] = useState("adjacent");
	const [navArrowVisibility, setNavArrowVisibility] = useState("auto");

	return (
		<oj-film-strip
			id="filmStrip"
			aria-label="Set of avatars"
			arrow-placement={navArrowPlacement}
			arrow-visibility={navArrowVisibility}
		>
			{avatars.map((avatar, index) => (
				<Avatar
					key={index}
					src={avatar.src}
					initials="AB"
					size="md"
					shape="square"
					ariaLabel={avatar.ariaLabel}
				/>
			))}
		</oj-film-strip>
	);
};

export default FilmStrip;
