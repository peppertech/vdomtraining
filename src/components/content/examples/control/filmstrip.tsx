import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojfilmstrip";
import Avatar from "./avatar";

const FilmStrip = () => {
	const [avatars] = useState([
		{ src: "images/hcm/placeholder-female-01.png" },
		{ src: "images/hcm/placeholder-male-03.png" },
		{ src: "images/hcm/placeholder-male-04.png" },
		{ src: "images/hcm/placeholder-male-05.png" },
		{ src: "images/hcm/placeholder-male-06.png" },
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
				<>
					<Avatar
						src={avatar.src}
						initials="AB"
						size="md"
						shape="square"
						ariaLabel="Amy Bartlett"
					/>
				</>
			))}
		</oj-film-strip>
	);
};

export default FilmStrip;
