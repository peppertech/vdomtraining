// @ts-nocheck
import 'preact';

export const nBoxDndEventsDescription = (
  <>
    <p>NBox is an interactive data visualization (typically found in Human Capital Management applications) in which employees are grouped and compared across two dimensions.  Each dimension can be split into multiple ranges.</p><p>
      This demo shows the Drag and Drop events generated and received by JET NBox when dragging within a
      NBox and with plain HTML.
    </p>
    <ul>
      <li>Drag NBox nodes into drop target area.</li>
      <li>Drag nodes between cells within a NBox.</li>
      <li>
        To see the keyboard support, press Ctrl (or Command key) + X key to cut the node or press Ctrl
        (or Command key) + C key to copy the node from an external element or NBox. Navigate to the
        desired location in the NBox or external element. Press Ctrl (or Command key) + V key to paste
        the node.
      </li>
      <li>
        In this demo, cut, copy and paste actions are allowed between the NBox and exteral element and
        cut and paste is allowed within the NBox.
      </li>
    </ul>
  </>
);
