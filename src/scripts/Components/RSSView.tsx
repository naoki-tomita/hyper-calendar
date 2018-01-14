import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";

import { RSSItem } from "../Types/Types";
import { Route } from "../Utils/Patches/Route";
import { htmlfy } from "../Utils/Utils";

function Description({ 
  description 
}: {
  description: string | { content: string; }
}) {
  const desc = typeof description === "string" ?
    description :
    description.content;
  return (
    <div>
      <Link to="/dist/">back</Link>
      <div oncreate={htmlfy}>{desc}</div>
    </div>
  );
}

export function RSSView({
  pages,
}: {
  pages: RSSItem[];
}) {
  return pages.map((page, index) => (
    <Route path={`/dist/${index}`}>
      <Description description={page.description} />
    </Route>));
}