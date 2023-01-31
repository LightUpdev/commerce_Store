import React from 'react'
const product = ({ product, onAddToCart }) => {
  const { id, name, description, price, image } = product
  return (
    <>
      <div className="card my-2">
        <img className="card-img-top img-fluid" src={image.url} alt={name} />
        <div className="card-body">
          <div className="card-head d-flex justify-content-between">
            <h5 className="card-title">{name}</h5>
            <h5 className="card-title">{price.formatted_with_symbol}</h5>
          </div>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <button
            type="button"
            onClick={() => onAddToCart(id, 1)}
            className="float-end cart-btn"
          >
            <span>
              <i className="fas fa-shopping-cart text-dark" />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default product
