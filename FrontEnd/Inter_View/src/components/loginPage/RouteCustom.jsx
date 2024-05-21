import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { FeedsComp } from "../pages/FeedsComp";
import { ViewPostComp } from "../pages/ViewPostComp";
import { UpdatesFeedsComp } from "../pages/UpdatesFeedsComp";
import { AdminComp } from "../AdminDashboard/AdminComp";
import { AllPostFeed } from "../pages/AllPostFeed";

export const RouteCustom = () => {
  const token = localStorage.getItem("token");

  const routes = useRoutes([
    { path: "/", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
    { path: "/adminDashboard", element: <AdminComp /> },
    {
      path: "/feedComp",
      element: token ? <FeedsComp /> : <Navigate to="/" />,
    },
    {
      path: "/postFeed",
      element: token ? <ViewPostComp /> : <Navigate to="/" />,
    },
    {
      path: "/allpostFeed",
      element: token ? <AllPostFeed /> : <Navigate to="/" />,
    },
    {
      path: "/updateFeed/:id",
      element: token ? <UpdatesFeedsComp /> : <Navigate to="/" />,
    },
  ]);
  return routes;
};
