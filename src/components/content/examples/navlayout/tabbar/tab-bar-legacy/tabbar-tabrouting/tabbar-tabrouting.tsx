import 'ojs/ojnavigationlist';
import 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type RouteKey = 'dashboard' | 'incidents' | 'customers' | 'about';
type Route = {
  path: RouteKey;
  detail: {
    label: string;
  };
};
type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const routeParamName = 'tabBarRoute';
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

export const TabbarTabrouting = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteKey>(() => readRouteFromHash());
  const selectedRouteData = routeData.find((route) => route.path === selectedRoute) ?? routeData[0];
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<RouteKey, Route>(routeData, {
        keyAttributes: 'path'
      }),
    []
  );

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
    <div id="routing-container">
      <oj-tab-bar
        edge="top"
        data={dataProvider}
        selection={selectedRoute}
        onselectionChanged={handleSelectionChanged}
      >
        <template
          slot="itemTemplate"
          render={(item) => (
            <li id={item.data.path}>
              <a href={getHashForRoute(item.data.path)}>{item.data.detail.label}</a>
            </li>
          )}
        />
      </oj-tab-bar>
      <hr />
      <div id="pageContent" class="oj-panel oj-bg-neutral-30" tabIndex={0}>
        <h3>
          <b>Router path:</b> {selectedRoute}
        </h3>
        <h3>
          <b>Path label:</b> {selectedRouteData.detail.label}
        </h3>
      </div>
    </div>
  );
};

export default TabbarTabrouting;
