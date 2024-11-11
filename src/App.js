import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";
import { CookiesProvider, useCookies } from "react-cookie";
import Main from "./components/Main";
import Login from "./components/Account/Login";

export const App = () => {
  return <Main />;
};
export default App;
//
