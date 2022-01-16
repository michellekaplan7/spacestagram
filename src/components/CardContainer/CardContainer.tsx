import React from "react";

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SpaceCard from "../SpaceCard/SpaceCard";

import { AppState, Dispatch, FavAction, SpaceDataPlus } from "../../@types";

type Props = {
  data: Array<SpaceDataPlus>;
  favorites: Array<SpaceDataPlus>;
  handleClear: (dispatch: Dispatch) => any;
  store: { state: AppState; dispatch: Dispatch };
  toggleFavAction: FavAction;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: theme.spacing(5),
    padding: theme.spacing(9),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

const CardContainer = (props: Props) => {
  const classes = useStyles();
  const { data, favorites, handleClear, store, toggleFavAction } = props;
  const { dispatch } = store;

  const cards = data.map((info, i) => {
    return (
      <SpaceCard
        favorites={favorites}
        info={info}
        key={`card-${i}`}
        store={store}
        toggleFavAction={toggleFavAction}
      />
    );
  });

  return (
    <>
      <div className={classes.container}>{cards}</div>
      <button onClick={() => handleClear(dispatch)}>CLEAR</button>
    </>
  );
};

export default CardContainer;
