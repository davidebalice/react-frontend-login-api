import React from "react";
import classes from "./Header.module.css";
import Container from "react-bootstrap/Container";
import logo from "./../assets/img/logo-white.png";
import github from "./../assets/img/github2_white.png";

const Footer = () => {
  return (
    <>
      <div className={classes.footer}>
        <a href="https://www.davidebalice.dev" target="_blank" rel="noreferrer" className={classes.footerLink}>
          www.davidebalice.dev
        </a>
      </div>
    </>
  );
};

export default Footer;
