import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import { addItems } from "redux/slices/cartSlice";
import "styles/product-card.scss";
const ProductCard = (props) => {
  const dispatch = useDispatch();

  const { id, imgUrl, productName, category, price } = props.product;
  const addItem = () => {
    dispatch(
      addItems({
        id,
        productName,
        imgUrl,
        price,
      })
    );
    toast.success("Product added successfully!");
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product-card">
        <div className="product-card__item">
          <div className="product-card__img">
            <motion.img whileHover={{ scale: 0.9 }} src={imgUrl} alt="" />
          </div>
          <div className="p-2 product-card__info">
            <h3 className="product-card__name">
              <Link to={`/shop/${id}`}>{productName}</Link>
            </h3>
            <span className="product-card__category d-block">{category}</span>
          </div>
          <div className="p-2 product-card--bottom d-flex align-items-center justify-content-between">
            <span className="product-card__price">${price}</span>
            <motion.span
              whileTap={{ scale: 1.2 }}
              className="product-card__icon"
              onClick={addItem}
            >
              <i className="ri-add-line"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
