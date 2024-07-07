import React from "react";
import { useSelector } from "react-redux";
const ItemList = () => {
    const cartItem = useSelector((state) => state.cart.cart)
    return (
        <>
               <h1 className="d-flex justify-content-center">Cart List</h1>
            <div className='d-flex justify-content-center'>
                
                <ul>
                    {
                        cartItem.map((item, index) => {
                            return ( 
                                <>
                                    <li key={index}>

                                        <li>{item.title} - {item.body} -{index}</li>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>

        </>
    )
}

export default ItemList;