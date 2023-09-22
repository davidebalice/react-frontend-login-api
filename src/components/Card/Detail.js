import React from "react";

const Detail = ({ name, price, photo, description }) => {
  const formattedPrice = new Intl.NumberFormat("it-IT", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <div className="detail">
      <div className="detailImg" style={{ backgroundImage: `url('${photo}')` }}>
        {" "}
      </div>
      <div className="detailText">
        <p>
          <div className="detailTitle">{name}</div>
          <div className="detailDescription">{description}</div>
        </p>

        <div className="detailPrice">€ {formattedPrice}</div>
      </div>
    </div>
  );
};

export default Detail;
