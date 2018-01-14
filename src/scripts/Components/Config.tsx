import { ActionType, h } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";

import { State, Actions, RSSEndpoint } from "../Types/Types";

export interface ConfigActions {
  addRSSEndpoint: ActionType<State, Actions>;
  removeRSSEndpoint: ActionType<State, Actions>;
  updateRSSEndpointUrl: ActionType<State, Actions>;
}

function Subscribing({
  index, 
  url, 
  removeAction
}: {
  index: number;
  url: string;
  removeAction: ActionType<State, Actions>
}) {
  return (
    <span>
      <span>{url}</span><button onclick={() => removeAction(url)}>x</button>
    </span>
  );
}

export function Config({
  configActions,
  rsss
}: {
  configActions: ConfigActions;
  rsss: RSSEndpoint[];
}) {
  return (
    <div>
      <Link to="/dist/">home</Link>
      <div>subscribing</div>
      <ul>
        {rsss.map((rss, index) => 
          <li>
            <Subscribing 
              url={rss.url} 
              index={index} 
              removeAction={configActions.removeRSSEndpoint}
            />
          </li>)}
      </ul>
      <div>input url</div>
      <input oninput={configActions.updateRSSEndpointUrl} />
      <button onclick={configActions.addRSSEndpoint}>add</button>
    </div>
  );
}