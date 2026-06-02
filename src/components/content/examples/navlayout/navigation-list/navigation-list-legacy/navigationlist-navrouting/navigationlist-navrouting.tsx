/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import 'ojs/ojnavigationlist';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type RouteKey = 'dashboard' | 'incidents' | 'customers' | 'about';
type Route = {
  path: RouteKey;
  detail: {
    label: string;
  };
};
type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const routeParamName = 'navigationListRoute';
const defaultRoute: RouteKey = 'dashboard';
const routeData: Route[] = [
  { path: 'dashboard', detail: { label: 'Dashboard' } },
  { path: 'incidents', detail: { label: 'Incidents' } },
  { path: 'customers', detail: { label: 'Customers' } },
  { path: 'about', detail: { label: 'About' } }
];

const isRouteKey = (value: unknown): value is RouteKey =>
  value === 'dashboard' || value === 'incidents' || value === 'customers' || value === 'about';

const readRouteFromHash = (): RouteKey => {
  const currentHash = window.location.hash;
  const queryText = currentHash.startsWith('#/?') ? currentHash.slice(3) : currentHash.replace(/^#/, '');
  const params = new URLSearchParams(queryText);
  const nextValue = params.get(routeParamName);
  return isRouteKey(nextValue) ? nextValue : defaultRoute;
};

const getHashForRoute = (route: RouteKey) => `#/?${routeParamName}=${route}`;

const updateRouteHash = (route: RouteKey) => {
  const nextHash = getHashForRoute(route);
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
};

export const NavigationlistNavrouting = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteKey>(() => readRouteFromHash());
  const selectedRouteData = routeData.find((route) => route.path === selectedRoute) ?? routeData[0];
  const dataProvider = useMemo(() => new ArrayDataProvider<RouteKey, Route>(routeData, {
      keyAttributes: 'path'
  }), []);

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedRoute(readRouteFromHash());
    };

    updateRouteHash(selectedRoute);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectionChanged = (event: PropertyChangedEvent<RouteKey>) => {
    const nextRoute = event.detail.value;
    if (isRouteKey(nextRoute)) {
      setSelectedRoute(nextRoute);
      updateRouteHash(nextRoute);
    }
  };

  return (
      <div id="routing-container" class="oj-flex">
            <div class="oj-flex-item oj-md-3 oj-sm-padding-5x-bottom oj-md-padding-5x-end">
                    <oj-navigation-list data={dataProvider} selection={selectedRoute} onselectionChanged={handleSelectionChanged}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            {
                                                          item.data.detail ? (
                                                            <>
                                                              <li id={item.data.path}><a href={getHashForRoute(item.data.path)}>{item.data.detail.label}</a></li>
                                                            </>
                                                          ) : null
                                                        }
                                        </>
                                      )} />
                          </oj-navigation-list>
                </div>
            <div id="pageContent" class="oj-panel oj-bg-neutral-30 oj-flex-item oj-md-9">
                    <h3>
                              <b>Route path:</b>
                              {selectedRoute}
                          </h3>
                    <h3>
                              <b>Path label:</b>
                              {selectedRouteData.detail.label}
                          </h3>
                </div>
        </div>
    );
};

export default NavigationlistNavrouting;
