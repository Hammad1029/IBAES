import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import constants from '../../constants';

export default ({ cardDetails, sx, children }) => {
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
            {children === undefined ? <Typography
              color={textColor}
              variant="h5"
            >
              {name}
            </Typography> : children}
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: status.toLowerCase() === constants.pending.toLowerCase() ?
                  "#E27C00" : status.toLowerCase() === constants.ongoing.toLowerCase() ? "green" : "blue",
                height: 50,
                width: 50
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
  status: constants.pending, // pending, ongoing, finished
  icon: <SmartToyIcon />,
  textColor: "textPrimary",
}