import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import NewPatientForm from "./NewPatientForm";
import "react-day-picker/dist/style.css";

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
  // ["@media (max-width:600px)"]: {
  //   width: "100%",
  //   top: "60%",
  //   left: "50%",
  // },
};
function MyModel() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isSuccess } = useSelector((state) => state.patient);
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: "#354259",
          backgroundColor: "#C2DED1",
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #354259",
          borderRadius: "0",
          ["&:hover"]: {
            backgroundColor: "#354259",
            color: "#C2DED1",
          }
        }}
        variant="outlined"
      >
        Create
      </Button>
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
          <NewPatientForm setOpenModal={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}

export default MyModel;
