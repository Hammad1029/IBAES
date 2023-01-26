import { Grid, MenuItem, TextField, Typography, Select, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import StockChart from "./StockChart";
import StockBarGraph from "./StockBarGraph";
import { useFormik } from 'formik';
import * as Yup from "yup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: "80%",
    width: "80%",
};

const StockModal = ({ state, toggle, details }) => {
    const formik = useFormik({
        initialValues: {
            quantity: 0,
            buySell: "Buy"
        },
        validationSchema: Yup.object({
            quantity: Yup.number()
                .min(0, "Need atleast 1")
                .required("Quantity is required"),
            buySell: Yup.string().oneOf(["Buy", "Sell"]).required("Required")
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    });

    return (
        <Modal
            open={state}
            onClose={toggle}
        >
            <Box sx={style}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="InfoText">
                            Buy / Sell
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <StockChart />
                    </Grid>
                    <Grid item xs={5}>
                        <StockBarGraph />
                    </Grid>

                    <Grid item xs={12}>
                        <Box component="form" onSubmit={formik.handleSubmit}
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5, '&>*': {m: 1} }}>
                            <TextField
                                error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
                                label="Quantity"
                                margin="normal"
                                name="quantity"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.quantity}
                                variant="outlined"
                            />
                            <Select
                                name="buySell"
                                value={formik.values.buySell}
                                label="Buy / Sell"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Buy">Buy</MenuItem>
                                <MenuItem value="Sell">Sell</MenuItem>
                            </Select>
                            <Button variant="contained">Submit Order</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default StockModal;