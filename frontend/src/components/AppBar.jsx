import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { logout } from "../features/auth/authSlice";

import { getPatients, resetAll } from "../features/patient/patientSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MyAppBar({ open, ToggleDrawer }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [userName, setUserName] = useState("user");
  const { patients } = useSelector((state) => state.patient);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (patients.length > 0) {
      setSuggestions(
        patients.map((item) => {
          return [
            `${item.firstName} ${item.lastName}`,
            item._id,
            item.phoneNumber,
          ];
        })
      );
    }
    if (user && user.name) {
      setUserName(user.name);
    }
  }, [patients, user]);
  const navigator = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{userName}</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logout());
          dispatch(resetAll());
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  // if in login page
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  ) {
    return;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          left: open ? "240px" : "0px",
          backgroundColor: "#C2DED1",
          color: "#354259",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          transition: "left 0.2s ease-in-out",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={ToggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            onClick={() => navigator("/")}
          >
            Clinic schedule
          </Typography>
          <Search>
            <Autocomplete
              freeSolo
              sx={{
                width: "100%",
                borderRadius: "4px",
                minWidth: "220px",
                maxHeight: "50px",
              }}
              disableClearable
              // nabigate to user page when user is selected

              options={suggestions}
              getOptionLabel={(option) => option[0]}
              // cancle the search when user is selected
              onChange={(event, newValue) => {
                let url = `/patient/${newValue[1]}`;
                navigator(url);
              }}
              filterOptions={(options, state) => {
                const inputValue = state.inputValue;
                if (inputValue === "") {
                  return [];
                }
                return options
                  .filter(
                    (option) =>
                      option[0]
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0
                  )
                  .slice(0, 3);
              }}
              renderOption={(props, option) => {
                return (
                  <Box
                    component="li"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    {...props}
                    key={option[1]}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          fontSize: "1rem",
                        }}
                      >
                        {option[0]}
                      </Box>
                      <Box
                        sx={{
                          fontSize: "0.5rem",
                          textAlign: "center",
                        }}
                      >
                        {option[2]}
                      </Box>
                    </Stack>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <Box>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <TextField
                    sx={{
                      width: "100%",
                      [`& .MuiInputBase-input`]: {
                        padding: "0rem",
                        fontSize: "1rem",
                        color: "#354259",
                        height: "6px",
                      },
                    }}
                    {...params}
                    placeholder="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                </Box>
              )}
            />
          </Search>
          <Box
            sx={{
              flexGrow: open ? 0.6 : 1,
              transition: "flex-grow 0.2s ease-in-out",
            }}
          />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #354259",
                borderRadius: "6px",
                minWidth: "220px",
                maxHeight: "50px",
                p: "1rem",
                backgroundColor: "#fafafa",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                ["&:hover"]: {
                  backgroundColor: "#C2DED1",
                },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  marginRight: "0.6rem",
                }}
              >
                {userName}
              </Typography>

              <AccountCircle
                sx={{
                  color: "#354259",
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
