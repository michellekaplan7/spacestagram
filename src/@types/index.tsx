export type Dispatch = React.Dispatch<DispatchAction>;

export type FavAction = (
  state: AppState,
  dispatch: Dispatch,
  info: SpaceDataPlus
) => DispatchAction;

export type AppState = {
  data: Array<SpaceDataPlus>;
  favorites: Array<SpaceDataPlus>;
};

export type DispatchAction = {
  type: string;
  payload: Array<SpaceDataPlus> | any;
};

export type SpaceCardProps = {
  data: Array<SpaceDataPlus>;
  favorites: Array<SpaceDataPlus>;
  handleClear: (dispatch: Dispatch) => any;
  store: { state: AppState; dispatch: Dispatch };
  toggleFavAction: FavAction;
};

export type SpaceData = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export type SpaceDataPlus = SpaceData & {
  id: number;
};
