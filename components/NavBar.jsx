import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const NavBar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  const toggleCart = () => {
    setShowCart(!showCart);
  }
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">JSM Headphones</Link>
      </p>
      <button type='button' className='cart-icon' onClick={toggleCart}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}

export default NavBar