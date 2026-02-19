// Do not change this file.
export { MyTest } from "./my-test";
declare global {
namespace preact.JSX {
      interface IntrinsicElements {
      'my-test': any;
      }
    }
  }