import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatCurrency, getBaseURL } from "../utils";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/app.slice";
import axiosInstance from "../utils/interceptor";
import constants from "../constants"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StockModal = ({ state, toggle, details, balances, baseApiUrl, getHeadlines }) => {
  const { id: userId } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      quantity: 0,
      amount: 0,
      buySell: "Buy",
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .min(0, "Need atleast 1")
        .max(Number(details.quantity) - Number(details.sold), "Not enough stocks available")
        .required("Quantity is required"),
      amount: Yup.number()
        .min(0, "Need atleast 1")
        .max(
          Number(balances.filter((i) => i.name.toLowerCase() === "remaining")[0].balance),
          "Not enough money"
        )
        .required("Amount is required"),
      buySell: Yup.string().oneOf(["Buy", "Sell"]).required("Required"),
    }),
    onSubmit: async (values) => {
      const reqBody = {
        userId,
        quantity: values.quantity,
        buySell: values.buySell,
        pricePerShare: details.pricePerShare,
        companyName: details.companyName,
      };
      const {
        data: { responseCode, data },
      } = await axiosInstance.post(`http://localhost:3000/api/buySell`, reqBody);
      toggle();
      getHeadlines();
    },
  });

  return (
    <Modal open={state} onClose={toggle} sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Typography variant="h4" color="InfoText">
              Buy / Sell
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ border: "1px solid black", borderRadius: 5 }}>
              <IconButton onClick={toggle}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
          {/* <Grid item xs={5}>
                        <StockBarGraph />
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                        <StockChart />
                    </Grid> */}
          <Grid item xs={6}>
            <TableContainer
              component={Paper}
              sx={{ p: 1, border: "1px solid black" }}
              elevation={24}
            >
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell>
                      <Typography variant="body1">Current Stock Price</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {formatCurrency(details.pricePerShare)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>
                      <Typography variant="body1">Available Stocks</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {details.quantity - details.sold} Units
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {balances.map((balance) => (
                    <TableRow hover key={balance.name}>
                      <TableCell>
                        <Typography variant="body1">{balance.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{formatCurrency(balance.balance)}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 5,
                "&>*": { m: 2 },
              }}
            >
              <Grid
                component={Paper}
                sx={{
                  p: 1,
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                elevation={24}
                container
              >
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                    label="Quantity"
                    margin="normal"
                    name="quantity"
                    onBlur={formik.handleBlur}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">Units</InputAdornment>,
                    }}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "amount",
                        (e.target.value * details.pricePerShare).toFixed(constants.bazaarAccuracyDP)
                      );
                      formik.setFieldValue("quantity", e.target.value);
                    }}
                    type="number"
                    value={formik.values.quantity}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(formik.touched.amount && formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                    label="Amount"
                    margin="normal"
                    name="amount"
                    onBlur={formik.handleBlur}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PKR</InputAdornment>,
                    }}
                    onChange={(e) => {
                      formik.setFieldValue("amount", e.target.value);
                      formik.setFieldValue(
                        "quantity",
                        (e.target.value / details.pricePerShare).toFixed(constants.bazaarAccuracyDP)
                      );
                    }}
                    type="number"
                    value={formik.values.amount}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&>*": { m: 2 },
                  }}
                >
                  <Select
                    name="buySell"
                    value={formik.values.buySell}
                    label="Buy / Sell"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Buy">Buy</MenuItem>
                    <MenuItem value="Sell">Sell</MenuItem>
                  </Select>
                  <Button variant="contained" type="submit">
                    Submit Order
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default StockModal;

export async function getServerSideProps(context) {
  return {
    props: {
      baseApiUrl: getBaseURL(context.req),
    },
  };
}
