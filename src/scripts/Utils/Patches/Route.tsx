import { h, Component } from "hyperapp";
import { Route as OldRoute } from "@hyperapp/router";

interface RouteProps {
  parent?: boolean;
  path: string;
}

export const Route: Component<RouteProps> = function({ parent, path }, children) {
  return <OldRoute parent={parent} path={path} render={() => children} />
}
