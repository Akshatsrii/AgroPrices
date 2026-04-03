import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredPrices } from "../../store/slices/priceSlice";

const PriceList = () => {
  const prices = useSelector(selectFilteredPrices) || [];

  if (!prices.length) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {prices.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>₹{item.currentPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default PriceList;