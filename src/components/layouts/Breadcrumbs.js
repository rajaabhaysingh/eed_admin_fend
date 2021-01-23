import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      boxShadow: theme.shadows[8],
      cursor: "pointer",
    },
    padding: "4px 12px",
    fontSize: "0.85rem",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
}));

export default function CustomizedBreadcrumbs({ backlinks, currentLabel }) {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {backlinks.map((item, i) => (
        <Link className={classes.root} to={item.url}>
          {i === 0 && (
            <i>
              <HomeIcon style={{ margin: "0 8px 2px 0", fontSize: "1rem" }} />
            </i>
          )}
          {item.label}
        </Link>
      ))}

      <div className={classes.root}>{currentLabel}</div>
    </Breadcrumbs>
  );
}
