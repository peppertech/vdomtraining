import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import 'ojs/ojtreeview';
import { AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojavatar';

export const TreeViewIcons = () => {
  const expanded = useMemo(() => new AllKeySetImpl(), []);

  return (
      <oj-tree-view id="treeview" selectionMode="multiple" expanded={expanded} aria-label="Tree View with Static HTML">
            <ul>
                    <li id="imageTypes">
                              <span class="oj-treeview-item-icon" />
                              <span class="oj-treeview-item-text">Image Types</span>
                              <ul>
                                          <li id="iconFont">
                                                        <span class="oj-ux-ico-home oj-treeview-item-content-icon" />
                                                        <span class="oj-treeview-item-text">Icon Font</span>
                                                    </li>
                                          <li id="avatar">
                                                        <oj-avatar role="img" aria-label="Avatar of Chris Black" size="xxs" initials="AB" src="/styles/images/hcm/placeholder-male-01.png" class="oj-treeview-item-content-icon" />
                                                        <span class="oj-treeview-item-text">Avatar</span>
                                                    </li>
                                          <li id="avatarInitials">
                                                        <oj-avatar role="img" size="xxs" initials="CB" background="orange" aria-label="Avatar of Chris Black's Initials" class="oj-treeview-item-content-icon" />
                                                        <span class="oj-treeview-item-text">Avatar Initials</span>
                                                    </li>
                                      </ul>
                          </li>
                </ul>
        </oj-tree-view>
    );
};

export default TreeViewIcons;
