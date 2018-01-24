import { h, ActionType, Component } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";
import { State, Actions, RSSItem } from "../Types/Types";

interface RSSListProps {
  pages: RSSItem[];
  fetch: ActionType<State, Actions>;
}

export const RSSList: Component<RSSListProps> = function({ pages, fetch }) {
  return (
    <div>
      <Link to="/config">config</Link><br/>
      <button class="waves-effect waves-light btn" onclick={fetch}>update</button>
      <ul class="collection">
        {pages.map((page, index) =>
          (<li class="collection-item"><Link to={`/${index}`}>{page.title}</Link></li>))}
      </ul>
    </div>
  );
}
