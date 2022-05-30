import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { useSelector, useDispatch } from "react-redux";
import HideSourceIcon from "@mui/icons-material/HideSource";
import {
  Typography,
  Card as MUICard,
  Stack,
  Box,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export const Card = ({
  id,
  name,
  phone,
  note,
  time,
  date,
  index,
  moveCard,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open ? (
        <MUICard
          sx={{
            minWidth: 275,
            margin: "1rem",
            width: "100px",
            position: "relative",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          }}
          key={id}
          ref={ref}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{ mb: 1.5, }} color="text.secondary">
            {time} | {date}
            </Typography>

            <Typography sx={{  }} color="text.secondary">
               {note}
            </Typography>
          </CardContent>
          <CardActions>

              <HideSourceIcon
               sx={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "20px",
                cursor: "pointer",
                margin: "0.2rem 0.4rem",
              }}
              onClick={() => {
                setOpen(false);
              }}
              />
          </CardActions>
        </MUICard>
      ) : null}
    </>
  );
};
