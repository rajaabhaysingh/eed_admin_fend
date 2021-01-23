import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
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
  },
  image: {
    height: 48,
    width: 48,
    maxWidth: 48,
    borderRadius: "4px",
    objectFit: "cover",
    objectPosition: "center",
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  marginLeft2: {
    marginLeft: theme.spacing(7),
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    color: colors.common.white,
  },
  redColor: {
    backgroundColor: colors.red[500],
    color: colors.common.white,
  },
}));

const CategoryList = ({ className, setShowCatList, data, ...rest }) => {
  const classes = useStyles();
  // const [products] = useState(data);

  // renderNestedCategory
  const renderNestedCategory = (categories) => {
    let tempCatList = [];

    for (let categoryItem of categories) {
      tempCatList.push(
        <ListItem divider={true} key={categoryItem._id}>
          <ListItemAvatar>
            <img
              alt=""
              className={classes.image}
              src={
                categoryItem.categoryImage
                  ? process.env.REACT_APP_MEDIA_URL_BASE +
                    categoryItem.categoryImage
                  : catPlaceholder
              }
            />
          </ListItemAvatar>
          <ListItemText
            className={classes.marginLeft}
            primary={categoryItem.categoryName}
            secondary={`Added: ${moment(categoryItem.createdAt).format(
              "DD MMM YYYY, hh:mma"
            )}`}
          />
          <IconButton edge="end" size="small">
            <MoreVertIcon />
          </IconButton>
        </ListItem>,
        categoryItem.children.length > 0 ? (
          <List className={classes.marginLeft2} dense>
            {renderNestedCategory(categoryItem.children)}
          </List>
        ) : null
      );
    }

    return tempCatList;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        className={classes.cardHeader}
        subtitle={`${data.length} in total`}
        title="Available categories"
      />
      <Divider />
      <List dense>{renderNestedCategory(data)}</List>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          className={classes.redColor}
          endIcon={<CloseOutlined />}
          size="small"
          variant="contained"
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
