import products from "assets/data/products";
import Helmet from "components/Helmet/Helmet";
import CommonSection from "components/UI/CommonSection";
import ProductList from "components/UI/ProductList";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "styles/shop.scss";
const Shop = () => {
  const [productList, setProductList] = useState(products);
  const [productsFilter, setProductsFilter] = useState(productList);

  const handleFilterCategory = (e) => {
    const valueFilter = e.target.value;
    const filterCategoryList = productList.filter((item) => {
      if (item.category === valueFilter) return item;
    });

    setProductsFilter(filterCategoryList);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilterCategory}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Filter By </option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input type="text" placeholder="Enter your seach key..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsFilter.length === 0 ? (
              <h1>No products are found!</h1>
            ) : (
              <ProductList data={productsFilter} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
