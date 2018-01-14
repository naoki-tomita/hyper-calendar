import { h } from "hyperapp";
import { Route as OldRoute } from "@hyperapp/router";

export function Route({parent, path}: {parent?: boolean; path: string;}, children: any) {
  return <OldRoute parent={parent} path={path} render={() => children} />
}