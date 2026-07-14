import 'preact';
import { createContext,type ComponentChildren } from 'preact';
import { useLocation } from "preact-iso";
import { useContext } from "preact/hooks";

type ExampleRouteContextValue = {
  category: string;
  segments: string[];
  routeTo: (segments: string[], replace?: boolean) => void;
};

const ExampleRouteContext = createContext<ExampleRouteContextValue>({
  category: "",
  segments: [],
  routeTo: () => undefined,
});

type ExampleRouteProviderProps = {
  category: string;
  children: ComponentChildren;
};

const normalizeSegments = (segments: string[]) =>
  segments.map((segment) => segment.trim()).filter(Boolean);

export function ExampleRouteProvider({
  category,
  children,
}: ExampleRouteProviderProps) {
  const location = useLocation();
  const prefix = `/examples/${category}`;
  const rest = location.path.startsWith(prefix)
    ? location.path.slice(prefix.length)
    : "";
  const segments = normalizeSegments(rest.split("/"));

  const routeTo = (nextSegments: string[], replace = false) => {
    const nextPath = [prefix, ...normalizeSegments(nextSegments)].join("/");

    if (location.path !== nextPath) {
      location.route(nextPath, replace);
    }
  };

  return (
    <ExampleRouteContext.Provider value={{ category, segments, routeTo }}>
      {children}
    </ExampleRouteContext.Provider>
  );
}

export const useExampleRoute = () => useContext(ExampleRouteContext);
