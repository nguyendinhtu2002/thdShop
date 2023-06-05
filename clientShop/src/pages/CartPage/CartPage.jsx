import React from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../../utils/images";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
} from "../../store/cartSlice";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  const {id} = useSelector((state) => state.user);
  const onToken = async (token) => {
    console.log(token);
    await axios
      .post("http://localhost:5000/api/v1/pay", { carts, token,id })
      .then((res) => {
        dispatch(clearCart());
      });
  };

  const handleCheckout = () => {};

  if (carts.length === 0) {
    return (
      <div className="container my-5">
        <div className="empty-cart flex justify-center align-center flex-column font-manrope">
          <img src={shopping_cart} alt="" />
          <span className="fw-6 fs-15 text-gray">
            Giỏ hàng của bạn đang trống.
          </span>
          <Link to="/" className="shopping-btn bg-orange text-white fw-5">
            Đi mua sắm ngay bây giờ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart bg-whitesmoke">
      <div className="container">
        <div className="cart-ctable">
          <div className="cart-chead bg-white">
            <div className="cart-ctr fw-6 font-manrope fs-15">
              <div className="cart-cth">
                <span className="cart-ctxt">S.N.</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Product</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Unit Price</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Quantity</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Total Price</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Actions</span>
              </div>
            </div>
          </div>

          <div className="cart-cbody bg-white">
            {carts.map((cart, idx) => {
              return (
                <div className="cart-ctr py-4" key={cart?.id}>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">{idx + 1}</span>
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">{cart?.title}</span>
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">
                      {formatPrice(cart?.discountedPrice)}
                    </span>
                  </div>
                  <div className="cart-ctd">
                    <div className="qty-change flex align-center">
                      <button
                        type="button"
                        className="qty-decrease flex align-center justify-center"
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      <div className="qty-value flex align-center justify-center">
                        {cart?.quantity}
                      </div>

                      <button
                        type="button"
                        className="qty-increase flex align-center justify-center"
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-ctd">
                    <span className="cart-ctxt text-orange fw-5">
                      {formatPrice(cart?.totalPrice)}
                    </span>
                  </div>

                  <div className="cart-ctd">
                    <button
                      type="button"
                      className="delete-btn text-dark"
                      onClick={() => dispatch(removeFromCart(cart?.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-cfoot flex align-start justify-between py-3 bg-white">
            <div className="cart-cfoot-l">
              <button
                type="button"
                className="clear-cart-btn text-danger fs-15 text-uppercase fw-4"
                onClick={() => dispatch(clearCart())}
              >
                <i className="fas fa-trash"></i>
                <span className="mx-1">Clear Cart</span>
              </button>
            </div>

            <div className="cart-cfoot-r flex flex-column justify-end">
              <div className="total-txt flex align-center justify-end">
                <div className="font-manrope fw-5">
                  Total ({itemsCount}) items:{" "}
                </div>
                <span className="text-orange fs-22 mx-2 fw-6">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <StripeCheckout
                amount={totalAmount * 100}
                token={onToken}
                shippingAddress
                // billingAddress={false}
                zipCode={false}

                stripeKey="pk_test_51MqDa6CnJIa4Gyt64yUggYm6IjolIpWFmj2kIZAgWxf1poz5FwgIKs4ayEKOnt8OhemksZA7f2ohRyBSXlw94Nae00e7vs3NvG"
              ></StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
