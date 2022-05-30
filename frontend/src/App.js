import { useState } from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Patient from "./pages/Patient";

import AppBar from "./components/AppBar";
import DrawerHeader from "./components/DrawerHeader";
import Drawer from "./components/Drawer";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

function App() {
  const [open, setOpen] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const ToggleDrawer = () => {
    setOpen(!open);
  };
  const { user,isLoading } = useSelector((state) => state.auth);
  const { isLoading: isLoadingPatients } = useSelector((state) => state.patient);


  return (
    <>
      <Router>
        <Box
          sx={{
            backgroundColor: "#fafafa",
          }}
        >
          <CssBaseline />
          <Drawer
            open={open}
            ToggleDrawer={ToggleDrawer}
            drawerWidth={drawerWidth}
          />

          <Main open={open}>
            {isLocation && <DrawerHeader />}
            <Box
              sx={{
                marginLeft: `${drawerWidth}px`,
                transition: "margin-left 0.08s ease-out",
                overflow: "hidden",
              }}
            >
              <AppBar open={open} ToggleDrawer={ToggleDrawer} />

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/patient/:id" element={<Patient />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}

              />
            </Box>
          </Main>
        </Box>
      </Router>
    </>
  );
}

export default App;
