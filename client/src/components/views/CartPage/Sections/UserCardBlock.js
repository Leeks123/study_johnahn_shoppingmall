import React from "react";
import "./usercardblock.css";

const UserCardBlock = (props) => {
  const renderCardImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () => {
    console.log("usercardblock", props);
    return (
      props.products &&
      props.products.map((item, index) => (
        <tr key={index}>
          <td>
            <img
              style={{ width: "70px" }}
              src={renderCardImage(item.images)}
              alt="product"
            />
          </td>
          <td>{item.quantity} EA</td>
          <td>$ {item.price}</td>
          <td>
            <button onClick={() => props.removeItem(item._id)}>Remove</button>
          </td>
        </tr>
      ))
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Qunatity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default UserCardBlock;
