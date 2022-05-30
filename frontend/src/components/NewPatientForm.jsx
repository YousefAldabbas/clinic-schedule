import React, { useEffect } from "react";
import * as yup from "yup";
import {
  Card,
  Box,
  Grid,
  Typography,
  CardActions,
  CardContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useFormik } from "formik";
import { color } from "@mui/system";

import {
  addPatient,
  reset,
  getPatients,
  updatePatient,
  resetUpdate
} from "../features/patient/patientSlice";
const css = `
  .my-selected:not([disabled]) {
    font-weight: bold;
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) {
    border-color: #354259;

    color: #354259;
  }
  .my-selected:hover {
    border-color: #354259;
    color: #354259;
  }
  .my-today {
    font-weight: bold;
    font-size: 140%;
    color: red;
  }
  .my-selected-day:hover {
    font-weight: bold;
    font-size: 140%;
    color: #354259;
  }
`;

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#14C38E",
  },
  width: "30px",
  height: "30px",
});

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup.number().required("Age is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  // appointmentDate: yup.string().required("Appointment Date is required"),
  time: yup.string().required("Time is required"),
  date: yup.string().required("Date is required"),
  note: yup.string(),
  amount: yup.number(),
});

function NewPatientForm({ patient, setOpenModal }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isUpdateSuccess, isError, isSuccess, message } =
    useSelector((state) => state.patient);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Patient Updated Successfully");
      dispatch(getPatients());
      dispatch(resetUpdate());
      navigate("/");
    }
    if (isSuccess && !isUpdateSuccess && !isLoading
      && !window.location.pathname.split("/")[2]
      ) {
      setOpen(false);
      dispatch(getPatients());
      toast.success("Patient added successfully");
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [
    isLoading,
    isError,
    isUpdateSuccess,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);
  const initialValues =
    patient && window.location.pathname.split("/")[1] === "patient"
      ? { ...patient, phoneNumber: patient.phoneNumber.replace(/-/g, "") }
      : {
          firstName: "",
          lastName: "",
          age: "",
          phoneNumber: "",
          address: "",
          date: "",
          time: "6:00 AM",
          note: "",
          amount: "",
        };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (formik.initialValues.firstName !== "") {
        dispatch(updatePatient(values));
        navigate(`/patient/${formik.initialValues._id}`);
      } else {
      dispatch(addPatient(values));}
      dispatch(reset());
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  //   if user click away from the date picker, the date picker will close
  const handlePicker = () => {
    setOpen(!open);
  };
  function DatePicker() {
    const [selected, setSelected] = React.useState(new Date());

    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, "PP")}.</p>;
    }
    useEffect(() => {
      setSelected(new Date());
      return () => {
        setSelected(null);
      };
    }, []);

    const onDayClick = (dayDate) => {
      let day = dayDate.getDate();
      let month = dayDate.getMonth() + 1;
      let year = dayDate.getFullYear();
      let date = day + "/" + month + "/" + year;
      setSelected(date);
      formik.values.date = date;
      handlePicker();
    };
    return (
      <Box sx={{}}>
        <style>{css}</style>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiersClassNames={{
            selected: "my-selected",
            today: "my-today",
          }}
          onClickOutside={handlePicker}
          onDayClick={onDayClick}
          footer={footer}
        />
      </Box>
    );
  }
  return (
    <form onSubmit={handleSubmit}
    >
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 3,

        }}
        sx={{
          paddingTop:!formik.isValid?"10rem": "2rem",
        }}

      >
        <CloseIcon
          sx={{
            position: "absolute",
            top: {
              xs: !formik.isValid? "10.5rem" : "2.1rem",
              sm: "0px",
              md: "-12px",
            },
            right: {
              xs: "1px",
              sm: "0px",
              md: "-12px",
            },
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
            color: "white",
            border: "1px solid white",
            borderRadius: "50%",
            backgroundColor: "red",
          }}
          onClick={() => {
            setOpenModal(false);
          }}
        />

        {open && (
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "#C2DED1",
              opacity: 1,
              color: "white",
              borderRadius: "10px",
              zIndex: "999",
            }}
          >
            <DatePicker />
          </Box>
        )}
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="FirstName"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="LastName"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={10}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="address"
            label="Patinet address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="amount"
            label="Amount(optional)"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="time"
            label="Time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 2,
              },
            }}
            fullWidth
            id="date"
            label="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              border: "1px dotted #B4B4B4",
              color: "#354259",
            }}
            onClick={handlePicker}
          >
            {open ? "Close" : "Pick"}
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            sx={{
              [`& label`]: {
                zIndex: 1,
              },
            }}
            multiline
            maxRows={4}
            fullWidth
            id="note"
            label="Note"
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Button
            sx={{
              padding: "10px 0",
              backgroundColor: "#C2DED1",
              color: "#354259",
              transition: "all 0.3s ease",
              borderRadius: "0px",
              border: "1px solid #354259",
              [`&:hover`]: {
                backgroundColor: "#354259",
                color: "#C2DED1",
                border: "1px solid #C2DED1",
              },
            }}
            fullWidth
            type="submit"
            disabled={!formik.isValid}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default NewPatientForm;
