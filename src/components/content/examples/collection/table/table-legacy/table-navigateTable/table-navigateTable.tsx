import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as ModuleAnimations from 'ojs/ojmoduleanimations';
import CoreRouter = require('ojs/ojcorerouter');
import UrlParamAdapter = require('ojs/ojurlparamadapter');
import ModuleRouterAdapter = require('ojs/ojmodulerouter-adapter');
import 'ojs/ojmodule-element';
import 'ojs/ojmodule';

export const TableNavigateTable = () => {
  const animationCallback = (context: ModuleRouterAdapter.AnimationCallbackParameters) => {
    if (context.state && context.state.path === 'content') {
      return ModuleAnimations.navParent;
    }
    return ModuleAnimations.navChild;
  };

  const router = useMemo(
    () =>
      new CoreRouter(
        [
          { path: '', redirect: 'table' },
          { path: 'table', detail: { label: 'table' } },
          { path: 'content', detail: { label: 'content' } }
        ],
        {
          history: 'skip',
          urlAdapter: new UrlParamAdapter()
        }
      ),
    []
  );
  const module = useMemo(
    () =>
      new ModuleRouterAdapter(router, {
        viewPath: 'views/ojTable-scroll/',
        viewModelPath: 'viewModels/ojTable-scroll/',
        animationCallback
      }),
    [router]
  );

  return <oj-module id="moduleDemo" class="demo-module" config={module.koObservableConfig} animation={module.animation} />;
};

export default TableNavigateTable;
