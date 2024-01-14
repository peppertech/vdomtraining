import { ComponentProps } from "preact";
import "ojs/ojfilmstrip";
import Avatar from "./avatar";
import * as peopleData from "text!./data/peopleData.json";

type FilmStripProps = ComponentProps<"oj-film-strip">;
type Person = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};
const navArrowPlacement: FilmStripProps["arrowPlacement"] = "adjacent";
const navArrowVisibility: FilmStripProps["arrowVisibility"] = "auto";
const people = JSON.parse(peopleData);

const getInitials = (name: string) => {
  let firstlast = name.split(" ");
  let firstInitial = firstlast[0].charAt(0).toUpperCase();
  let lastInital = firstlast[firstlast.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInital;
};

const FilmStrip = () => {
  return (
    <oj-film-strip
      id="filmStrip"
      aria-label="Set of avatars"
      arrowPlacement={navArrowPlacement}
      arrowVisibility={navArrowVisibility}>
      {people.map((person: Person, index: number) => (
        <Avatar
          key={index}
          src={person.image}
          initials={person.image ? "" : getInitials(person.name)}
          size="xxl"
          shape="square"
          ariaLabel={person.name}
        />
      ))}
    </oj-film-strip>
  );
};

export default FilmStrip;
