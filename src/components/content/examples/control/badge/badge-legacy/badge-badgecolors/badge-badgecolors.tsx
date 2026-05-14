import { h } from 'preact';

export const BadgeBadgecolors = () => {
  return (
      <div id="demo-container">
            <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
                    <div class="oj-sm-margin-2x-bottom">Default</div>
                    <p>
                              <span class="oj-badge">Complete</span>
                              <span class="oj-badge">Closed</span>
                              <span class="oj-badge">Average</span>
                          </p>
                    <div>
                              <span class="oj-badge oj-badge-subtle">Complete</span>
                              <span class="oj-badge oj-badge-subtle">Closed</span>
                              <span class="oj-badge oj-badge-subtle">Average</span>
                          </div>
                </div>
            <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
                    <div class="oj-sm-margin-2x-bottom">Danger</div>
                    <p>
                              <span class="oj-badge oj-badge-danger">Error</span>
                              <span class="oj-badge oj-badge-danger">Fail</span>
                              <span class="oj-badge oj-badge-danger">Disconnected</span>
                              <span class="oj-badge oj-badge-danger">Deleted</span>
                          </p>
                    <div>
                              <span class="oj-badge oj-badge-danger oj-badge-subtle">Error</span>
                              <span class="oj-badge oj-badge-danger oj-badge-subtle">Fail</span>
                              <span class="oj-badge oj-badge-danger oj-badge-subtle">Disconnected</span>
                              <span class="oj-badge oj-badge-danger oj-badge-subtle">Deleted</span>
                          </div>
                </div>
            <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
                    <div class="oj-sm-margin-2x-bottom">Success</div>
                    <p>
                              <span class="oj-badge oj-badge-success">Success</span>
                              <span class="oj-badge oj-badge-success">Pass</span>
                              <span class="oj-badge oj-badge-success">Connected</span>
                              <span class="oj-badge oj-badge-success">Complete</span>
                          </p>
                    <div>
                              <span class="oj-badge oj-badge-success oj-badge-subtle">Success</span>
                              <span class="oj-badge oj-badge-success oj-badge-subtle">Pass</span>
                              <span class="oj-badge oj-badge-success oj-badge-subtle">Connected</span>
                              <span class="oj-badge oj-badge-success oj-badge-subtle">Complete</span>
                          </div>
                </div>
            <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
                    <div class="oj-sm-margin-2x-bottom">Warning</div>
                    <p>
                              <span class="oj-badge oj-badge-warning oj-sm-margin-2x-bottom">Warning</span>
                              <span class="oj-badge oj-badge-warning">On hold</span>
                              <span class="oj-badge oj-badge-warning">Suspended</span>
                              <span class="oj-badge oj-badge-warning">Not started</span>
                              <span class="oj-badge oj-badge-warning">Incomplete</span>
                              <span class="oj-badge oj-badge-warning">Unpublished</span>
                          </p>
                    <div>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle oj-sm-margin-2x-bottom">Warning</span>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle">On hold</span>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle">Suspended</span>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle">Not started</span>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle">Incomplete</span>
                              <span class="oj-badge oj-badge-warning oj-badge-subtle">Unpublished</span>
                          </div>
                </div>
            <div class="oj-panel oj-bg-neutral-0 oj-sm-margin-6x-bottom">
                    <div class="oj-sm-margin-2x-bottom">Info</div>
                    <p>
                              <span class="oj-badge oj-badge-info oj-sm-margin-2x-bottom">Assigned</span>
                              <span class="oj-badge oj-badge-info">In progress</span>
                              <span class="oj-badge oj-badge-info">Open</span>
                              <span class="oj-badge oj-badge-info">Modified</span>
                              <span class="oj-badge oj-badge-info">Duplicate</span>
                          </p>
                    <div>
                              <span class="oj-badge oj-badge-info oj-badge-subtle oj-sm-margin-2x-bottom">Assigned</span>
                              <span class="oj-badge oj-badge-info oj-badge-subtle">In progress</span>
                              <span class="oj-badge oj-badge-info oj-badge-subtle">Open</span>
                              <span class="oj-badge oj-badge-info oj-badge-subtle">Modified</span>
                              <span class="oj-badge oj-badge-info oj-badge-subtle">Duplicate</span>
                          </div>
                </div>
        </div>
    );
};

export default BadgeBadgecolors;
