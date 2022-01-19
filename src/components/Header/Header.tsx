import React from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DatePicker from "../DatePicker/DatePicker";
import { Dispatch } from "../../@types";

type Props = {
  dispatch: Dispatch;
  handleResetLoading: (dispatch: Dispatch) => any;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
};

const pages = [{ label: "Favorites", path: "/favorites" }];

const Header = ({
  dispatch,
  handleResetLoading,
  setCurrentPage,
  setStartDate,
  startDate,
}: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setCurrentPage(1);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <Typography
              component="div"
              noWrap
              sx={{ display: { md: "flex", xs: "none" }, mr: 2 }}
              variant="h6"
            >
              SPACESTAGRAM
            </Typography>
          </NavLink>

          <Box sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleOpenNavMenu}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
              }}
              id="menu-appbar"
              keepMounted
              onClose={handleCloseNavMenu}
              open={Boolean(anchorElNav)}
              sx={{
                display: { md: "none", xs: "block" },
              }}
              transformOrigin={{
                horizontal: "left",
                vertical: "top",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <NavLink to="/">
            <Typography
              component="div"
              noWrap
              sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}
              variant="h6"
            >
              SPACESTAGRAM
            </Typography>
          </NavLink>

          <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
            {pages.map((page) => (
              <NavLink key={page.label} to={page.path}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block", my: 2 }}
                >
                  {page.label}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <DatePicker
              dispatch={dispatch}
              handleResetLoading={handleResetLoading}
              setStartDate={setStartDate}
              startDate={startDate}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
