import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
    Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './severity-pill';
import { formatCurrency } from '../utils';

const StockTable = ({ settings, toggleModal, select }) => {
    const config = { ...defaultConfig, ...settings };

    const handleClick = (item) => () => {
        toggleModal();
        select(item);
    }

    return (
        <Card>
            <CardHeader title={config.name} />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Company Name
                                </TableCell>
                                <TableCell>
                                    Quantity
                                </TableCell>
                                <TableCell>
                                    Price Per Share
                                </TableCell>
                                <TableCell>
                                    In ownership
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ filter: config.blur ? "blur(3px)" : "none" }}>
                            {config.data.map((item) => (
                                <TableRow
                                    hover
                                    key={item.id}
                                >
                                    <TableCell>
                                        <Typography variant="body1">
                                            {item.companyName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">
                                            {item.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">
                                            {item.pricePerShare}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={`${item.owned} / ${formatCurrency(item.owned * item.pricePerShare)}`} color="primary" />
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
}

const defaultConfig = {
    name: "Stock Market (updated every 20 minutes)",
    data: Array(5).fill({
        id: 1,
        companyName: "Fauji",
        quantity: 100,
        pricePerShare: 2,
        owned: 7,
    }),
    blur: false
}

export default StockTable;