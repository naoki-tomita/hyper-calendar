declare module "@hyperapp/router" {
  export function Link(options: {
    to: string;
  }): any;
  export function Route<Props>(options: {
    parent?: boolean;
    path: string;
    render: (renderProps: {
      location: typeof window.location;
      match: {
        url: string;
        path: string;
        isExact: boolean;
      }
    }) => any;
    oncreate?: (el: Element) => any;
  }): any;
  export function Switch(): any;
  export function Redirect(): any;
  export module location {
    export const state: any;
    export const actions: {
      set(data: any): any;
      go(pathname: string): void;
    }
    export function subscribe(actions: any): typeof unsubscribe;
    export function unsubscribe(): any;
  }
}