import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./mui/layouts/DashboardLayout";
import MainLayout from "./mui/layouts/MainLayout";
import AccountView from "./mui/views/account/AccountView";
import CustomerListView from "./mui/views/customer/CustomerListView";
import DashboardView from "./mui/views/reports/DashboardView";
import LoginView from "./mui/views/auth/LoginView";
import NotFoundView from "./mui/views/errors/NotFoundView";
import ProductListView from "./mui/views/product/ProductListView";
import RegisterView from "./mui/views/auth/RegisterView";
import SettingsView from "./mui/views/settings/SettingsView";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <AccountView /> },
      { path: "customers", element: <CustomerListView /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "products", element: <ProductListView /> },
      { path: "settings", element: <SettingsView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
