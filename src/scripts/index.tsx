import { app, h, ActionType } from "hyperapp";
import * as html from "@hyperapp/html";

interface State {
  count: number;
}

interface Actions {
  up: ActionType<State, Actions>,
  down: ActionType<State, Actions>
}

const actions: Actions = {
  up: () => (state: State) => ({ count: state.count + 1 }),
  down: () => (state: State) => ({ count: state.count - 1 }),
};

const state: State = {
  count: 0,
};

function view(state: State, actions: Actions) {
  return (
    <div>
      <h1>{state.count}</h1>
      <button onclick={actions.up}>+</button>
      <button onclick={actions.down}>-</button>
    </div>
  );
}

app<State, Actions>(state, actions, view, document.body);