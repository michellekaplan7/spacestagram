import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SpaceCard from "../SpaceCard/SpaceCard";

import { AppState, Dispatch, FavAction } from "../../@types";

type Props = {
  handleClear: (dispatch: Dispatch) => any;
  showFavorites?: boolean;
  store: { state: AppState; dispatch: Dispatch };
  toggleFavAction: FavAction;
};

const useStyles = makeStyles((theme: Theme) => ({
  actionContainer: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "grid",
    gridGap: theme.spacing(5),
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
  const { handleClear, store, toggleFavAction, showFavorites } = props;
  const { state, dispatch } = store;
  const { data, favorites } = state;

  const getCards = () => {
    if (showFavorites) {
      return favorites.map((info, i) => {
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
    } else {
      return data.map((info, i) => {
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
    }
  };

  return (
    <>
      <div className={classes.container}>{getCards()}</div>
      <div className={classes.actionContainer}>
        {showFavorites && !favorites.length && (
          <NavLink to="/">
            <Button variant="contained">Add favorites</Button>
          </NavLink>
        )}
        {showFavorites && favorites.length > 0 && (
          <Button onClick={() => handleClear(dispatch)} variant="contained">
            Clear all
          </Button>
        )}
      </div>
    </>
  );
};

export default CardContainer;
