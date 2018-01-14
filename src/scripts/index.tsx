import { app, h } from "hyperapp";
import { Link, location } from "@hyperapp/router";
import "@hyperapp/html";

import { RSSItem, Actions, State, RSSEndpoint } from "./Types/Types";
import { Config } from "./Components/Config";
import { Storage } from "./Storage";
import { fetchAll } from "./Services";
import { htmlfy } from "./Utils/Utils";
import { Route } from "./Utils/Patches/Route";
import { RSSList } from "./Components/RSSList";
import { RSSView } from "./Components/RSSView";

const cache = {
  rss: new Storage<RSSEndpoint[]>("rss"),
};

const actions: Actions = {
  fetch: () => async (state, actions) => { 
    const pages = await fetchAll(state.rsss);
    actions.update(pages);
  },
  update: (pages) => (state) => {
    return {
      pages,
    }
  },
  configActions: {
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
  },
  location: location.actions,
}

const state: State = {
  location: location.state,
  config: {
    additionalRss: "",
  },
  rsss: cache.rss.get(),
  pages: [],
};

function view(state: State, actions: Actions) {
  return (
    <div>
      <Route path="/dist/config">
        <Config 
          rsss={state.rsss}
          configActions={actions.configActions}
        />
      </Route>
      <Route path="/dist/">
        <RSSList pages={state.pages} fetch={actions.fetch}/>
      </Route>
      <RSSView pages={state.pages} />
    </div>
  );
}

const main = app<State, Actions>(state, actions, view, document.body);
location.subscribe(main.location);
main.fetch();