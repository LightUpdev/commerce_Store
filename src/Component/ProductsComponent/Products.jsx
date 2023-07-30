import React from 'react'
import Product from './Product'

const Products = ({ products, onAddToCart }) => {
  return (
    <>
      {products.length === 0 ? (
        <h3 className="text-center py-5">Loading...</h3>
      ) : (
        <div className="container py-4">
          <div className="products">
            <div className="row">
              {products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="col-xs-12 col-sm-6 col-md-4 col-lg-3 product-list"
                  >
                    <Product product={product} onAddToCart={onAddToCart} />
                    <hr />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Products
