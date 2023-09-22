import React from "react";
import classes from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./../assets/img/logo-white.png";
import github from "./../assets/img/github2_white.png";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className={classes.headerContainer}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="db logo" className={classes.logo} />
            </div>
            <div className={classes.logoContainer}>
              <img src={github} alt="github" className={classes.github} />
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
