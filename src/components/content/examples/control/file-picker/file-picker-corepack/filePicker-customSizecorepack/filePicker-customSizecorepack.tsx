import "css!./demo.css";
import "oj-c/file-picker";
import 'preact';
import { useEffect,useRef } from "preact/hooks";

const demoHtml = String.raw`<div id="parentContainer" data-oj-binding-provider="none">
  <div class="oj-sm-padding-4x-top">25em width</div>
  <oj-c-file-picker id="width25em" class="demo-max-width-25em"></oj-c-file-picker>
  <div class="oj-sm-padding-4x-top">50% width</div>
  <oj-c-file-picker id="width50Percent" class="demo-max-width-50percent"></oj-c-file-picker>
  <div class="oj-sm-padding-4x-top">10em height</div>
  <oj-c-file-picker id="height10em" class="demo-height-10em"></oj-c-file-picker>
</div>`;

const mountFilePickerCustomSizecorepack = (host: HTMLElement): (() => void) => {
  host.innerHTML = demoHtml;
  const bindTarget = (host.querySelector('#parentContainer') as HTMLElement | null) ?? host;
  return () => {
    host.innerHTML = '';
  };
};

export const FilePickerCustomSizecorepack = () => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return undefined;
    }

    return mountFilePickerCustomSizecorepack(host);
  }, []);

  return <div ref={hostRef} />;
};

export default FilePickerCustomSizecorepack;
