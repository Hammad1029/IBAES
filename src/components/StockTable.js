import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "./severity-pill";
import { formatCurrency } from "../utils";

const StockTable = ({ settings, toggleModal, select }) => {
  const config = { ...defaultConfig, ...settings };

  const handleClick = (item) => () => {
    toggleModal();
    select(item);
  };

  return (
    <Card>
      <CardHeader title={config.name} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total sold</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Price Per Share</TableCell>
                <TableCell>In ownership</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ filter: config.blur ? "blur(3px)" : "none" }}>
              {(config.blur ? dummyData : config.data).map((item) => (
                <TableRow hover key={item.companyName}>
                  <TableCell>
                    <Typography variant="body1">{item.companyName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item.quantity}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item.sold}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item.quantity - item.sold}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item.pricePerShare} PKR</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={[
                        item.owned.toFixed(2) + " Units",
                        formatCurrency(item.owned * item.pricePerShare),
                        Math.floor((item.owned / item.quantity) * 100) + "%",
                      ].join(" - ")}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" onClick={handleClick(item)}>
                      View details / Buy / Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

const dummyData = Array(5).fill({
  companyName: "Fauji",
  quantity: 100,
  pricePerShare: 2,
  owned: 7,
  sold: 55,
});

const defaultConfig = {
  name: "Stock Market",
  data: dummyData,
  blur: false,
};

export default StockTable;
