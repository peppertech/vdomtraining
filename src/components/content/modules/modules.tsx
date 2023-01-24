import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import { ojButtonsetOne } from "ojs/ojbutton";

/** Trivial functional components used for demo purposes only **/
function Page1() {
  // const count = useSelector<RootState>((state) => state.count);
  // const dispatch = useDispatch();
  return (
    <div>
      <div>This is Page 1 content</div>
      <div>
        {/* <button onClick={() => dispatch({ type: "INCREMENT_COUNTER" })}>Increment</button> */}
        {/* <button onClick={() => dispatch({ type: "DECREMENT_COUNTER" })}>Decrement</button> */}
      </div>
    </div>
  );
}
function Page2() {
  return <div>This is Page 2 content</div>;
}
function Page3() {
  return <div>This is Page 3 content</div>;
}

function Active() {
  return <div>This is the active component</div>;
}

function NotActive() {
  return <div>This is the inactive component</div>;
}

/** Example of fragments */
const FragmentChild = (
  <Fragment>
    <li>Item 3</li>
    <li>Item 4</li>
  </Fragment>
);
function FragmentParent() {
  return (
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      {FragmentChild}
    </ul>
  );
}

const PageContent = (props: { pageName: string }) => {
  switch (props.pageName) {
    case "Page1":
      return <Page1 />;
    case "Page2":
      return <Page2 />;
    case "Page3":
      return <Page3 />;
    default:
      return <Page1 />;
  }
};

/** Main functional component for this page  */
const Modules = () => {
  const [isActive, setIsActive] = useState(true);
  const [pageName, setPageName] = useState("Page3");

  /** Example showing ternary based loading of components  */
  const toggleActive = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  /** Example using a buttonset to load different components  */
  const pageChangeHandler = (event:ojButtonsetOne.valueChanged) => {
    setPageName(event.detail.value);
  };

  return (
    <div>
      <p>
        In the JET MVVM architecture it was very common to use an oj-module
        element to load different pages or sections of pages. With VDOM you will
        never use an oj-module element. Usually you will use components for the
        parts of your content. You can also use a special kind of content called
        a Fragment. These are then loaded using JSX.
      </p>
      <br />

      {/* Toggle the active state and load a specific module based on that state */}
      <oj-button id="activeBtn" onojAction={toggleActive}>
        Toggle Active State
      </oj-button>

      {/* component content area */}
      <div class="oj-panel oj-panel-shadow-sm oj-sm-margin-2x-top oj-sm-margin-6x-bottom">
        {isActive ? <Active /> : <NotActive />}
      </div>

      {/* Select a page from the button set and have that page content loaded into the panel below */}
      <oj-buttonset-one
        id="pageset"
        value={pageName}
        onvalueChanged={pageChangeHandler}
        aria-label="Choose a page.">
        <oj-option value="Page1">
          <span>Page 1</span>
        </oj-option>
        <oj-option value="Page2">
          <span>Page 2</span>
        </oj-option>
        <oj-option value="Page3">
          <span>Page 3</span>
        </oj-option>
      </oj-buttonset-one>

      {/* Page content area */}
      <div class="oj-panel oj-panel-shadow-sm oj-sm-margin-2x-top oj-sm-margin-6x-bottom">
        <PageContent pageName={pageName} />
      </div>

      {/* Fragment example */}
      <p>
        A Fragment can be used to return DOM that does not require a wrapping or
        parent DOM element like normal Functional component does. In the
        example below, a Functional component us returning an unordered list.
        This works fine because the &lt;ul&gt; element can be used as the parent
        node. However if you wanted to dynamically insert some &lt;li&gt;
        elements using a different Functional component, this would work
        because it's not valid to return multiple elements at the root level of
        the render method. This is where a Fragment comes in. You would use the
        &lt;Fragment&gt; element to wrap the &lt;li&gt; elements that you want
        to be inserted into the first components unordered list. The Fragment
        will return the DOM elements without a wrapping element.
      </p>
      <FragmentParent />
    </div>
  );
};
export default Modules;
