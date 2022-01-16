import {
  AppState,
  Dispatch,
  DispatchAction,
  SpaceData,
  SpaceDataPlus,
} from "./@types";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchDataAction = async (dispatch: Dispatch) => {
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=2022-01-01`;
  const response = await fetch(URL);
  const dataJSON: SpaceData[] = await response.json();
  const newData: SpaceDataPlus[] = dataJSON.map((info, i) => {
    return {
      ...info,
      id: i,
    };
  });
  return dispatch({
    type: "FETCH_DATA",
    payload: newData,
  });
};

export const toggleFavAction = (
  state: AppState,
  dispatch: any,
  data: SpaceDataPlus | any
): DispatchAction => {
  const spaceCardInFav = state.favorites.find((el) => el.id === data.id);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: data,
  };
  if (spaceCardInFav) {
    const notFavorite = state.favorites.filter(
      (fav: SpaceDataPlus) => fav.id !== data.id
    );
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: notFavorite,
    };
  }

  return dispatch(dispatchObj);
};

export const handleClear = (dispatch: any) => {
  return dispatch({ type: "CLEAR" });
};