import React from "react";
import { FacebookIcon, FacebookShareButton } from "react-share";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

import { AppState, Dispatch, FavAction, SpaceDataPlus } from "../../@types";
import notFound from "../../assets/images/image-not-found.png";

type Props = {
  favorites: Array<SpaceDataPlus>;
  info: SpaceDataPlus;
  store: { state: AppState; dispatch: Dispatch };
  toggleFavAction: FavAction;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  shareBtn: {
    marginTop: theme.spacing(1),
    cursor: "pointer",
    "&:hover:not(:active)": {
      opacity: "0.75",
    },
  },
}));

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SpaceCard = ({ favorites, info, store, toggleFavAction }: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { state, dispatch } = store;
  const { date, explanation, hdurl, id, title, url } = info;

  const isFavorite = favorites.find((fav: SpaceDataPlus) => fav.id === id);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        alt={title}
        component="img"
        height="194"
        image={hdurl ? hdurl : notFound}
      />
      <CardContent>
        <Typography color="text.primary" variant="body2">
          {title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {date}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center" }}
        disableSpacing
      >
        <IconButton
          aria-label="add to favorites"
          color={isFavorite ? "primary" : "default"}
          onClick={() => toggleFavAction(state, dispatch, info)}
        >
          <FavoriteIcon />
        </IconButton>

        <FacebookShareButton
          url={url}
          quote={title}
          className={classes.shareBtn}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <ExpandMore
          aria-expanded={expanded}
          aria-label="show more"
          expand={expanded}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{explanation}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SpaceCard;
