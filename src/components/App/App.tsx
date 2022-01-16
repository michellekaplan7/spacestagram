import React from "react";

import { Store } from "../Store/Store";
import CardContainer from "../CardContainer/CardContainer";
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
    data: state.data,
    favorites: state.favorites,
    handleClear,
    store: { state, dispatch },
    toggleFavAction,
  };

  return (
    <div>
      <CardContainer {...props} />
    </div>
  );
};

export default App;
