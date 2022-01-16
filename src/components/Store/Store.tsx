import React from "react";

import { AppState, DispatchAction } from "../../@types";

const initialState: AppState = {
  data: [],
  favorites: [],
};

export const Store = React.createContext<AppState | any>(initialState);

const storageKey = "localFavorites";

function reducer(state: AppState, action: DispatchAction): AppState {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: action.payload };
    case "ADD_FAV":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAV":
      return { ...state, favorites: action.payload };
    case "CLEAR":
      return { ...state, favorites: [] };
    default:
      return state;
  }
}

export function StoreProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = React.useReducer(
    reducer,
    [],
    //@ts-expect-error this is okay
    (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial
  );
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
