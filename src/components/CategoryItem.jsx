import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({props}) => {
    return (
        <li className="card">
            <Link to={`/category/${props.id}`}>
                <img src={props.photoUrl}/>
                <div className="card-text">
                    <strong>{props.title}</strong>
                </div>
            </Link>
        </li>
    )
}

export default CategoryItem;