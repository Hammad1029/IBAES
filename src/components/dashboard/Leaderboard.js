import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

export default ({ settings }) => {
  const config = { ...defaultConfig, ...settings };
  return (
    <Card>
      <CardHeader title={config.name} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Members
                  </TableCell>
                  <TableCell>
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={config.blur ? { filter: "blur(3px)", pointerEvents: "none", userSelect: "none" } : {}}>
                {(config.blur ? dummyData : config.data).map((team) => (
                  <TableRow
                    hover
                    key={team.id}
                  >
                    <TableCell>
                      <Typography variant="body1">
                        {team.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {team.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {team.members.split(",").map(memberName => (
                          <Chip label={memberName.trim()} color="primary" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color="success">
                        {team.score}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

const dummyData = Array(5).fill({
  id: 1,
  name: "Buhat bara team name",
  members: "Hammad, Abc, Xyz, Def",
  score: 123,
});

const defaultConfig = {
  name: "Event Leaderboard",
  data: dummyData,
  blur: false
}