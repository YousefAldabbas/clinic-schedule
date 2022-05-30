import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deletePatient,
  getPatients,
  resetDelete,
} from "../features/patient/patientSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ open, setOpen, patient }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    handleClose();
    dispatch(deletePatient(patient._id));
  };
  const { isDeleteSuccess } = useSelector((state) => state.patient);
  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(getPatients());
      dispatch(resetDelete());
      handleClose();
      navigate("/");
    }
    return () => {};
  }, [isDeleteSuccess]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          are you sure you want to delete this?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          by clicking yes the patient will be deleted permanently
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </Box>
      </Box>
    </Modal>
  );
}
