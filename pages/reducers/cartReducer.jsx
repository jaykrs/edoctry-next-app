
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Item from './cartItem/item';
import ItemList from './cartItem/itemList';
export const CartReducer = () => {
  const cart = useSelector((state) => state.cart.cart)
  console.log(cart);
  const dispatch = useDispatch()

  return (
    <>
      <div className='d-flex justify-content-between' style={{ margin: "50px 40px" }}>

        <Item title="phone" body="Realme Note 7 pro" />
        <Item title="laptop" body="Lenvo 512gb ssd 8gb ram" />
        <Item title="induction" body="1400w 230v Bajaj inspiring induction" />
        <Item title="book" body="Geeta written in English" />

      </div>
      <ItemList />
      
    </>
  )
}