import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export default ({ cardDetails, sx }) => {
  const { name, status, icon, textColor } = { ...defaultCard, ...(cardDetails || {}) };
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              {status}
            </Typography>
            <Typography
              color={textColor}
              variant="h4"
            >
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: status === "Pending" ? "#E27C00" : status === "Ongoing" ? "green" : "blue",
                height: 56,
                width: 56
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
}

const defaultCard = {
  name: "",
  status: "Pending", // pending, ongoing, finished
  icon: <SmartToyIcon />,
  textColor: "textPrimary"
}