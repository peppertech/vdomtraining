import { ComponentProps } from "preact";
import "ojs/ojavatar";
import "ojs/ojfilmstrip";

type FilmStripProps = ComponentProps<"oj-film-strip">;
//style={{ fontWeight: 400 , backgroundColor: "gray", height:"150px", length:"150px"}}


const ComponetTiles = () => {
  return (
    <div class="demo-filmstrip-item">
        Kaushal Deo
    </div>
  );
};

export default ComponetTiles;
