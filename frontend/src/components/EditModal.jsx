import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePatient,getPatient,reset } from '../features/patient/patientSlice';
import NewPatientForm from './NewPatientForm';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "auto",

  maxWidth: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({open, setOpen,patient}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleClose = () => setOpen(false);
    const handleDelete = () => {
        dispatch(updatePatient(patient._id));
    };
    const {isUpdateSuccess} = useSelector((state) => state.patient);
    useEffect(() => {

        if (isUpdateSuccess) {
            dispatch(getPatient(
                patient._id
            ));
        }
        return () => {

        };
    }, [isUpdateSuccess]);

  return (
    <Modal
        open={open}
        onClose={handleClose}
        sx={{
          overflow: "scroll",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewPatientForm
          setOpenModal={setOpen}
            patient={patient}
          />
        </Box>
      </Modal>
  );
}
