import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import classes from "../common/Header.module.css";
import github from "./../assets/img/github2.png";
import laravel from "./../assets/img/laravel.png";
import react from "./../assets/img/logoReact.png";
import node from "./../assets/img/node.png";
import php from "./../assets/img/php.png";

const Github = ({ setPage }) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <RiCloseCircleFill
          className={classes.close}
          onClick={() => setPage("home")}
        />
        <img src={github} alt="GitHub logo" style={{ width: "100px" }} />
        <br />
        <div className={classes.githubContainer}>
          <a
            href="https://github.com/davidebalice/react-frontend-login-api"
            target="_blank"
            rel="noreferrer"
            className={classes.logoItem}
          >
            <img src={react} alt="react logo" />
          </a>
          <a
            href="https://github.com/davidebalice/php-mvc-login-api"
            target="_blank"
            rel="noreferrer"
            className={classes.logoItem}
          >
            <img src={php} alt="react logo" />
          </a>
          <a
            href="https://github.com/davidebalice/laravel-auth-api"
            target="_blank"
            rel="noreferrer"
            className={classes.logoItem}
          >
            <img src={laravel} alt="react logo" />
          </a>
          <a
            href="https://github.com/davidebalice/node-login-api"
            target="_blank"
            rel="noreferrer"
            className={classes.logoItem}
          >
            <img src={node} alt="react logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Github;
