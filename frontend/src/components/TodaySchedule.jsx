import React, { useState, useCallback,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Card as MUICard, Stack,Box } from "@mui/material";
import { Card } from "./Card.jsx";
import update from "immutability-helper";
import { Grid } from "@mui/material";
import { display } from "@mui/system";
function TodaySchedule() {
  const [cards, setCards] = useState();
  const { patients } = useSelector(state => state.patient);
  useEffect(() => {
    if (patients.length > 0) {
        // filter only today's patients by date
        const todayPatients = patients.filter(patient => {
            const today = new Date();
            return patient.date === `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

        }).sort((a, b) => {
            return a.time - b.time;
        });
      setCards(todayPatients);
    }

    }, [patients]);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card._id}
        index={index}
        id={card._id}
        name={`${card.firstName} ${card.lastName}`}
        time={card.time}
        date={card.date}
        note={card.note}
        phone={card.phoneNumber}
        moveCard={moveCard}
      />
    );
  }, []);
  return (
    <>
      <Grid container gap={2} sx={{
          marginTop: "5rem",
      }}>
        <Grid item xs={12} sx={{}}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
            }}
          >
            Today's Schedule
          </Typography>
        </Grid>
        <Stack flexDirection="row"
        sx={{
            width: "100%",

        }}
        >
        <Grid item xs={12} sx={{}}>
                <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "",
                    alignItems: "center",
                    flexWrap: "wrap",
                    height: "100%",
                    maxHeight: "900px",
                    justifyContent:{
                        xs: "center",
                        sm: "center",
                        md: "center",
                        lg: "left",
                    }
                }}
                >
                    {cards?.map((card, i) => renderCard(card, i))}
                </Box>
        </Grid>

        </Stack>
      </Grid>
    </>
  );
}

export default TodaySchedule;
