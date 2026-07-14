// @ts-nocheck
import 'preact';

export const filmStripFilmStripOverlaidNavDotsRecipe = (
  <>
    <ol>
      <li>
        Please see the
        {" "}
        <a href={"#"}>
          FilmStrip PagingControl demo
        </a>
        {" "}
        for more information about configuring an oj-film-strip with an oj-paging-control.
      </li>
      <li>
        Using CSS, absolutely position the oj-paging-control so that it overlays the oj-film-strip. Note
        that the common parent element of the oj-film-strip and oj-paging-control must specify
        {" "}
        <code className={"prettyprint"}>position: relative</code>
        {" "}
        so that absolutely positioning the oj-paging-control within it works.
      </li>
    </ol>
  </>
);
