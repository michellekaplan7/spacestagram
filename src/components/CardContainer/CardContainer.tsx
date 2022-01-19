import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Container, Grid, Pagination, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import SpaceCard from "../SpaceCard/SpaceCard";
import usePagination from "../Pagination/Pagination";

import { AppState, Dispatch, FavAction } from "../../@types";

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
  clearAllContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
}));

const CardContainer = (props: Props) => {
  const classes = useStyles();
  const { handleClear, store, toggleFavAction, showFavorites } = props;
  const { state, dispatch } = store;
  const { data, favorites, loading, error } = state;

  let [page, setPage] = React.useState<number>(1);
  const PER_PAGE = 6;

  const dataLength = showFavorites ? favorites.length : data.length;
  const count = Math.ceil(dataLength / PER_PAGE);
  const _DATA = usePagination(showFavorites ? favorites : data, PER_PAGE);

  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    _DATA.jump(newPage);
  };

  const getCards = () => {
    if (showFavorites) {
      return _DATA.currentData().map((info, i) => {
        return (
          <Grid item xs={6} key={`card-${i}`}>
            <SpaceCard
              favorites={favorites}
              info={info}
              store={store}
              toggleFavAction={toggleFavAction}
            />
          </Grid>
        );
      });
    } else {
      return _DATA.currentData().map((info, i) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={`card-${i}`}>
            <SpaceCard
              favorites={favorites}
              info={info}
              store={store}
              toggleFavAction={toggleFavAction}
            />
          </Grid>
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
      <Container sx={{ paddingTop: "24px" }}>
        <Grid container spacing={4}>
          {getCards()}
        </Grid>
        {!showFavorites && (
          <Grid sx={{ padding: "15px 0 15px 0" }}>
            <Pagination
              color="primary"
              count={count}
              onChange={handleChange}
              page={page}
              shape="circular"
              size="large"
              variant="outlined"
            />
          </Grid>
        )}
        {showFavorites && favorites.length > 0 && (
          <Grid sx={{ padding: "15px 0 15px 0" }}>
            <Pagination
              color="primary"
              count={count}
              onChange={handleChange}
              page={page}
              shape="circular"
              size="large"
              variant="outlined"
            />
          </Grid>
        )}
      </Container>

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
