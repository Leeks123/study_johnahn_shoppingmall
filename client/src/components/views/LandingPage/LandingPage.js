import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Section/CheckBox";
import RadioBox from "./Section/RadioBox";
import SearchFeature from "./Section/SearchFeature";
import { continents, price } from "./Section/Data";

const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continent: [],
    price: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    Axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        setPostSize(res.data.productInfo.length);
        if (body.loadMore) {
          setProducts([...products, res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
      } else {
        alert("fail to get All products");
      }
    });
  };

  const loadMore = () => {
    let skip = skip + limit;
    let body = {
      skip: skip,
      limit: limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResult = (filters) => {
    let body = {
      skip: 0,
      limit: limit,
      filters: filters,
    };
    getProducts(body);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    console.log(filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResult(newFilters);
    setFilters(newFilters);
  };
  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    let body = {
      skip: 0,
      limit: limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere
          <Icon type="rocket" />
        </h2>
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* checkbox filter */}
          <CheckBox
            list={continents}
            handleFilters={(filter) => handleFilters(filter, "continent")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* radiobutton filter */}
          <RadioBox
            list={price}
            handleFilters={(filter) => handleFilters(filter, "price")}
          />
        </Col>
      </Row>

      {/* search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunc={updateSearchTerm} />
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />
      {PostSize >= limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMore}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
