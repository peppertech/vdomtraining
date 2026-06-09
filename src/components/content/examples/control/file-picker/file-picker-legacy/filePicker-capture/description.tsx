// @ts-nocheck
import { h } from 'preact';

export const filePickerCaptureDescription = (
  <>
    <p>A file picker displays a clickable dropzone for selecting files from the device storage.</p>
    <p>
      The
      {" "}
      <a href={"jsdocs/oj.ojFilePicker.html#capture"}>capture</a>
      {" "}
      attribute can allow the File Picker to directly launch the camera application on mobile devices
      when the
      {" "}
      <a href={"jsdocs/oj.ojFilePicker.html#accept"}>accept</a>
      {" "}
      attribute is specified and has an associated capture control type (e.g. ["image/*"]). Specific
      cameras may be targeted by specifying "user" (front-facing), "environment" (rear-facing), or
      "implementation" (device-specific behavior). Note that this demo should be run on a physical
      mobile device and support may vary by browser and device.
    </p>
  </>
);
