import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/patient/patientSlice";
const columns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    width: 80,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 180,
  },
  {
    field: "appointment",
    headerName: "Appointment",
    width: 250,
  },
  {
    field: "note",
    headerName: "Note",
    width: 250,
  },
];

const rows = [];

export default function PatientTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { patients, isTableLoading, isTableError, isTableSuccess } =
    useSelector((state) => state.patient);

  useEffect(() => {
    if (patients.length > 0) {
      setData(
        patients?.map((item) => {
          return {
            ...item,
            note: item.note ? item.note : "",
            id: item._id,
            appointment: `${item.date} ${item.time}`,
          };
        })
      );
    }
    return () => {
      dispatch(reset());
    };
  }, [patients, isTableLoading, isTableError, isTableSuccess, dispatch]);
  return (
    <div
      style={{
        height: 500,
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        pagination
        onRowClick={(e) => {
          navigate(`/patient/${e.id}`);
        }}
        sx={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}
