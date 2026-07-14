import 'preact';

export const BadgeOverview = () => {
  return (
      <div id="demo-container">
            <h6>Strong</h6>
            <p>
                    <span class="oj-badge">Neutral</span>
                    <span class="oj-badge oj-badge-danger">Danger</span>
                    <span class="oj-badge oj-badge-warning">Warning</span>
                    <span class="oj-badge oj-badge-success">Success</span>
                    <span class="oj-badge oj-badge-info">Info</span>
                </p>
            <h6>Subtle</h6>
            <p>
                    <span class="oj-badge oj-badge-subtle">Neutral</span>
                    <span class="oj-badge oj-badge-danger oj-badge-subtle">Danger</span>
                    <span class="oj-badge oj-badge-warning oj-badge-subtle">Warning</span>
                    <span class="oj-badge oj-badge-success oj-badge-subtle">Success</span>
                    <span class="oj-badge oj-badge-info oj-badge-subtle">Info</span>
                </p>
            <h6 class="oj-sm-margin-4x-top">Default Size</h6>
            <span class="oj-badge">text</span>
            <span class="oj-badge">3</span>
            <span class="oj-badge">99+</span>
            <h6 class="oj-sm-margin-4x-top">Small Size</h6>
            <span class="oj-badge oj-badge-sm">text</span>
            <span class="oj-badge oj-badge-sm">3</span>
            <span class="oj-badge oj-badge-sm">99+</span>
        </div>
    );
};

export default BadgeOverview;
