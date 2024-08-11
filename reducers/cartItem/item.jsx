import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlicer";
const Item = (props) => {
    const dispatch = useDispatch();
    let title = props.title;
    let body = props.body
    return (
        <>
            <div className="card" style={{ width: "200px" }}>
                <h3 className="card-title">{props.title}</h3>
                <p className="card-body">{props.body}</p>
                <button className="card-btn btn btn-primary" onClick={()=> dispatch(addToCart({title,body}))}>AddToCart</button>
            </div>
        </>
    )
}

export default Item;