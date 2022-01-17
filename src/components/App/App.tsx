import React from "react";
import { Route, Routes } from "react-router-dom";

import CardContainer from "../CardContainer/CardContainer";
import Header from "../Header/Header";
import { Store } from "../Store/Store";
import { fetchDataAction, handleClear, toggleFavAction } from "../../Actions";
import { SpaceCardProps } from "../../@types";

const storageKey = "localFavorites";

const App = () => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    state.data.length === 0 && fetchDataAction(dispatch);
  });

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
