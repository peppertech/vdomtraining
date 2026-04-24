import { h } from "preact";
import "oj-c/form-layout";
import "oj-c/rich-radioset";
import {
  employeeOptions,
  extendedIndustryOptions,
  iconOptions,
  noMediaOptions,
} from "./richRadioSet-shared";

export default function RichRadioSetLayoutExample() {
  return (
    <div id="richRadiosetLayout">
      <h5>&apos;xl&apos; layout</h5>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth>
          <oj-c-rich-radioset
            layout="xl"
            id="xlThumbnailRadioset"
            options={extendedIndustryOptions}
            labelHint="XL Thumbnail"
            value="automotive"
          />
        </oj-c-form-layout>
      </div>

      <h5>&apos;md&apos; layout</h5>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth>
          <oj-c-rich-radioset
            layout="md"
            id="mdThumbnailRadioset"
            options={extendedIndustryOptions}
            labelHint="MD Thumbnail"
            value="automotive"
          />
          <oj-c-rich-radioset
            layout="md"
            id="mdAvatarRadioset"
            options={employeeOptions}
            labelHint="MD Avatar"
            value="benalamore"
          />
        </oj-c-form-layout>
      </div>

      <h5>&apos;sm&apos; layout</h5>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth>
          <oj-c-rich-radioset
            layout="sm"
            id="smThumbnailRadioset"
            options={extendedIndustryOptions}
            labelHint="SM Thumbnail"
            value="automotive"
          />
          <oj-c-rich-radioset
            layout="sm"
            id="smAvatarRadioset"
            options={employeeOptions}
            labelHint="SM Avatar"
            value="benalamore"
          />
          <oj-c-rich-radioset
            layout="sm"
            id="smIconRadioset"
            options={iconOptions}
            labelHint="SM Icon"
            value="share"
          />
          <oj-c-rich-radioset
            layout="sm"
            id="smNoMediaRadioset"
            options={noMediaOptions}
            labelHint="SM No Media"
            value="option-1"
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
}
