import React from "react";
import { Card, Box, Typography, CardActions, CardContent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MyModel from "./Model";

function HomeCard() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "1rem",
        color: "#354259",
        backgroundColor: "#C2DED1",
        marginTop: "13.6rem",
        marginBottom: "5rem",
        
      }}
    >
      <Card
        sx={{
          boxShadow: "none",
        }}
      >
        <CardContent
        sx={{
          display: "flex",
        }}
        >
          <AddIcon />
          New patient record </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            boxShadow: "none",
          }}
        >
          <MyModel />
        </CardActions>
      </Card>
    </Box>
  );
}

export default HomeCard;
