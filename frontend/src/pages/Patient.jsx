import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Stack,
  Button,
  Card,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useSelector, useDispatch } from "react-redux";
import { getPatient, reset } from "../features/patient/patientSlice";
function Patient() {
  const navigator = useNavigate();
  const { path } = useLocation();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({});
  const { patient, isLoading } = useSelector((state) => state.patient);
  useEffect(() => {
    if (patient.length > 0) {
      setCurrentPatient(patient);
      return;
    }
    if (!currentPatient || !currentPatient._id) {
      let id = window.location.pathname.split("/")[2];
      dispatch(getPatient(id));
      setCurrentPatient(patient);
    }
    return () => {

    };
  }, [patient, dispatch]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        position="absolute"
        top="0"
        left="0"
        opacity="0.1"

      >
        <CircularProgress
        sx={{
          color: "primary",
          width: "200px",
          opacity: "0.5",
        }}

        />
      </Box>
    );
  }
  return (
    <Box

      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      width="100vw"
      >
    <Card
      sx={{
        margin: {
          xs: 0,
          sm: 0,
          md: "4rem",
        },
      }}
    >
      <Stack flexDirection="row" justifyContent="center"
      sx={{
        flexDirection:{
          sm:"column",
          md:"row",
          lg:"row",
        }
      }}

      >
        <Box
          sx={{
            maxWidth: "30rem",
            maxHeight: "30rem",
            flex: "1",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <img src="https://images.unsplash.com/photo-1653507277153-fd2b501cc0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"

            style={{
                width: "100%",
                height: "100%",
            }}

            alt="Patient" /> */}
          <PersonIcon
            sx={{
              width: "100%",
              height: "100%",
              padding: 0,
              margin: 0,
            }}
          />
        </Box>
        <Stack
          flexDirection="column"
          spacing={1}
          sx={{
            backgroundColor: "#C2DED1",
            flex: "2",
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
             Name:{" "}
            {`${currentPatient.firstName} ${currentPatient.lastName}`}
          </Typography>
          <Typography variant="h6">ID: {currentPatient._id}</Typography>
          <Typography variant="h6">
             Age: {currentPatient.age}
          </Typography>
          <Typography variant="h6">
             Number: 0{currentPatient.phoneNumber}
          </Typography>
          <Typography variant="h6">
             Address: {currentPatient.address}
          </Typography>
          <Typography variant="h6">
            Amount: {currentPatient.amount}
            <Box
              component="span"
              sx={{
                color: "red",
                cursor: "pointer",
                marginLeft: "1rem",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              <Link to="#">for more details(no function yet)</Link>
            </Box>
          </Typography>
          <Stack flexDirection="row">
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginRight: "1rem",
                backgroundColor: "#C2DED1",
                color: "#354259",
                border: "1px solid #354259",
                borderRadius: "0rem",
                boxShadow: "none",
                [`&:hover`]: {
                  backgroundColor: "#C2DED1",
                  color: "#354259",
                }
              }}

              onClick={() => setOpenEdit(true)}
            >
              Edit
            </Button>
            <Button
            sx={{
              marginRight: "1rem",
              backgroundColor: "#354259",
              color: "#C2DED1",
              border: "1px solid #C2DED1",
              borderRadius: "0rem",
              boxShadow: "none",
              [`&:hover`]: {
                backgroundColor: "#354259",
                color: "#C2DED1",
              }
            }}
            onClick={()=>{
              setOpen(true)
            }}

            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
    <DeleteModal
      open={open}
      setOpen={setOpen}
      patient={currentPatient}
      />
    <EditModal
      open={openEdit}
      setOpen={setOpenEdit}
      patient={currentPatient}
      />

    </Box>
  );
}


export default Patient;
