import "oj-c/avatar";
import 'preact';
import { ComponentProps } from 'preact';
import * as PeopleData from "text!./data/peopleData.json";

type AvatarProps = ComponentProps<"oj-c-avatar">;
type AvatarBackground = NonNullable<AvatarProps["background"]>;
type AvatarSize = NonNullable<AvatarProps["size"]>;

type PersonRecord = {
  name: string;
  image?: string;
};

const people: PersonRecord[] = JSON.parse(PeopleData);
const primaryPerson: PersonRecord = people[0] ?? {
  name: "Taylor Smith",
  image: "images/composites/avatar-image.jpg",
};

const sampleName = primaryPerson.name;
const initials = sampleName
  .split(/\s+/)
  .map((part) => part.charAt(0).toUpperCase())
  .slice(0, 2)
  .join("") || "TS";

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

const CorePackAvatar = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Content</h6>
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
                src={primaryPerson.image}
                initials={initials}
                aria-label={sampleName}
                title={sampleName}
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
                aria-label={sampleName}
                title={sampleName}
              ></oj-c-avatar>
            </td>
            <td>
              <oj-c-avatar aria-label="Placeholder avatar" title="Placeholder avatar"></oj-c-avatar>
            </td>
          </tr>
        </tbody>
      </table>

      <h6 class="oj-sm-margin-4x-top">Shapes</h6>
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
                aria-label={sampleName}
                title={sampleName}
                shape="square"
              ></oj-c-avatar>
            </td>
            <td>
              <oj-c-avatar
                initials={initials}
                aria-label={sampleName}
                title={sampleName}
                shape="circle"
              ></oj-c-avatar>
            </td>
          </tr>
        </tbody>
      </table>

      <h6 class="oj-sm-margin-4x-top">Backgrounds</h6>
      <table class="oj-helper-text-align-center" role="presentation">
        <tbody>
          <tr>
            {backgroundVariants.map((variant) => (
              <th key={`bg-${variant.value}`}>{variant.label}</th>
            ))}
          </tr>
          <tr>
            {backgroundVariants.map((variant) => (
              <td key={`bg-avatar-${variant.value}`}>
                <oj-c-avatar
                  initials={initials}
                  background={variant.value}
                  aria-label={`${sampleName} ${variant.label}`}
                  title={`${sampleName} ${variant.label}`}
                ></oj-c-avatar>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h6 class="oj-sm-margin-4x-top">Sizes</h6>
      <table class="oj-helper-text-align-center" role="presentation">
        <tbody>
          <tr>
            {sizeVariants.map((variant) => (
              <th key={`size-${variant.value}`}>{variant.label}</th>
            ))}
          </tr>
          <tr>
            {sizeVariants.map((variant) => (
              <td key={`size-avatar-${variant.value}`}>
                <oj-c-avatar
                  initials={initials}
                  size={variant.value}
                  aria-label={`${sampleName} ${variant.label}`}
                  title={`${sampleName} ${variant.label}`}
                ></oj-c-avatar>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CorePackAvatar;
