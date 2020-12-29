import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardHeader,
  colors,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import img from "../../../images/eed.png";

const data = [
  {
    id: uuid(),
    name: "Lean Six Sigma Green Belt Training & Certification",
    imageUrl: img,
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    id: uuid(),
    name: "Medium Corporation and Machine Learning",
    imageUrl: img,
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    id: uuid(),
    name: "PMI-ACP® Certification Training",
    imageUrl: img,
    updatedAt: moment().subtract(3, "hours"),
  },
  {
    id: uuid(),
    name: "CompTIA Network+ Certification Training",
    imageUrl: img,
    updatedAt: moment().subtract(5, "hours"),
  },
  {
    id: uuid(),
    name: "Free Fullstack Development Program",
    imageUrl: img,
    updatedAt: moment().subtract(9, "hours"),
  },
  {
    id: uuid(),
    name: "Lean Six Sigma Green & Black Belt Combo Training & Certification",
    imageUrl: img,
    updatedAt: moment().subtract(9, "hours"),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    boxShadow: theme.shadows[8],
  },
  image: {
    height: 32,
    width: 48,
    objectFit: "cover",
    objectPosition: "center",
    marginRight: theme.spacing(2),
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    color: colors.common.white,
  },
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        className={classes.cardHeader}
        subtitle={`${products.length} in total`}
        title="Latest Courses"
      />
      <Divider />
      <List dense>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${product.updatedAt.fromNow()}`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
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

LatestProducts.propTypes = {
  className: PropTypes.string,
};

export default LatestProducts;
