import { ActionType, h, ActionsType } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";

import { State, Actions, RSSEndpoint } from "../Types/Types";
import { Storage } from "../Utils/Storage";

const cache = {
  rss: new Storage<RSSEndpoint[]>("rss"),
};

interface ConfigState {
  additionalRss: string;
  rsss: RSSEndpoint[];
}

export interface ConfigActions {
  addRSSEndpoint: ActionType<ConfigState, ConfigActions>;
  removeRSSEndpoint: ActionType<ConfigState, ConfigActions>;
  updateRSSEndpointUrl: ActionType<ConfigState, ConfigActions>;
  loadRSSEndpoint: ActionType<ConfigState, ConfigActions>;
}

export const configActions: ConfigActions = {
  addRSSEndpoint: () => (state, actions) => {
    if (!cache.rss.get()) {
      cache.rss.set([]);
    }
    cache.rss.set([ ...cache.rss.get(), { url: state.additionalRss } ]);
    return {
      rsss: cache.rss.get(),
    };
  },
  removeRSSEndpoint: (url) => (state, actions) => {
    cache.rss.set(cache.rss.get().filter((rss) => rss.url !== url));
    return {
      rsss: cache.rss.get(),
    };
  },
  updateRSSEndpointUrl: ({ target: { value } }) => (state) => {
    return {
      additionalRss: value,
    };
  },
  loadRSSEndpoint: () => () => {
    return {
      rsss: cache.rss.get() || [],
    };
  }
}

function Subscribing({
  index, 
  url, 
  removeAction
}: {
  index: number;
  url: string;
  removeAction: ActionType<ConfigState, ConfigActions>
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
      <Link to="/">home</Link>
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