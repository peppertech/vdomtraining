import { h } from 'preact';
import type { ComponentProps } from 'preact';
import * as moduleElementUtils from 'ojs/ojmodule-element-utils';
import 'ojs/ojmodule-element';
import 'ojs/ojmodule';
import "css!./demo.css";

type ModuleConfig = ComponentProps<'oj-module'>['config'];

export const FilmStripVerticalFilmStripNavDots = () => {
  const moduleConfig = moduleElementUtils.createConfig({ name: 'filmStrip/verticalFilmStripNavDots' }) as unknown as ModuleConfig;
  return (
      <div id="filmstrip-verticalnavdots-example">
            <oj-module config={moduleConfig} />
        </div>
    );
};

export default FilmStripVerticalFilmStripNavDots;
