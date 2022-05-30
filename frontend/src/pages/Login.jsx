import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { login, reset } from "../features/auth/authSlice";
import LoginIcon from '@mui/icons-material/Login';
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        docpoint
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && window.location.pathname === "/") {
      toast(`Welcome ${user.name}`);

    }
    if (isSuccess) {

      navigate("/");
    }
    if (isSuccess) {
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    return () => {
      // dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(login({
      email: data.get("email"),
      password: data.get("password"),
    }));
  };

  return (
      <Grid container component="main" sx={{ maxHeight: "100vh",
      height: "100vh" ,
      overflow:"hidden"

    }}>
        <Grid
          item
          xs={false}
          sm={false}
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
            overflow:"hidden"

          }}
        />
        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square
        sx={{
          height: "100vh",
        }}
        >
          <Box
          sx={{
            py: 8,
            px: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3rem 4rem 0rem 4rem",
            marginTop: "0",
            height:"100vh",
            overflow:"hidden"

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
              <LoginIcon
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"
                  style={{
                    color: "#354259",
                  }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2"
                   style={{
                    color: "#354259",
                  }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
