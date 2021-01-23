import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import Update from "@material-ui/icons/Update";
import HowToReg from "@material-ui/icons/HowToReg";
import coursePlaceholder from "../../../../images/course_placeholder.jpg";
import { useHistory } from "react-router-dom";

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
  imageContainer: {
    paddingTop: "50%",
    width: "100%",
    position: "relative",
  },
  courseThumbnail: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "2px",
    position: "absolute",
    top: "0px",
    left: "0px",
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
  cardDesc: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: "4px",
    maxHeight: "100px",
    height: "100px",
    overflow: "scroll",
    background: theme.palette.background.dark,
  },
  chip: {
    padding: "2px 16px",
    background: theme.palette.secondary.main,
    color: colors.common.white,
    borderRadius: "20px 0 0 20px",
    position: "absolute",
    top: "30px",
    right: "0",
  },
}));

const ProductCard = ({ className, item, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();

  // handleCardClick
  const handleCardClick = () => {
    history.push(`/dashboard/courses/${item._id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent style={{ position: "relative" }}>
        <Box className={classes.imageContainer} mb={2}>
          <img
            alt="Product"
            src={
              item.thumbnail
                ? process.env.REACT_APP_MEDIA_URL_BASE + item.thumbnail
                : coursePlaceholder
            }
            className={classes.courseThumbnail}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {item.name}
        </Typography>
        <Box className={classes.cardDesc}>
          <Typography variant="body2">{item.desc}</Typography>
        </Box>
        <Typography align="center" className={classes.chip} variant="body2">
          {item.level}
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
              {item.enrollments?.length || "0"} Enrolls
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
};

export default ProductCard;
