import "oj-c/form-layout";
import "oj-c/rich-checkboxset";

import {
  avatarOptions,
  iconOptions,
  industryOptions,
  noMediaOptions,
} from "./richCheckBoxsetCorePack-shared";

export default function RichCheckBoxsetCorePackLayoutExample() {
  return (
    <div id="div1">
      <h5>'xl' layout</h5>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth>
          <oj-c-rich-checkboxset
            layout="xl"
            options={industryOptions}
            labelHint="XL Thumbnail"
          />
        </oj-c-form-layout>
      </div>

      <h5>'md' layout</h5>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth>
          <oj-c-rich-checkboxset
            layout="md"
            options={industryOptions}
            labelHint="MD Thumbnail"
          />
          <oj-c-rich-checkboxset
            layout="md"
            options={avatarOptions}
            labelHint="MD Avatar"
          />
        </oj-c-form-layout>
      </div>

      <h5>'sm' layout</h5>
      <div class="oj-sm-padding-10x-bottom">
        <oj-c-form-layout direction="row" fullWidth>
          <oj-c-rich-checkboxset
            layout="sm"
            options={industryOptions}
            labelHint="SM Thumbnail"
          />
          <oj-c-rich-checkboxset
            layout="sm"
            options={avatarOptions}
            labelHint="SM Avatar"
          />
          <oj-c-rich-checkboxset
            layout="sm"
            options={iconOptions}
            labelHint="SM Icon"
          />
          <oj-c-rich-checkboxset
            layout="sm"
            options={noMediaOptions}
            labelHint="SM No Media"
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
}
