import { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Paper, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import moment from 'moment/moment';

export default ({ settings = {} }) => {
  const [time, setTime] = useState([0, 0, 0, 0]);
  const [config] = useState({ ...defaultConfig, ...settings });

  useEffect(() => {
    setInterval(() => {
      const timeLeft = moment.utc((config.timestamp - moment().unix()) * 1000).format("DD:HH:mm:ss").split(":");
      setTime(timeLeft);
    }, 1000);
  }, [])

  return (
    <Card sx={{ height: '100%', }}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between', flexDirection: "column" }}
        >
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            sx={{pl: 10}}
          >
            {config.title}
          </Typography>
          <Grid item sx={{ display: "flex" }}>
            {config.show.map((show, idx) => (
              <>
                {show &&
                  <Paper elevation={24} sx={{
                    padding: idx < 2 ? 3 : 2, display: "flex", flexDirection: 'column',
                    justifyContent: "center", alignItems: "center", width: "fit-content", mr: 5
                  }}>
                    <Typography variant="h5" color="GrayText">
                      {time[idx]}
                    </Typography>
                    <Typography variant="caption" color="GrayText">
                      {denominations[idx]}
                    </Typography>
                  </Paper>}
              </>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const defaultConfig = {
  show: Array(4).fill(true),
  timestamp: moment().unix(),
  title: ""
}

const denominations = ["Days", "Hours", "Minutes", "Seconds"];