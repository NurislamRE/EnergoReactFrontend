import React, { useState } from "react";
import { Collapse, Navbar, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import style from "./NavMenu.css";
import logo from "../components/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const NavMenu = () => {
  const ROLES = {
    SuperAdmin: "superadmin",
    SuperAdminCode:
      "%D0%A1%D1%83%D0%BF%D0%B5%D1%80%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD",
  };

  document.onreadystatechange = function () {
    let lastScrollPosition = 0;
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function (e) {
      lastScrollPosition = window.scrollY;

      if (lastScrollPosition > 100) navbar.classList.add("navbar-dark");
      else navbar.classList.remove("navbar-dark");
    });
  };

  const [collapsed, setCollapsed] = useState(false);

  const [activeLink, setActiveLink] = useState("/ReportData");
  // const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const login = () => {

  }

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar"
        container
        lt
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "3.5%", marginLeft: "5%" }}
        />

        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/SummaryData")}
                tag={Link}
                className={activeLink === "/SummaryData" ? "active" : ""}
                to="/SummaryData"
              >
                Общий свод(%)
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/ChartsData")}
                tag={Link}
                className={activeLink === "/ChartsData" ? "active" : ""}
                to="/ChartsData"
              >
                Диаграмма
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/RatingOrg")}
                tag={Link}
                className={activeLink === "/RatingOrg" ? "active" : ""}
                to="/RatingOrg"
              >
                Оценка
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/Dictionary")}
                tag={Link}
                className={activeLink === "/Dictionary" ? "active" : ""}
                to="/Dictionary"
              >
                Справочники
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/OrgData")}
                tag={Link}
                className={activeLink === "/OrgData" ? "active" : ""}
                to="/OrgData"
              >
                Редактирование данных
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/ReportData")}
                tag={Link}
                className={activeLink === "/ReportData" ? "active" : ""}
                to="/ReportData"
              >
                Сравнительная информация
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => handleNavLinkClick("/CurReportData")}
                tag={Link}
                className={activeLink === "/CurReportData" ? "active" : ""}
                to="/CurReportData"
              >
                Общая информация
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
        <div className="row" style={{ color: "white" }}>
          <div className="col-lg-2" style={{ marginTop: "1vh" }}>
            <AccountCircleIcon />
          </div>
          <div className="col-lg-4" style={{ marginTop: "1vh" }}>
            {Cookies.get("X-Username")}
          </div>
          <div className="col-lg-6">
            <IconButton className="logout" title="Выйти" component={Link} to="/Login">
              <LogoutIcon></LogoutIcon>
            </IconButton>
          </div>
        </div>
      </Navbar>
    </header>
  );
};
