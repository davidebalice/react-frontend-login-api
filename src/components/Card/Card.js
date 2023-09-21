import React from "react";
import Nav from "react-bootstrap/Nav";

const Card = ({ name, route, description, github }) => {
  return (
    <Nav.Link href={route}>
      <div>{name}</div>
      <div>{description}</div>
      <div>{github}</div>
    </Nav.Link>
  );
};

export default Card;
