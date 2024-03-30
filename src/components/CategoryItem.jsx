import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({props}) => {
    return (
        <Link to={`/category/${props.id}`}>
            <strong>{props.title}</strong>
            <div>{props.photoUrl}</div>
        </Link>
    )
}

export default CategoryItem;