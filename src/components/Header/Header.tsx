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

const pages = [{ label: "Favorites", path: "/favorites" }];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
