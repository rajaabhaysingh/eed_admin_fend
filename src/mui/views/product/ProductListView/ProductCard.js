import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Update from "@material-ui/icons/Update";
import HowToReg from "@material-ui/icons/HowToReg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows[8],
    cursor: "pointer",
    "&:hover": {
      // backgroundColor: theme.palette.action.hover,
      boxShadow: theme.shadows[20],
    },
  },
  courseThumbnail: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    objectPosition: "center",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize: "1.2rem",
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            alt="Product"
            src={product.media}
            className={classes.courseThumbnail}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {product.title}
        </Typography>
        <Typography align="center" color="textSecondary" variant="body2">
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <Update className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              Updt. 2hr ago
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <HowToReg className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {product.totalDownloads} Enrolls
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
