import { ComponentProps } from "preact";
import 'oj-c/split-menu-button';
import 'oj-c/form-layout';
import 'oj-c/rich-checkboxset';
import { CRichCheckboxsetElement, RichCheckboxset } from 'oj-c/rich-checkboxset';

type RichCheckboxsetProps = ComponentProps<typeof RichCheckboxset>
const thumbnailOptions: RichCheckboxsetProps['options'] = [
  {
    value: 'automotive',
    label: 'Automotive',
    secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    thumbnailSrc: 'images/formControls/automotive.jpg'
  },
  {
    value: 'communications',
    label: 'Communications',
    secondaryText: 'Proin mauris ipsum, efficitur at dui ut, auctor iaculis felis.',
    thumbnailSrc: 'images/formControls/communications.jpg'
  },
  {
    value: 'construction',
    label: 'Construction',
    secondaryText: 'Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    thumbnailSrc: 'images/formControls/construction.jpg'
  },
  {
    value: 'distribution',
    label: 'Distribution',
    secondaryText: 'Maecenas urna augue, tempus vitae fringilla in, cursus sit amet magna. Praesent blandit nibh metus, id varius velit varius eget.',
    thumbnailSrc: 'images/formControls/distribution.jpg'
  },
  {
    value: 'education',
    label: 'Education',
    secondaryText: 'Cras cursus, mi quis tincidunt tincidunt, augue dolor consequat mauris, iaculis sollicitudin ante purus eu eros.',
    thumbnailSrc: 'images/formControls/education.jpg'
  },
  {
    value: 'travel',
    label: 'Travel',
    secondaryText: 'Fusce at nunc vehicula, viverra arcu vel, eleifend odio.',
    thumbnailSrc: 'images/formControls/travel.jpg'
  }
];

const avatarOptions: RichCheckboxsetProps['options'] = [
  {
    value: 'black',
    label: 'Chris Black',
    secondaryText: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
    avatar: { src: 'images/hcm/placeholder-male-01.png' }
  },
  {
    value: 'cooper',
    label: 'Christine Cooper',
    secondaryText: 'Senior Principal Escalation Manager',
    avatar: { src: 'images/hcm/placeholder-female-01.png' }
  },
  {
    value: 'benalamore',
    label: 'Chris Benalamore',
    secondaryText: 'Area Business Operations Director EMEA & JAPAC',
    avatar: { src: 'images/hcm/placeholder-male-03.png' }
  },
  {
    value: 'johnson',
    label: 'Christopher Johnson',
    secondaryText: 'Vice-President HCM Application Development',
    avatar: { initials: "CJ", background: "teal" }
  },
  {
    value: 'christian',
    label: 'Samire Christian',
    secondaryText: 'Consulting Project Technical Manager',
    avatar: { src: 'images/hcm/placeholder-male-05.png' }
  },
  {
    value: 'marchris',
    label: 'Kurt Marchris',
    secondaryText: 'Customer Service Analyst',
    avatar: { initials: "KM", background: "purple" }
  }
];

export function RichCheckboxSet() {
  return (
    <div>
      <h2>Rich Checkboxset Content</h2>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth={true}>
          <oj-c-rich-checkboxset layout="xl" id="xlThumnailCheckboxset" options={thumbnailOptions}
            labelHint="XL Thumbnail"></oj-c-rich-checkboxset>
        </oj-c-form-layout>
      </div>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth={true}>
          <oj-c-rich-checkboxset layout="md" id="mdThumbnailCheckboxset" options={thumbnailOptions}
            labelHint="Range Selection, (min-selected=2 and max-selected=3)"
            labelEdge="top"
            help={{ instruction: "Select 2 to 3 employees." }}
            minSelected={2}
            maxSelected={3}></oj-c-rich-checkboxset>
          <oj-c-rich-checkboxset layout="md" id="mdAvatarCheckboxset" options={avatarOptions}
            labelHint="MD Avatar"></oj-c-rich-checkboxset>
        </oj-c-form-layout>
      </div>
    </div>
  );
}