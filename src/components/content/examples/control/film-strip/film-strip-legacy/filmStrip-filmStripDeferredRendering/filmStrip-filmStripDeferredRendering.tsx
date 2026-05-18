import { h } from 'preact';
import type { ComponentProps } from 'preact';
import * as moduleElementUtils from 'ojs/ojmodule-element-utils';
import 'ojs/ojmodule-element';
import 'ojs/ojmodule';
import "css!./demo.css";

type ModuleConfig = ComponentProps<'oj-module'>['config'];

export const FilmStripFilmStripDeferredRendering = () => {
  const moduleConfig = moduleElementUtils.createConfig({ name: 'filmStrip/filmStripDeferredRendering' }) as unknown as ModuleConfig;
  return (
      <div id="filmstrip-deferredrendering-example">
            <oj-module config={moduleConfig} />
        </div>
    );
};

export default FilmStripFilmStripDeferredRendering;
