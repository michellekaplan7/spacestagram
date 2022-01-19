import { format } from "date-fns";
import {
  AppState,
  Dispatch,
  DispatchAction,
  SpaceData,
  SpaceDataPlus,
} from "./@types";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchDataAction = async (dispatch: Dispatch, startDate: Date) => {
  const formattedDate = format(startDate, "yyyy-MM-dd");
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formattedDate}`;

  try {
    const response = await fetch(URL);
    const dataJSON: SpaceData[] = await response.json();
    const newData: SpaceDataPlus[] = dataJSON.map((info, i) => {
      return {
        ...info,
        id: i,
      };
    });
    dispatch({ type: "FETCH_SUCCESS", payload: newData });
  } catch (error) {
    //@ts-expect-error payload for error is a boolean
    dispatch({ type: "FETCH_ERROR", error: true });
  }
};

export const toggleFavAction = (
  state: AppState,
  dispatch: any,
  data: SpaceDataPlus | any
): DispatchAction => {
  const spaceCardInFav = state.favorites.find((el) => el.id === data.id);
  let dispatchObj = { type: "ADD_FAV", payload: data };

  if (spaceCardInFav) {
    const notFavorite = state.favorites.filter(
      (fav: SpaceDataPlus) => fav.id !== data.id
    );
    dispatchObj = { type: "REMOVE_FAV", payload: notFavorite };
  }

  return dispatch(dispatchObj);
};

export const handleClear = (dispatch: any) => {
  return dispatch({ type: "CLEAR" });
};

export const handleResetLoading = (dispatch: any) => {
  return dispatch({ type: "RESET_LOADING" });
};
