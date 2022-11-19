import { h } from "preact";

const Foreach = () => {
  return (
    <div>
      <p>
        VDOM does not have a view and viewModel like JET MVVM does. It is all
        done in the TypeScript file. Iterating over an array of data is done
        using the JavaScript Map() method.
      </p>
      <div class="oj-panel oj-sm-margin-4x-bottom">
        <code>
          {
            <div>
              {"return ("}
              <br />
              &nbsp;{"<ul>"}
              <br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;{"itemList.map((item) => ("}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"<li>"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {
                '<a id={item.id} href={item.linkTarget} target="_blank">{item.message}</a>'
              }
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"</a>"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"</li>"}
              <br />
              &nbsp;&nbsp;&nbsp;{"))"}
              <br />
              &nbsp;&nbsp;{"}"}
              <br />
              &nbsp;{"</ul>"}
              <br />
              {")"}
            </div>
          }
        </code>
      </div>
      <p>
        Notice that the arrow function inside the map() method, uses parenthesis
        and not curly braces? This is a bit of a shortcut provided by JSX. If
        you use curly braces, you would then have to provide a return method
        with parenthesis inside of that.
      </p>
    </div>
  );
};
export default Foreach;