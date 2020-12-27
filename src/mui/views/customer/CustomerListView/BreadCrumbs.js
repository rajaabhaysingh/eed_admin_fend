import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Typography } from "@material-ui/core";

export default function SimpleBreadcrumbs() {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      style={{ fontSize: "0.9rem" }}
    >
      <Link color="inherit" href="/">
        Dashboard
      </Link>
      <Typography variant="body2" color="textPrimary">
        Enrollments
      </Typography>
    </Breadcrumbs>
  );
}
