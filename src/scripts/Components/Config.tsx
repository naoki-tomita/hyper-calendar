import { ActionType, h, ActionsType } from "hyperapp";
import { Link } from "@hyperapp/router";
import "@hyperapp/html";

import { State, Actions, RSSEndpoint } from "../Types/Types";
import { Storage } from "../Utils/Storage";

const cache = {
  rss: new Storage<RSSEndpoint[]>("rss"),
};

export interface ConfigActions {
  addRSSEndpoint: ActionType<State, Actions>;
  removeRSSEndpoint: ActionType<State, Actions>;
  updateRSSEndpointUrl: ActionType<State, Actions>;
  loadRSSEndpoint: ActionType<State, Actions>;
}

export const configActions: ConfigActions = {
  addRSSEndpoint: () => (state, actions) => {
    if (!cache.rss.get()) {
      cache.rss.set([]);
    }
    cache.rss.set([ ...cache.rss.get(), { url: state.config.additionalRss } ]);
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
      config: {
        additionalRss: value,
      },
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