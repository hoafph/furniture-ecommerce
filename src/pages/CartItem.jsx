import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "redux/slices/cartSlice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };
  return (
    <>
      <td>
        <img src={item.imgUrl} alt={item.productName} />
      </td>
      <td>{item.productName} </td>
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        <i
          className="ri-delete-bin-line"
          onClick={() => handleDeleteItem(item.id)}
        ></i>
      </td>
    </>
  );
};

export default CartItem;
