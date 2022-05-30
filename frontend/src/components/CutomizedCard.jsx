import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CusomizedCard({
    name,
    date,
    time,
    phone,
    id,
    note,
    moveCard,
    ref
}) {
  return (
    <Card sx={{ minWidth: 275,boxShadow: "none", }} key={id}
    ref={ref}
    moveCard={moveCard}
    >
      <CardContent
      sx={{ boxShadow: "none" }}
      >
        <Typography variant="h5" component="div">
            {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {phone}
        </Typography>
        <Typography variant="body2">
          {note}
        
          </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {time} {bull} {date}
        </Typography>
      </CardContent>

    </Card>
  );
}
