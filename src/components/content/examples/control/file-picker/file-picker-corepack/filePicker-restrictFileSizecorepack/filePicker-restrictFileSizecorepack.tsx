import { h } from 'preact';
import 'ojs/ojfilepicker';
import "css!./demo.css";

export const FilePickerRestrictFileSizecorepack = () => {
  return (
      <div id="parentContainer">
            <div class="oj-sm-padding-1x-top">25em width</div>
            <oj-file-picker id="width25em" class="demo-max-width-25em" />
            <div class="oj-sm-padding-1x-top">50% width</div>
            <oj-file-picker id="width50Percent" class="demo-max-width-50percent" />
            <div class="oj-sm-padding-1x-top">10em height</div>
            <oj-file-picker id="height10em" class="demo-height-10em" />
        </div>
    );
};

export default FilePickerRestrictFileSizecorepack;
