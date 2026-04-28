// @ts-nocheck
import { h } from 'preact';

export const nBoxDndSampleDescription = (
  <>
    <p>NBox is an interactive data visualization (typically found in Human Capital Management applications) in which employees are grouped and compared across two dimensions.  Each dimension can be split into multiple ranges.</p><p>This demo shows the Drag and Drop feature between a NBox and listview components.</p>
    <ul>
      <li>
        Drag nodes between the two components or within the NBox, you must use the drag handle to drag
        from the list view into the NBox.
      </li>
      <li>
        To see the keyboard support, press Ctrl (or Command key) + X key to cut the node or press Ctrl
        (or Command key) + C key to copy the node. Navigate to the desired location in the other NBox.
        Press Ctrl (or Command key) + V key to paste the node.
      </li>
      <li>
        In this demo, cut, copy and paste actions are allowed between the two components and cut and
        paste is allowed within the NBox.
      </li>
    </ul>
  </>
);
