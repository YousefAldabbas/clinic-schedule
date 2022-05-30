import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Card } from "@mui/material";
import MyModel from "../components/Model";
import HomeCard from "../components/HomeCard";
import PatientTable from "../components/PatientTable";
import TodaySchedule from "../components/TodaySchedule";

import { getPatients } from "../features/patient/patientSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user,isLoading } = useSelector((state) => state.auth);
  const { isLoading: isLoadingPatients } = useSelector((state) => state.patient);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getPatients());
  }, []);

  return (
    <div style={{}}>
      <DndProvider backend={HTML5Backend}>
        <TodaySchedule />
      </DndProvider>
      <HomeCard />

      <Card
        sx={{
          marginTop: "3rem",
          margin: "1rem",
          padding: {
            xs: 0,
            sm: 0,
            md: "5rem"
          },
          backgroundColor: "#C2DED1",
          marginBottom: "2rem",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <PatientTable />
      </Card>
    </div>
  );
}

export default Home;
