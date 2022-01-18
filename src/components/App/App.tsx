import React from "react";
import { Route, Routes } from "react-router-dom";

import CardContainer from "../CardContainer/CardContainer";
import Header from "../Header/Header";
import { fetchDataAction, handleClear, toggleFavAction } from "../../Actions";
import { AppState, DispatchAction, SpaceCardProps } from "../../@types";

const storageKey = "localFavorites";

const initialState: AppState = {
  data: [],
  favorites: [],
  loading: true,
  error: false,
};

function reducer(state: AppState, action: DispatchAction): AppState {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false, error: false };
    case "FETCH_ERROR":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true,
      };
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

const App = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState,
    //@ts-expect-error this is okay
    (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial
  );

  console.log({ state });

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    fetchDataAction(dispatch);
  }, []);

  const props: SpaceCardProps = {
    handleClear,
    store: { state, dispatch },
    toggleFavAction,
  };

  return (
    <>
      <Header />
      <Routes>
        <Route element={<CardContainer {...props} />} path="/" />
        <Route
          element={<CardContainer showFavorites {...props} />}
          path="/favorites"
        />
      </Routes>
    </>
  );
};

export default App;
