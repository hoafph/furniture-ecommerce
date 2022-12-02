import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({data}) => {

  return (
    <>
      {
        data?.map(item => (
          <ProductCard  key={item.id} product={item} />
        ))
      }
    </>
  );
};

export default ProductList;
