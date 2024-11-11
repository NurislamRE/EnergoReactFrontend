import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import { Row, Col } from "react-bootstrap";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
    /* you can also use 'auto' behaviour 
       in place of 'smooth' */
  });
};

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <div style={{ height: "10vh" }}></div>
        <center>
          <Row
            className="custom-scrollbar"
            style={{ height: "84vh", overflow: "auto" }}
          >
            <Col md={12}>{this.props.children}</Col>
          </Row>
        </center>
        <div
          style={{
            position: "fixed",
            width: "100%",
            textAlign: "center",
            borderTop: "1px solid lightgray",
          }}
        >
          <label style={{ fontSize: "smaller" }}>
            БД "Энергосбережение" 2.0
          </label>
          <br></br>
          <label style={{ fontSize: "smaller" }}>
            Разработано РГП на ПХВ «Инженерно-технический центр» УДП РК
          </label>
        </div>
      </div>
    );
  }
}
