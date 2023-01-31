import React from 'react'
import { Link } from 'react-router-dom'

const Cart_Item = ({ cartList, removeCartItem, decreaseCartItem }) => {
  return (
    <>
      <div className="container">
        <header>
          <h3 className="py-3">Your Shopping Cart</h3>
        </header>
        <>
          {!cartList.line_items ? (
            <h3 className="text-center">Loading...</h3>
          ) : (
            <>
              <div className="row ">
                {cartList.line_items < 1 ? (
                  <>
                    <h3 className="text-center display-5 py-5">
                      No Item Available in Cart
                    </h3>
                    <Link to="/" className="no-cart-item-btn">
                      <button className="btn btn-warning">
                        Go Shopping <i className="fas fa-shopping-cart"></i>
                      </button>
                    </Link>
                  </>
                ) : (
                  cartList.line_items.map((item) => {
                    const { image, id, name, line_total, quantity } = item
                    return (
                      <div
                        className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                        key={id}
                      >
                        <div className="card my-2 mx-2">
                          <img
                            className="card-img-top img-fluid"
                            src={image.url}
                            alt={name}
                          />
                          <div className="card-body">
                            <div className="card-head d-flex justify-content-between">
                              <h5 className="card-title">{name}</h5>
                              <h5 className="card-title">
                                {line_total.formatted_with_symbol}
                              </h5>
                            </div>
                            <div className="text-center justify-content-center mt-3">
                              <button
                                className="cart-btn mx-2 fw-bold"
                                onClick={() =>
                                  decreaseCartItem(id, {
                                    quantity: quantity - 1,
                                  })
                                }
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                className="cart-btn mx-2 fw-bold"
                                onClick={() =>
                                  decreaseCartItem(id, {
                                    quantity: quantity + 1,
                                  })
                                }
                              >
                                +
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => removeCartItem(id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <div className="cart-sub-total justify-content-center d-flex py-5">
                <h3 className="text-decoration-underline">
                  SubTotal : {cartList.subtotal.formatted_with_symbol}
                </h3>
              </div>
            </>
          )}
        </>
      </div>
    </>
  )
}

export default Cart_Item
