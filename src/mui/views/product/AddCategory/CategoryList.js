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
import CloseOutlined from "@material-ui/icons/CloseOutlined";

import catPlaceholder from "../../../../images/category_placeholder.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    boxShadow: theme.shadows[3],
    // backgroundColor: theme.palette.background.dark,
  },
  image: {
    height: 48,
    width: 48,
    maxWidth: 48,
    borderRadius: "4px",
    objectFit: "cover",
    objectPosition: "center",
  },
  listItemName: {
    marginLeft: theme.spacing(2),
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    color: colors.common.white,
  },
}));

const CategoryList = ({ className, setShowCatList, data, ...rest }) => {
  const classes = useStyles();
  // const [products] = useState(data);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        className={classes.cardHeader}
        subtitle={`${data.length} in total`}
        title="Available categories"
      />
      <Divider />
      <List dense>
        {data.map((categoryItem, i) => (
          <ListItem divider={i < data.length - 1} key={categoryItem._id}>
            <ListItemAvatar>
              <img
                alt=""
                className={classes.image}
                src={
                  categoryItem.categoryImage
                    ? categoryItem.categoryImage
                    : catPlaceholder
                }
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.listItemName}
              primary={categoryItem.categoryName}
              secondary={`Added: ${moment(categoryItem.createdAt).format(
                "DD MMM YYYY, hh:mma"
              )}`}
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
          endIcon={<CloseOutlined />}
          size="small"
          variant="text"
          onClick={() => {
            setShowCatList(false);
          }}
        >
          Close
        </Button>
      </Box>
    </Card>
  );
};

CategoryList.propTypes = {
  className: PropTypes.string,
};

export default CategoryList;
