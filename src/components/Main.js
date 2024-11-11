import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "../AppRoutes";
import { Layout } from "./Layout";
import RequireAuth from "./RequireAuth";
import Login from "./Account/Login";

export const Main = () => {
  return (
    <Layout>
      <Routes>        
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={`routeauth-${index}`} element={<RequireAuth />}>
              <Route key={`route-${index}`} {...rest} element={element} />
            </Route>;
          })}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
};
export default Main;
