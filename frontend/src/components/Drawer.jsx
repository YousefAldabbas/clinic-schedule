import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DrawerHeader from "./DrawerHeader";
import styled from "@emotion/styled";
import { logout,reset } from "../features/auth/authSlice";
import {resetAll} from "../features/patient/patientSlice";
import { useDispatch } from "react-redux";
const Item = styled(ListItemButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    width: "100%",
    fontSize: "2rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  textAlign: "center",
  width: "100%",
  fontSize: "2rem",
  padding: "1rem",
  display: "block",
}));

const MyDrawer = ({ drawerWidth, open, ToggleDrawer }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
    drawerWidth = "100%";
    return null;
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        marginRight: "15rem",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          maxWidth: "100vw",
          boxSizing: "border-box",
          // mobile screen
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            fontSize: "4rem",
            color: "red",
            fontWeight: "bold",
          },
        },
        fontSize: "4rem",
        color: "red",
        fontWeight: "bold",
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={ToggleDrawer}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          },
        }}
      >
        <Link
          to="/"
          key="home"
          style={{
            [theme.breakpoints.down("sm")]: {
              margin: "1rem",
              fontSize: "10rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            },
          }}
          onClick={() => {
            ToggleDrawer()
          }}
        >
          <Item theme={theme}>Home</Item>
        </Link>
        <Link
          to="/login"
          key="login"
          style={{
            [theme.breakpoints.down("sm")]: {
              margin: "1rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            },
          }}
        >
          <Item theme={theme}
            onClick={()=>{
              if(open){
                ToggleDrawer();
              }
              dispatch(logout());
              dispatch(resetAll());

            }} >Logout</Item>
        </Link>
      </List>
    </Drawer>
  );
};
export default MyDrawer;
