import "preact";

const CSSImage = () => {
  return (
    <>
      <p>
        'bulletlist-bg': this uses a background image and the image disappears
        when printed if background graphics are disabled.
      </p>
      <div
        role="img"
        class="demo-bulletlist-bg"
        title="background image"
        alt="background image" // a role of img requires an alt attribute
      ></div>

      <hr />

      <p>'bulletlist': the image still appears when printing</p>
      <div
        role="img"
        class="oj-icon bulletlist"
        title="bulleted list image"
        alt="background image" // a role of img requires an alt attribute
      ></div>

      <hr />

      <p>
        'bulletlist-hc': this uses an alternative .png in high contrast mode
      </p>
      <div
        role="img"
        class="oj-icon bulletlist-hc"
        title="bulleted list image"
        alt="bulleted list image" // a role of img requires an alt attribute
      ></div>

      <hr />

      <p>
        'bulletlist-hc-font': this uses an icon font alternative in high
        contrast mode
      </p>
      <div
        role="img"
        class="oj-icon bulletlist-hc-font"
        title="bulleted list image"
        alt="bulleted list image" // a role of img requires an alt attribute
      ></div>
    </>
  );
};
export default CSSImage;
