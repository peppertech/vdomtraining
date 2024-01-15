import { ComponentProps } from "preact";
import "ojs/ojavatar";
import * as PeopleData from "text!./data/peopleData.json";

const people = JSON.parse(PeopleData);
type AvatarProps = ComponentProps<"oj-avatar">;
const sizes: Array<Partial<AvatarProps["size"]>> = ["lg", "md", "sm", "xs"];

const getInitials = (name: string) => {
  let firstlast = name.split(" ");
  let firstInitial = firstlast[0].charAt(0).toUpperCase();
  let lastInital = firstlast[firstlast.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInital;
};

const Avatar = () => {
  return (
    <>
      {sizes.map((item, idx) => {
        return (
          <oj-avatar
            role="img"
            src={people[idx].image}
            initials={getInitials(people[idx].name)}
            size={item}
            shape="square"
            aria-label={people[idx].name}
            title={people[idx].image}></oj-avatar>
        );
      })}
      {sizes.map((item, idx) => {
        return (
          <oj-avatar
            role="img"
            src={people[idx].image}
            initials={getInitials(people[idx].name)}
            size={item}
            shape="circle"
            aria-label={people[idx].name}
            title={people[idx].image}></oj-avatar>
        );
      })}
    </>
  );
};

export default Avatar;
