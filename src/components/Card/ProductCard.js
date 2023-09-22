import React from "react";

const ProductCard = ({ name, price, photo }) => {
  const formattedPrice = new Intl.NumberFormat("it-IT", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <div className="productCard">
      <div
        className="productImg"
        style={{ backgroundImage: `url('${photo}')` }}
      >
        {" "}
      </div>
      <div className="productText">
        <div className="productTitle">{name}</div>
        <div className="productPrice">€ {formattedPrice}</div>
      </div>
    </div>
  );
};

export default ProductCard;
