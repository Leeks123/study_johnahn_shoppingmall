import React from "react";
import { Descriptions, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";

const ProductInfo = (props) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(addToCart(props.detail._id));
  };
  return (
    <div>
      <Descriptions title="Product Info" bordered>
        <Descriptions.Item label="Price">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shaper="round" type="danger" onClick={onClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
