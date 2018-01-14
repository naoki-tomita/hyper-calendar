import { app, h, ActionsType } from "hyperapp";
import { Link, location } from "@hyperapp/router";
import "@hyperapp/html";

import { RSSItem, Actions, State, RSSEndpoint } from "./Types/Types";
import { Config, configActions } from "./Components/Config";
import { fetchAll } from "./Services";
import { htmlfy } from "./Utils/Utils";
import { Route } from "./Utils/Patches/Route";
import { RSSList } from "./Components/RSSList";
import { RSSView } from "./Components/RSSView";

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
  ...configActions,
  location: location.actions,
}

const state: State = {
  location: location.state,
  config: {
    additionalRss: "",
  },
  rsss: [],
  pages: [],
};

function view(state: State, actions: Actions) {
  return (
    <div>
      <Route path="/dist/config">
        <Config 
          rsss={state.rsss}
          configActions={actions}
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
main.loadRSSEndpoint();
main.fetch();