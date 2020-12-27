import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "../../../extras/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import data from "./data";
import { Switch } from "react-router";
import { Route } from "react-router";
import { useRouteMatch } from "react-router";

import AddCourse from "../AddCourse";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
  productCard: {
    height: "100%",
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const [products] = useState(data);

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Page className={classes.root} title="Courses">
          <Container maxWidth={false}>
            <Toolbar />
            <Box mt={3}>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item key={product.id} lg={4} md={6} xs={12}>
                    <ProductCard
                      className={classes.productCard}
                      product={product}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </Container>
        </Page>
      </Route>
      <Route>
        <Page className={classes.root} title="Courses">
          <AddCourse />
        </Page>
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};

export default ProductList;
