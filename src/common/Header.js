import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import github from "./../assets/img/github3_white.png";
import logo from "./../assets/img/logo-white.png";
import classes from "./Header.module.css";
import Github from "../pages/github";

const Header = () => {
  const [page, setPage] = useState("home");

  return (
    <>
    {page === "github" && (<Github setPage={setPage}/>)}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className={classes.headerContainer}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="db logo" className={classes.logo} />
            </div>
            <div className={classes.logoContainer}>
              <img
                src={github}
                alt="github"
                className={classes.github}
                onClick={() => setPage("github")}
              />
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
