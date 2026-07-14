import "oj-c/avatar";
import 'preact';
import { ComponentProps } from 'preact';
import * as PeopleData from "text!./data/peopleData.json";

type PersonRecord = {
  name: string;
  image?: string;
};

const people: PersonRecord[] = JSON.parse(PeopleData);
const primaryPerson: PersonRecord = people[0] ?? {
  name: "OpenAI Redwood",
  image: "images/composites/avatar-image.jpg",
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (!parts.length) {
    return "AA";
  }
  const first = parts[0].charAt(0).toUpperCase();
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : "";
  return `${first}${last || first}`;
};

const fullName = primaryPerson.name;
const names = fullName.split(/\s+/);
const firstName = names[0] ?? "OpenAI";
const lastName = names.length > 1 ? names[names.length - 1] : "Redwood";
const initials = getInitials(fullName);

type CoreAvatarProps = ComponentProps<"oj-c-avatar">;
type AvatarBackground = NonNullable<CoreAvatarProps["background"]>;
type AvatarSize = NonNullable<CoreAvatarProps["size"]>;

const backgroundVariants: Array<{ label: string; value: AvatarBackground }> = [
  { label: "Neutral", value: "neutral" },
  { label: "Orange", value: "orange" },
  { label: "Green", value: "green" },
  { label: "Teal", value: "teal" },
  { label: "Blue", value: "blue" },
  { label: "Slate", value: "slate" },
  { label: "Pink", value: "pink" },
  { label: "Purple", value: "purple" },
  { label: "Lilac", value: "lilac" },
  { label: "Gray", value: "gray" },
];

const sizeVariants: Array<{ label: string; value: AvatarSize }> = [
  { label: "2xs", value: "2xs" },
  { label: "xs", value: "xs" },
  { label: "sm", value: "sm" },
  { label: "md", value: "md" },
  { label: "lg", value: "lg" },
  { label: "xl", value: "xl" },
  { label: "2xl", value: "2xl" },
];

const Avatar = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
    <div
      id="avatar-demo-container"
      class="demo-avatar oj-web-applayout-max-width oj-web-applayout-content"
      data-oj-binding-provider="none"
    >
      <h6>Content</h6>
      <div>
        <table class="oj-helper-text-align-center" role="presentation">
          <tbody>
            <tr>
              <th>Image</th>
              <th>Icon</th>
              <th>Initials</th>
              <th>Placeholder</th>
            </tr>
            <tr>
              <td>
                <oj-c-avatar
                  initials={initials}
                  src={primaryPerson.image}
                  aria-label={`${firstName} ${lastName}`}
                  title={`${firstName} ${lastName}`}
                ></oj-c-avatar>
              </td>
              <td>
                <oj-c-avatar
                  icon-class="oj-ux-ico-contact-group"
                  aria-label="Contact group"
                  title="Contact group"
                ></oj-c-avatar>
              </td>
              <td>
                <oj-c-avatar
                  initials={initials}
                  aria-label={`${firstName} ${lastName}`}
                  title={`${firstName} ${lastName}`}
                ></oj-c-avatar>
              </td>
              <td>
                <oj-c-avatar aria-label="Placeholder" title="Placeholder"></oj-c-avatar>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h6>Shapes</h6>
      <table class="oj-helper-text-align-center" role="presentation">
        <tbody>
          <tr>
            <th>Square</th>
            <th>Circle</th>
          </tr>
          <tr>
            <td>
              <oj-c-avatar
                initials={initials}
                aria-label={`${firstName} ${lastName}`}
                title={`${firstName} ${lastName}`}
                shape="square"
              ></oj-c-avatar>
            </td>
            <td>
              <oj-c-avatar
                initials={initials}
                aria-label={`${firstName} ${lastName}`}
                title={`${firstName} ${lastName}`}
                shape="circle"
              ></oj-c-avatar>
            </td>
          </tr>
        </tbody>
      </table>

      <h6>Background</h6>
      <table class="oj-helper-text-align-center" role="presentation">
        <tbody>
          <tr>
            {backgroundVariants.map((variant) => (
              <th key={variant.label}>{variant.label}</th>
            ))}
          </tr>
          <tr>
            {backgroundVariants.map((variant) => (
              <td key={variant.label}>
                <oj-c-avatar
                  initials={initials}
                  background={variant.value}
                  aria-label={`${firstName} ${lastName}`}
                  title={`${firstName} ${lastName}`}
                ></oj-c-avatar>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h6>Sizes</h6>
      <table class="oj-helper-text-align-center" role="presentation">
        <tbody>
          <tr>
            {sizeVariants.map((variant) => (
              <th key={variant.value}>{variant.label}</th>
            ))}
          </tr>
          <tr>
            {sizeVariants.map((variant) => (
              <td key={variant.value}>
                <oj-c-avatar
                  initials={initials}
                  size={variant.value}
                  aria-label={`${firstName} ${lastName}`}
                  title={`${firstName} ${lastName}`}
                ></oj-c-avatar>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Avatar;
