import "css!./demo.css";
import 'preact';

export const BadgeCustomstyling = () => {
  return (
      <div id="demo-container" class="oj-flex">
            <div class="oj-flex-item oj-sm-12 oj-md-6 oj-md-padding-4x-end">
                    <h6>Strong Default</h6>
                    <p>
                              <span class="oj-badge">Neutral</span>
                              <span class="oj-badge oj-badge-danger">Danger</span>
                              <span class="oj-badge oj-badge-warning">Warning</span>
                              <span class="oj-badge oj-badge-success">Success</span>
                              <span class="oj-badge oj-badge-info">Info</span>
                          </p>
                    <h6>Subtle Default</h6>
                    <p>
                              <span class="oj-badge oj-badge-subtle">Neutral</span>
                              <span class="oj-badge oj-badge-danger oj-badge-subtle">Danger</span>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle">Warning</span>
                              <span class="oj-badge oj-badge-success oj-badge-subtle">Success</span>
                              <span class="oj-badge oj-badge-info oj-badge-subtle">Info</span>
                          </p>
                </div>
            <div class="oj-flex-item oj-sm-12 oj-md-6 oj-md-padding-4x-end">
                    <h6>Strong Custom</h6>
                    <p>
                              <span class="oj-badge demo-badge-pink">Pink</span>
                              <span class="oj-badge demo-badge-purple">Purple</span>
                              <span class="oj-badge demo-badge-teal">Teal</span>
                          </p>
                    <h6>Subtle Custom</h6>
                    <p>
                              <span class="oj-badge demo-badge-pink-subtle">Pink</span>
                              <span class="oj-badge demo-badge-purple-subtle">Purple</span>
                              <span class="oj-badge demo-badge-teal-subtle">Teal</span>
                          </p>
                </div>
        </div>
    );
};

export default BadgeCustomstyling;
