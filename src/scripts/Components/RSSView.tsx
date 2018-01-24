import { h, Component } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";

import { RSSItem } from "../Types/Types";
import { Route } from "../Utils/Patches/Route";
import { htmlfy } from "../Utils/Utils";

interface DescriptionProps {
  description: string | { content: string; };
}

const Description: Component<DescriptionProps> = function({ description }) {
  const body = typeof description === "string" ?
    description :
    description.content;
  return (
    <div>
      <Link to="/">back</Link>
      <div oncreate={htmlfy}>{body}</div>
    </div>
  );
}

interface RSSViewProps {
  pages: RSSItem[];
}

export const RSSView: Component<RSSViewProps> = function({ pages }) {
  return (
    <div>
      {pages.map((page, index) => (createRoute(index, page.description)))}
    </div>
  );
}

function createRoute(index: number, description: string | { content: string }) {
  return (
    <Route path={`/${index}`}>
      <Description description={description} />
    </Route>
  );
}
