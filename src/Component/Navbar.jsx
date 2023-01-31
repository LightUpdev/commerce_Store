import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = ({ totalItem , emptyCart }) => {
  const location = useLocation()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 justify-content-between">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-truck"></i> Commerce.js
        </Link>

        {location.pathname ==='/' && (  <Link to="/cart">
            <div className="logo">
              <span>
                <i className="fas fa-shopping-cart fs-4 text-light"></i>
                <div className="badge">
                  <small>{totalItem ? totalItem : 0}</small>
                </div>
              </span>
            </div>
          </Link>)}
          {location.pathname ==='/cart' && ( <div className='cart-action-btn'>
          <button className='btn btn-danger me-3' onClick={()=>emptyCart()}>Empty Cart</button>
          <Link to='/checkout' className='btn btn-warning ms-3'>Check Out</Link>
        </div>)}
      </nav>
    </div>
  )
}

export default Navbar
