import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      register({
        email: data.get("email"),
        password: data.get("password"),
        name: `${data.get("firstName")} ${data.get("lastName")}`,
      })
    );
  };
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast(`Welcome ${user.name}`);
      navigate("/");
    }
  }, [isSuccess, navigate]);


  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              height: "100vh",
              py: 8,
              px: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 4rem 0rem 4rem",
              marginTop: "0",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                backgroundColor: "#C2DED1",
                color: "#354259",
                width: "60px",
                height: "60px",
              }}
            >
              <LockOutlinedIcon
                sx={{
                  fontSize: "3rem",
                }}
              />
            </Avatar>
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: "fontWeightBold",
              }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  padding: "1rem",
                  fontSize: "1.5rem",
                  boxShadow: "none",
                  borderRadius: "0",
                  backgroundColor: "#C2DED1",
                  color: "#354259",
                  [`&:hover`]: {
                    backgroundColor: "#354259",
                    color: "#C2DED1",
                    boxShadow: "none",
                  }
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" style={{
                    color: "#354259",
                  }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            height: "100vh",
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display:{
              xs: "none",
              sm: "none",
              md: "block",
            }
          }}
        />
      </Grid>
    </div>
  );
}
