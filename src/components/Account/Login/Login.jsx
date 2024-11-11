import "./Login.css";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../auth/authSlice";
import Button from "react-bootstrap/Button";
import { backdropContext } from "../../../context/backdropContext";

const URL = `/api/Account`;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openBackdrop, closeBackdrop } = useContext(backdropContext);
  const info = () => {
    openBackdrop();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const account = {
      UserName: username,
      Password: password,
      RememberMe: false,
      Hash: "",
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      withCredentials: true,
      body: JSON.stringify(account),
    };

    const result = fetch(URL, options)
      .then((response) => response.json())
      .then(function (data) {
        const response = data;
        if (response?.result === 1) {
          const accessToken = response?.value.accessToken;
          Cookies.set("X-expire", response?.expires);
          dispatch(setCredentials({ user: username, token: accessToken }));
          // setAuth({ username, password, roles, accessToken, orgId, orgName });
          closeBackdrop();
          navigate("/ReportData");
        } else {          
          const label = document.getElementsByClassName("label-login")[0];
          label.style.display = "block";
          label.innerHTML = response?.value;

          document.getElementById("username").style.borderColor = "red";
          document.getElementById("password").style.borderColor = "red";
          closeBackdrop();
        }
      });
  };

  return (
    <div className="wrapper">
      <div className="container-login">
        <h1 style={{ color: "white" }}>Вход в систему</h1>

        <input
          className="input-login"
          type="text"
          id="username"
          placeholder="Логин"
        />
        <input
          className="input-login"
          type="password"
          id="password"
          name="Password"
          placeholder="Пароль"
          onSubmit={info}
        />
        <button
          type="submit"
          id="login-button"
          onClick={info}
        >
          Войти
        </button>
        <label className="label-login"></label>
      </div>

      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
