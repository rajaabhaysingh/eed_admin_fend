import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  Typography,
  Avatar,
  withStyles,
  colors,
  IconButton,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import getInitials from "../../utils/getInitials";
import dp from "../../../images/avatar.jpg";
import { ArrowForward } from "@material-ui/icons";

const data = [
  {
    id: uuid(),
    ref: "CDD1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
      email: "whatever@abc.com",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1048",
    amount: 25.1,
    customer: {
      name: "Cao Yu",
      email: "whatever@abc.com",
    },
    createdAt: 1555016400000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1047",
    amount: 10.99,
    customer: {
      name: "Alexa Richardson",
      email: "whatever@abc.com",
    },
    createdAt: 1554930000000,
    status: "refunded",
  },
  {
    id: uuid(),
    ref: "CDD1046",
    amount: 96.43,
    customer: {
      name: "Anje Keizer",
      email: "whatever@abc.com",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1045",
    amount: 32.54,
    customer: {
      name: "Clarke Gillebert",
      email: "whatever@abc.com",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      email: "whatever@abc.com",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
      email: "whatever@abc.com",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
];

const useStyles = makeStyles((theme) => ({
  root: { boxShadow: theme.shadows[8] },
  actions: {
    justifyContent: "flex-end",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    color: colors.common.white,
  },
  tableHeader: {
    marginTop: theme.spacing(3),
    background: theme.palette.background.dark,
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
    borderBottom: "2px solid #e8e8e8",
  },
}))(TableRow);

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader className={classes.cardHeader} title="Latest Enrollments" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={600}>
          <Table size="small">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Order Ref</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow hover key={order.id}>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={dp}>
                        {getInitials(order.customer.name)}
                      </Avatar>
                      <Box>
                        <Typography color="textPrimary" variant="body2">
                          <strong>{order.customer.name}</strong>
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {order.customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Chip color="primary" label={order.status} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="view user details">
                      <ArrowForward />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

export default LatestOrders;
