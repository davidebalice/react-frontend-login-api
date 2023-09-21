import React from "react";
import { Container } from "react-bootstrap";
import Card from "../components/Card/Card";
import data from "../data/data.json";

const home = () => {
  return (
    <Container className="mt-5">
      home eytjewytjytjetyjetyjetyjteyjty jet yjet yjetjety jety jetyj
      <div>
        {data.api.map((link, index) => (
            <Card key={index} {...link} />
        ))}
      </div>
    </Container>
  );
};

export default home;
