import { h, ActionType } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";

import { State, Actions, RSSItem } from "../Types/Types";

export function RSSList({ 
  pages, 
  fetch,
}: {
  pages: RSSItem[];
  fetch: ActionType<State, Actions>;
}) {
  return (
    <div>
      <Link to="/config">config</Link><br/>
      <button onclick={fetch}>update</button>
      <ul>
        {pages.map((page, index) => 
          (<li><Link to={`/${index}`}>{page.title}</Link></li>))}
      </ul>
    </div>
  );
}