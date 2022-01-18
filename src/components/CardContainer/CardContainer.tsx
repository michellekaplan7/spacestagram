import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SpaceCard from "../SpaceCard/SpaceCard";

import { AppState, Dispatch, FavAction } from "../../@types";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

type Props = {
  handleClear: (dispatch: Dispatch) => any;
  showFavorites?: boolean;
  store: { state: AppState; dispatch: Dispatch };
  toggleFavAction: FavAction;
};

const useStyles = makeStyles((theme: Theme) => ({
  addFavContainer: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100%",
  },
  cardContainer: {
    padding: theme.spacing(9),
  },
  clearAllContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "grid",
    gridGap: theme.spacing(5),
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
  const { data, favorites, loading, error } = state;

  const getCards = () => {
    if (showFavorites) {
      return favorites.map((info, i) => {
        return (
          <div className={classes.cardContainer} key={`card-${i}`}>
            <SpaceCard
              favorites={favorites}
              info={info}
              store={store}
              toggleFavAction={toggleFavAction}
            />
          </div>
        );
      });
    } else {
      return data.map((info, i) => {
        return (
          <div className={classes.cardContainer} key={`card-${i}`}>
            <SpaceCard
              favorites={favorites}
              info={info}
              store={store}
              toggleFavAction={toggleFavAction}
            />
          </div>
        );
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className={classes.container}>{getCards()}</div>
      <div>
        {showFavorites && !favorites.length && (
          <div className={classes.addFavContainer}>
            <NavLink to="/">
              <Button variant="contained">Add favorites</Button>
            </NavLink>
          </div>
        )}
        {showFavorites && favorites.length > 0 && (
          <div className={classes.clearAllContainer}>
            <Button onClick={() => handleClear(dispatch)} variant="contained">
              Clear all
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CardContainer;
