import { location } from "@hyperapp/router";
import { ActionType, ActionsType } from "hyperapp";
import { ConfigActions } from "../Components/Config";

export interface Actions {
  fetch: ActionType<State, Actions>;
  update: ActionType<State, Actions>;
  location: typeof location.actions;
  config: ConfigActions;
}

export interface RSSEndpoint {
  url: string;
}

export interface RSSItem {
  category?: string[];
  content?: any[];
  creator?: string;
  description: string | {
    type: "html";
    content: string;
  };
  guid?: any;
  publisher?: string;
  link: string;
  title: string;
}

export interface State {
  location: typeof location.state;
  config: {
    additionalRss: string;
    rsss: RSSEndpoint[];
  };
  pages: RSSItem[];
}