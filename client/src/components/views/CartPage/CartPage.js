import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty, Result } from "antd";
import Paypal from "../../utils/Paypal";

const CartPage = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  let cartItem = [];
  const dispatch = useDispatch();

  useEffect(() => {
    // 리덕스에 정보가 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItem.push(item);
        });

        dispatch(getCartItems(cartItem, props.user.userData.cart)).then(
          (res) => {
            calculateTotal(res.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotalPrice(total);
    setShowTotal(true);
  };

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((res) => {
      if (res.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transactionSuccess = (paymentInfo) => {
    dispatch(
      onSuccessBuy({
        paymentData: paymentInfo,
        cartDetail: props.user.cartDetail,
      })
    ).then((res) => {
      if (res.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
        //
      }
    });
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>

      {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total Amount: ${totalPrice}</h2>
        </div>
      ) : ShowSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <Empty style={{ marginTop: "1rem" }} description={false} />
      )}

      {ShowTotal && (
        <Paypal total={totalPrice} onSuccess={transactionSuccess} />
      )}
    </div>
  );
};

export default CartPage;
