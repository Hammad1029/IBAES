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
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Time remaining till end of event" />
      <Divider />
      <CardContent>
        <Box style={{ display: "flex", alignItems: "center" }}>
          {config.show.map((show, idx) => (
            <>
              {show &&
                <Paper elevation={24} sx={{
                  padding: idx < 2 ? 3 : 2, display: "flex", flexDirection: 'column',
                  justifyContent: "center", alignItems: "center", width: "fit-content", mr: 5
                }}>
                  <Typography variant="h1" color="GrayText">
                    {time[idx]}
                  </Typography>
                  <Typography variant="h5" color="GrayText">
                    {denominations[idx]}
                  </Typography>
                </Paper>}
            </>
          ))}
        </Box>
        {/* 
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box> */}
      </CardContent>
    </Card >
  );
};

const defaultConfig = {
  show: Array(4).fill(true),
  timestamp: moment().unix(),
  date: moment()
}

const denominations = ["Days", "Hours", "Minutes", "Seconds"];